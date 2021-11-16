import { useRouter } from "next/router";

import { Grid } from "../../grid/Grid";
import { CloseIcon } from "../../icons/CloseIcon";
import { Typography } from "../../typography/Typography";

import styles from "./ModalNavbar.module.scss";
import { ModalNavbarProps } from "./ModalNavbar.types";

export const ModalNavbar: React.FC<ModalNavbarProps> = ({ children, title }) => {
  const { back } = useRouter();

  return (
    <div className={styles["modal-navbar"]}>
      <Grid.Container fluid>
        <Grid.Row justify="between">
          <Grid.Col lg={6} xs={6} sm={6}>
            <div className={styles["modal-navbar__title"]}>
              <Typography.Text>{title}</Typography.Text>
            </div>
          </Grid.Col>
          <Grid.Col lg={6} xs={6} sm={6}>
            <div className={styles["modal-navbar__right"]} onClick={back}>
              {children && children}
              <div className={styles["modal-navbar__close-button"]}>
                <CloseIcon />
              </div>
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </div>
  );
};
