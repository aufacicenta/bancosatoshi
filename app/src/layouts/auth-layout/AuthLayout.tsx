import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { AuthContextController } from "context/auth/AuthContextController";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import { MainPanel } from "ui/mainpanel/MainPanel";
import { NavBar } from "ui/navbar/NavBar";

import styles from "./AuthLayout.module.scss";
import { AuthLayoutProps } from "./AuthLayout.types";

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { t } = useTranslation("common");
  const routes = useRoutes();

  return (
    <AuthContextController>
      <div className={clsx(styles["auth-layout"])}>
        <NavBar />
        <MainPanel className={styles["auth-layout__main-panel"]}>{children}</MainPanel>
      </div>
    </AuthContextController>
  );
};
