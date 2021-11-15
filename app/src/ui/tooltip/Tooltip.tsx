import clsx from "clsx";
import { useState } from "react";

import { Icon } from "ui/icon/Icon";
import { Typography } from "ui/typography/Typography";
import { Card } from "ui/card/Card";

import { TooltipProps } from "./Tooltip.types";
import styles from "./Tooltip.module.scss";

export const Tooltip: React.FC<TooltipProps> = ({ className, title, description }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleOnClick = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div className={clsx(styles.tooltip, className)}>
      <div
        className={clsx(styles.tooltip__backdrop, {
          [styles["tooltip__backdrop--visible"]]: isTooltipVisible,
        })}
        onClick={handleOnClick}
        role="presentation"
      />
      <div>
        <Icon name="icon-question-circle" onClick={handleOnClick} />
        <Card
          shadow
          className={clsx(styles.tooltip__box, {
            [styles["tooltip__box--visible"]]: isTooltipVisible,
          })}
        >
          <div>
            {!!title && (
              <Typography.Description className={styles.tooltip__title}>
                <strong>{title}</strong>
              </Typography.Description>
            )}
            <Typography.Description>{description}</Typography.Description>
          </div>
        </Card>
      </div>
    </div>
  );
};
