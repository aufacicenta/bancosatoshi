import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { PropertiesContainer } from "../../../app/real-estate/solana/properties/PropertiesContainer";
import { WalletSolanaContextControllerProps } from "../../../context/solana/WalletSolanaContext.types";
import { AppLayout } from "../../../layouts/app-layout/AppLayout";
import { DashboardLayout } from "../../../layouts/dashboard-layout/DashboardLayout";

// We need to import this component dynamically because some of its dependencies rely on the window object, plus it uses the "export" keyword which is not supported by NextJS in node_modules
const WalletSolanaContextController = dynamic<WalletSolanaContextControllerProps>(
  () =>
    import("../../../context/solana/WalletSolanaContextController").then((mod) => mod.WalletSolanaContextController),
  {
    ssr: false,
  },
);

const SolanaRealEstate: NextPage = () => (
  <AppLayout>
    <WalletSolanaContextController>
      <DashboardLayout>
        <PropertiesContainer />
      </DashboardLayout>
    </WalletSolanaContextController>
  </AppLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "home"])),
  },
});

export default SolanaRealEstate;
