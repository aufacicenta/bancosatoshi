import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";
import { NextPage } from "next";

const Businesses: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      {/* @TODO Business Grid Implementation */}
      <></>
    </AuthLayout>
  </AppLayout>
);

export default Businesses;
