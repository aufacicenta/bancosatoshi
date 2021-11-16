import { NextPage } from "next";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";
import { MapContainer } from "app/map/MapContainer";

const Map: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      <MapContainer />
    </AuthLayout>
  </AppLayout>
);

export default Map;
