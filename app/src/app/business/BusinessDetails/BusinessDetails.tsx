import clsx from "clsx";
import { Container } from "react-grid-system";

import { Grid } from "ui/grid/Grid";
import { Card } from "ui/card/Card";
import { Tab } from "ui/tab/Tab";
import { Typography } from "ui/typography/Typography";

import { BusinessDetailsProps } from "./BusinessDetails.types";
import styles from "./BusinessDetails.module.scss";
import { BusinessContent } from "./BusinessContent/BusinessContent";
import { BusinessHeader } from "./BusinessHeader/BusinessHeader";

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({ content }) => (
  <div className={clsx(styles["business-details"])}>
    <Container>
      <Grid.Row>
        <Grid.Col lg={8}>
          <Card className={styles["business-details__box"]} shadow>
            <BusinessHeader content={content} />
            <Tab defaultPaneId="business-content-tab">
              <Tab.Navigation>
                <Tab.Item paneId="business-content-tab">Oportunidad de Inversión</Tab.Item>
                <Tab.Item paneId="business-financials-tab">Finanzas y Datos</Tab.Item>
              </Tab.Navigation>
              <Tab.Pane id="business-content-tab">
                <BusinessContent content={content} />
              </Tab.Pane>
              <Tab.Pane id="business-financials-tab">
                <Typography.Text>Finanzas y Datos</Typography.Text>
              </Tab.Pane>
            </Tab>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </Container>
  </div>
);
