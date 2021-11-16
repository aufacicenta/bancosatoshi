import { NextPage } from "next";

import { SignUpContainer } from "app/auth/sign-up/SignUpContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";

const Index: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      <SignUpContainer />
    </AuthLayout>
  </AppLayout>
);

export async function getStaticPaths() {
  // @TODO set resolve i18nPath for all languages
  return { paths: [{ params: { i18nPath: "ingresa" } }], fallback: false };
}

export async function getStaticProps() {
  return { props: {} };
}

export default Index;
