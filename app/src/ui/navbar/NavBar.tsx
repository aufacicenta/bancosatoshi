import { Col, Container, Row } from "react-grid-system";

import { useAuthContext } from "hooks/useAuthContext/useAuthContext";
import { Typography } from "../typography/Typography";
import { useRoutes } from "hooks/useRoutes/useRoutes";

import styles from "./NavBar.module.scss";
import { NavBarProps } from "./NavBar.types";

export const NavBar: React.FC<NavBarProps> = () => {
  const auth = useAuthContext();
  const routes = useRoutes();

  return (
    <div className={styles.navbar}>
      <Container>
        <Row>
          <Col lg={3} xs={6} sm={6}>
            <div className={styles.navbar__logo}>
              <Typography.Link href={routes.home}>
                Banco
                <br />
                Satoshi
              </Typography.Link>
            </div>
          </Col>
          <Col lg={6} xs={6} sm={6}>
            <div className={styles.navbar__center}>
              <div className={styles["navbar__center--item"]}>
                <Typography.Text>Sala de Inversión</Typography.Text>
              </div>
              <div className={styles["navbar__center--item"]}>
                <Typography.Text>Cómo Funciona</Typography.Text>
              </div>
              <div className={styles["navbar__center--item"]}>
                <Typography.Text>Accede a Capital</Typography.Text>
              </div>
            </div>
          </Col>
          <Col lg={3} xs={6} sm={6}>
            <div className={styles.navbar__right}>
              <div className={styles["navbar__right--item"]}>
                {auth.hasActiveSession ? (
                  <Typography.Text>Mi Cuenta</Typography.Text>
                ) : (
                  <Typography.Link href={routes.auth.signIn}>Iniciar Sesión</Typography.Link>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
