import { NextPage } from "next";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";

const Data: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      {/* @TODO Business Data Table Implementation */}
      <></>
    </AuthLayout>
  </AppLayout>
);

export default Data;
