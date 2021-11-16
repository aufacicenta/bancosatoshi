import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { useRoutes } from "../../hooks/useRoutes/useRoutes";
import { CityIcon } from "../../ui/icons/CityIcon";
import { MainPanel } from "../../ui/mainpanel/MainPanel";
import { NavBar } from "../../ui/navbar/NavBar";
import { Sidebar } from "../../ui/sidebar/Sidebar";

import styles from "./DashboardLayout.module.scss";
import { DashboardLayoutProps } from "./DashboardLayout.types";

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useTranslation("common");
  const routes = useRoutes();

  return (
    <div className={clsx(styles["dashboard-layout"])}>
      <NavBar />
      <Sidebar className={styles["dashboard-layout__sidebar"]}>
        <Sidebar.Item
          text={t("sidebar.item.real-estate")}
          icon={<CityIcon />}
          url={routes.realEstate.solana.properties}
        />
      </Sidebar>
      <MainPanel className={styles["dashboard-layout__main-panel"]}>{children}</MainPanel>
    </div>
  );
};
