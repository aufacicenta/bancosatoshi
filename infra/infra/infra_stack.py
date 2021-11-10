from aws_cdk import (
    core as cdk,
    aws_ec2 as ec2,
    aws_rds as rds,
    aws_eks as eks,
    aws_route53 as route53,
    aws_certificatemanager as acm
)

# For consistency with other languages, `cdk` is the preferred import name for
# the CDK's core module.  The following line also imports it as `core` for use
# with examples from the CDK Developer's Guide, which are in the process of
# being updated to use `cdk`.  You may delete this import if you don't need it.
from aws_cdk import core


class InfraStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        ####################
        # VPC
        ####################

        vpc = ec2.Vpc(self, 'vpc',
                      max_azs=2,
                      nat_gateway_provider=ec2.NatProvider.instance(instance_type=ec2.InstanceType('t3a.nano')))

        ####################
        # Kubernetes Cluster
        ####################

        # EKS Cluster
        k8s = eks.Cluster(self, 'k8s',
            version=eks.KubernetesVersion.V1_20,
            cluster_name='eks-cluster',
            default_capacity=1,
            default_capacity_instance=ec2.InstanceType('t3a.medium'),
            vpc=vpc
        )

        ####################
        # MySQL
        ####################

        # Security Group
        sg_aurora = ec2.SecurityGroup(self, 'sgAurora', vpc=vpc, security_group_name= 'AuroraMysql')
        sg_aurora.add_ingress_rule(k8s.cluster_security_group, ec2.Port.tcp(3306))

        # Create cluster
        db = rds.DatabaseCluster(self, 'database',
                                engine=rds.DatabaseClusterEngine.aurora_mysql(version=rds.AuroraMysqlEngineVersion.VER_2_10_0),
                                cluster_identifier='db-cluster',
                                default_database_name="wordpress",
                                instances=1,
                                instance_props=rds.InstanceProps(
                                    vpc=vpc,
                                    vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE),
                                    instance_type=ec2.InstanceType('t3.small'),
                                    security_groups=[sg_aurora]
                                ))

        ####################
        # Privete DNS Zone
        ####################

        # Create dns zone
        zone_pv = route53.PrivateHostedZone(self, 'privateZone',
                                            vpc=vpc,
                                            zone_name='bancosat.local')

        # DB Write Record
        route53.CnameRecord(self, 'dbWriteRecord',
                            domain_name=db.cluster_endpoint.hostname,
                            record_name='db',
                            zone=zone_pv,
                            ttl=core.Duration.minutes(1))

        # DB Read Record
        route53.CnameRecord(self, 'dbReadRecord',
                            domain_name=db.cluster_read_endpoint.hostname,
                            record_name='db-ro',
                            zone=zone_pv,
                            ttl=core.Duration.minutes(1))
        
        #####################
        # Public Certificates
        #####################

        public_zone = route53.PublicHostedZone.from_lookup(self, 'public_zone', domain_name='bancosatoshi.com')

        acm.Certificate(self, "cert",
            domain_name='bancosatoshi.com',
            subject_alternative_names=['*.bancosatoshi.com'],
            validation=acm.CertificateValidation.from_dns(public_zone)
        )