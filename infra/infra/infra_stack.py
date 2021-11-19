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
        # MySQL Wordpress
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
        # MySQL APP
        ####################

        # Security Group
        sg_aurora_app = ec2.SecurityGroup(self, 'sgAuroraPpp', vpc=vpc, security_group_name= 'AuroraApp')
        sg_aurora_app.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(3306))

        # Create cluster
        db_app = rds.DatabaseCluster(self, 'databaseApp',
                                    engine=rds.DatabaseClusterEngine.aurora_mysql(version=rds.AuroraMysqlEngineVersion.VER_2_10_0),
                                    cluster_identifier='db-app-cluster',
                                    instances=1,
                                    instance_props=rds.InstanceProps(
                                        vpc=vpc,
                                        vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PUBLIC),
                                        instance_type=ec2.InstanceType('t3.small'),
                                        security_groups=[sg_aurora_app]
                                    ))

        #####################
        # BTCPAY Server
        #####################

        # Security Group
        sg_btcpay = ec2.SecurityGroup(self, 'sgBTCPay', vpc=vpc, security_group_name="BTCPay")
        sg_btcpay.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(80))
        sg_btcpay.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(443))

        # Machine type
        machine = ec2.MachineImage.generic_linux(
            {
                'us-east-1': 'ami-083654bd07b5da81d',
            }
        )

        # Instance
        btcpay = ec2.Instance(self, "btcPay", 
            vpc=vpc, 
            instance_type=ec2.InstanceType('m5a.large'), 
            machine_image=machine,
            instance_name="btcPay",
            key_name="bancosat",
            security_group=sg_btcpay,
            vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PUBLIC),
            block_devices=[
                {
                    'deviceName': '/dev/sda1',
                    'volume': ec2.BlockDeviceVolume.ebs(100)
                }
            ]
        )

        # Elastic IP for BTCPay Server
        eip = ec2.CfnEIP(self, "ipBTCPay")
        epi_as = ec2.CfnEIPAssociation(self, "Ec2Association", eip=eip.ref, instance_id=btcpay.instance_id)

        #####################
        # Bastion Server
        #####################
        # Security Group
        sg_bastion = ec2.SecurityGroup(self, 'sgBastion', vpc=vpc, security_group_name="sgBastion")
        sg_bastion.add_ingress_rule(ec2.Peer.any_ipv4(), ec2.Port.tcp(22))
        sg_aurora.add_ingress_rule(sg_bastion, ec2.Port.tcp(3306))

        ec2.Instance(self, 'BastionInstance',
                    instance_type=ec2.InstanceType('t3a.nano'),
                    key_name='bancosat',
                    instance_name='bastion',
                    machine_image=ec2.AmazonLinuxImage(generation=ec2.AmazonLinuxGeneration.AMAZON_LINUX_2),
                    vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PUBLIC),
                    security_group=sg_bastion,
                    vpc=vpc)

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
        # Public Zone
        #####################

        # Public zone import
        public_zone = route53.PublicHostedZone.from_lookup(self, 'public_zone', domain_name='bancosatoshi.com')

        # BTCPay server record
        route53.ARecord(self, "btcPayRecord",
                        record_name="btc.bancosatoshi.com",
                        zone=public_zone, 
                        target=route53.RecordTarget.from_ip_addresses(epi_as.eip),
                        ttl=core.Duration.minutes(1))

        # Vercel Records
        route53.ARecord(self, "vercelARecord",
                        record_name="bancosatoshi.com",
                        zone=public_zone, 
                        target=route53.RecordTarget.from_ip_addresses('76.76.21.21'),
                        ttl=core.Duration.minutes(1))

        route53.CnameRecord(self, 'vercelCnameRecord',
                            domain_name='cname.vercel-dns.com',
                            record_name='www',
                            zone=public_zone,
                            ttl=core.Duration.minutes(1))

        # Database APP White Records
        route53.CnameRecord(self, 'dbAppWriteRecord',
                            domain_name=db_app.cluster_endpoint.hostname,
                            record_name='db',
                            zone=public_zone,
                            ttl=core.Duration.minutes(1))

        # Database APP Read Records
        route53.CnameRecord(self, 'dbAppReadRecord',
                            domain_name=db_app.cluster_read_endpoint.hostname,
                            record_name='db-ro',
                            zone=public_zone,
                            ttl=core.Duration.minutes(1))

        # ACM Public Certificate
        acm.Certificate(self, "cert",
            domain_name='bancosatoshi.com',
            subject_alternative_names=['*.bancosatoshi.com'],
            validation=acm.CertificateValidation.from_dns(public_zone)
        )
