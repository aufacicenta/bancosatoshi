import clsx from "clsx";
import { Container } from "react-grid-system";
import dynamic from "next/dynamic";

import { Typography } from "ui/typography/Typography";
import { Card } from "ui/card/Card";
import { AuthEmailFormProps } from "ui/form/auth-email-form/AuthEmailForm.types";
import { Grid } from "ui/grid/Grid";
import { useAuthContext } from "hooks/useAuthContext/useAuthContext";
import { AuthContextLoginValues } from "context/auth/AuthContext.types";
import { Button } from "ui/button/Button";

import styles from "./Home.module.scss";
import { HomeProps } from "./Home.types";

const AuthEmailForm = dynamic<AuthEmailFormProps>(
  () => import("ui/form/auth-email-form/AuthEmailForm").then((mod) => mod.AuthEmailForm),
  { ssr: false },
);

export const Home: React.FC<HomeProps> = ({ className }) => {
  const auth = useAuthContext();

  return (
    <div className={clsx(styles.home, className)}>
      <section id="intro" className={styles.home__section}>
        <Container>
          <Grid.Row>
            <Grid.Col lg={6}>
              <Typography.Headline1>
                Invierte en Negocios
                <br />
                con Bitcoin
              </Typography.Headline1>
              <Typography.TextLead>
                Invierte en empresarixs dedicados a cumplir sus metas,
                <br /> desde 1 SAT.
              </Typography.TextLead>
              <Typography.TextLead>
                Nuestro protocolo de inversión respalda el éxito de los emprendedores.
              </Typography.TextLead>
              {auth.hasActiveSession ? (
                <div className={styles["home__intro--cta"]}>
                  <Button size="l">Visita la sala de inversión</Button>
                </div>
              ) : (
                <Card className={styles["home__auth-email-card"]} shadow>
                  <Card.Content>
                    <AuthEmailForm
                      autoFocus
                      onSubmit={(values) => auth.handleLogin(values as AuthContextLoginValues)}
                      isLoading={auth.isLoading}
                    />
                  </Card.Content>
                </Card>
              )}
            </Grid.Col>
            <Grid.Col lg={6}>
              <div className={styles["home__intro--image"]}>
                <img src="/home/emprendedor-home.png" alt="Emprendedor" />
              </div>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </section>
      <section id="como-funciona" className={clsx(styles.home__section, styles["home__section--como-funciona"])}>
        <Container>
          <Grid.Row>
            <Grid.Col lg={4}>
              <div className={styles["home__section--como-funciona--box"]}>
                <Typography.Headline2>Invierte</Typography.Headline2>
                <Typography.Text>
                  Descubre e invierte en negocios evaluados con nuestro Protocolo de Inversión, desde 1 SAT.
                </Typography.Text>
              </div>
            </Grid.Col>
            <Grid.Col lg={4}>
              <div className={styles["home__section--como-funciona--box"]}>
                <Typography.Headline2>Da Seguimiento</Typography.Headline2>
                <Typography.Text>
                  Banco Satoshi reporta avances trimestrales para mantenerte actualizado.
                </Typography.Text>
              </div>
            </Grid.Col>
            <Grid.Col lg={4}>
              <div className={styles["home__section--como-funciona--box"]}>
                <Typography.Headline2>Colecta tu ROI</Typography.Headline2>
                <Typography.Text>
                  Recibe una parte de las utilidades del negocio. Conforme el negocio crece, tu portafolio también.
                </Typography.Text>
              </div>
            </Grid.Col>
          </Grid.Row>
        </Container>
      </section>
      <section id="perfil-del-empresario" className={clsx(styles.home__section)}>
        <Container>
          <Typography.Headline2>Perfil del Empresarix</Typography.Headline2>
        </Container>
      </section>
      <section id="perfil-del-empresario" className={styles.home__section}>
        <Container>
          <Typography.Headline2>0 Volatilidad, con DAI</Typography.Headline2>
        </Container>
      </section>
      <section id="proceso-de-evaluacion" className={styles.home__section}>
        <Container>
          <Typography.Headline2>Nuestro Proceso de Evaluación</Typography.Headline2>
          <Typography.Text>Protocolo de Inversión</Typography.Text>
        </Container>
      </section>
      <section id="beneficios" className={styles.home__section}>
        <Container>
          <Typography.Headline2>Beneficios de Invertir con Banco Satoshi</Typography.Headline2>
        </Container>
      </section>
    </div>
  );
};
