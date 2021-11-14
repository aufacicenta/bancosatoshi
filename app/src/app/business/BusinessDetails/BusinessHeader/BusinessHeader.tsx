import clsx from "clsx";

import { Typography } from "ui/typography/Typography";
import { Grid } from "ui/grid/Grid";

import { BusinessHeaderProps } from "./BusinessHeader.types";
import styles from "./BusinessHeader.module.scss";

export const BusinessHeader: React.FC<BusinessHeaderProps> = ({ className, content }) => (
  <section className={clsx(styles["business-header"], className)}>
    <div
      className={styles["business-header__cover-image"]}
      style={{ backgroundImage: `url(${content.media.featuredImageUrl})` }}
    />
    <div className={styles["business-header__info"]}>
      <Grid.Row>
        <Grid.Col lg={4}>
          <div className={styles["business-header__map"]} />
        </Grid.Col>
        <Grid.Col lg={8}>
          <Typography.Headline1>{content.title}</Typography.Headline1>
          <Typography.Text className={styles["business-header__description"]}>{content.description}</Typography.Text>
          <Grid.Row justify="between">
            <Grid.Col>
              <Typography.Text>
                {content.country} · {content.category}
              </Typography.Text>
            </Grid.Col>
            <Grid.Col>
              <Typography.Link className={styles["business-header__link--website"]} href={content.website}>
                {content.website}
              </Typography.Link>
              <hr />
              <Typography.Description>Redes Sociales</Typography.Description>
              <Typography.Link
                className={styles["business-header__link--social"]}
                href={`https://instagram.com/${content.instagram}`}
              >
                {content.instagram}
              </Typography.Link>
            </Grid.Col>
          </Grid.Row>
        </Grid.Col>
      </Grid.Row>
    </div>
  </section>
);
