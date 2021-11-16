import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ListPropertyContainer } from "../../../app/real-estate/solana/list-property/ListPropertyContainer";
import { AppLayout } from "../../../layouts/app-layout/AppLayout";

const ListProperty: NextPage = () => (
  <AppLayout>
    <ListPropertyContainer />
  </AppLayout>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common", "list-property"])),
  },
});

export default ListProperty;
