import clsx from "clsx";
import NextLink, { LinkProps } from "next/link";

import styles from "./Typography.module.scss";
import { AnchorProps, TypographyProps } from "./Typography.types";

export const Typography: React.FC<TypographyProps> & {
  Headline1: React.FC<TypographyProps>;
  Headline2: React.FC<TypographyProps>;
  Headline3: React.FC<TypographyProps>;
  Headline4: React.FC<TypographyProps>;
  Headline5: React.FC<TypographyProps>;
  Headline6: React.FC<TypographyProps>;
  Text: React.FC<TypographyProps>;
  TextLead: React.FC<TypographyProps>;
  TextBold: React.FC<TypographyProps>;
  Subtitle: React.FC<TypographyProps>;
  ButtonLabel: React.FC<TypographyProps>;
  MiniButtonLabel: React.FC<TypographyProps>;
  Description: React.FC<TypographyProps>;
  MiniDescription: React.FC<TypographyProps>;
  Link: React.FC<TypographyProps & LinkProps>;
  Anchor: React.FC<AnchorProps>;
} = ({ children, className }) => <div className={clsx(styles.typography, className)}>{children}</div>;

const Headline1: React.FC<TypographyProps> = ({ children, className }) => (
  <h1 className={clsx(styles.typography__headline1, className)}>{children}</h1>
);

const Headline2: React.FC<TypographyProps> = ({ children, className }) => (
  <h2 className={clsx(styles.typography__headline2, className)}>{children}</h2>
);

const Headline3: React.FC<TypographyProps> = ({ children, className }) => (
  <h3 className={clsx(styles.typography__headline3, className)}>{children}</h3>
);

const Headline4: React.FC<TypographyProps> = ({ children, className, inline }) => (
  <h4 className={clsx(styles.typography__headline4, className, { [styles.typography__inline]: inline })}>{children}</h4>
);

const Headline5: React.FC<TypographyProps> = ({ children, className }) => (
  <h5 className={clsx(styles.typography__headline5, className)}>{children}</h5>
);

const Headline6: React.FC<TypographyProps> = ({ children, className }) => (
  <h6 className={clsx(styles.typography__headline6, className)}>{children}</h6>
);

const Text: React.FC<TypographyProps> = ({ children, className, inline }) => (
  <p className={clsx(styles.typography__text, className, { [styles.typography__inline]: inline })}>{children}</p>
);

const TextLead: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx(styles["typography__text-lead"], className)}>{children}</p>
);

const TextBold: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx(styles["typography__text-bold"], className)}>{children}</p>
);

const Subtitle: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx(styles.typography__subtitle, className)}>{children}</p>
);

const ButtonLabel: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={clsx(styles["typography__button-label"], className)}>{children}</span>
);

const MiniButtonLabel: React.FC<TypographyProps> = ({ children, className }) => (
  <span className={clsx(styles["typography__mini-button-label"], className)}>{children}</span>
);

const Description: React.FC<TypographyProps> = ({ children, className, inline }) => (
  <p className={clsx(styles.typography__description, className, { [styles.typography__inline]: inline })}>{children}</p>
);

const MiniDescription: React.FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx(styles["typography__mini-description"], className)}>{children}</p>
);

const Link: React.FC<TypographyProps & LinkProps> = ({ children, className, href }) => (
  <NextLink href={href}>
    <a className={clsx(styles.typography__link, className)}>{children}</a>
  </NextLink>
);

const Anchor: React.FC<AnchorProps> = ({ children, className, ...props }) => (
  <a className={clsx(styles.typography__link, className)} {...props}>
    {children}
  </a>
);

Typography.Headline1 = Headline1;
Typography.Headline2 = Headline2;
Typography.Headline3 = Headline3;
Typography.Headline4 = Headline4;
Typography.Headline5 = Headline5;
Typography.Headline6 = Headline6;
Typography.Text = Text;
Typography.TextLead = TextLead;
Typography.TextBold = TextBold;
Typography.Subtitle = Subtitle;
Typography.ButtonLabel = ButtonLabel;
Typography.MiniButtonLabel = MiniButtonLabel;
Typography.Description = Description;
Typography.MiniDescription = MiniDescription;
Typography.Link = Link;
Typography.Anchor = Anchor;
