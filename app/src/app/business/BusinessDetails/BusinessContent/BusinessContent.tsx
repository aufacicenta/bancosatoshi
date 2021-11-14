/* eslint-disable react/no-danger */
import clsx from "clsx";
import Head from "next/head";

import { BusinessContentProps } from "./BusinessContent.types";
import styles from "./BusinessContent.module.scss";

export const BusinessContent: React.FC<BusinessContentProps> = ({ className, content }) => {
  if (!content) {
    return <div>loading</div>;
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cms.bancosatoshi.com/wp-includes/css/dist/block-library/style.min.css?ver=5.8.2"
          media="screen"
        />
        <style>
          {`
            .wp-block-image.alignfull img,
            .wp-block-image.alignwide img {
              height: auto;
            }
          `}
        </style>
      </Head>

      <div
        id="business-content"
        className={clsx(styles["business-content"], className, "entry-content")}
        dangerouslySetInnerHTML={{ __html: content.asHtmlString }}
      />
    </>
  );
};
