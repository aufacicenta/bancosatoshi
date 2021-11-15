import { NextPage } from "next";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";
import { Map as MapView } from "app/map/Map";

const Map: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      <MapView />
    </AuthLayout>
  </AppLayout>
);

export default Map;
