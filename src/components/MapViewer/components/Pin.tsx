import React from "react";
import cn from "classnames";
import ArrowIcon from "@assets/svg/icons/arrow.svg";
import styles from "./map-components.module.scss";

type PinProps = {
  className: string;
  selected: boolean;
  minimized: boolean;
  onClick: () => void;
};

const Pin: React.FC<PinProps> = ({
  className,
  selected,
  minimized,
  onClick,
}) => (
  <img
    src={ArrowIcon}
    className={cn(className, styles.pin, {
      [styles.pinSelected]: selected,
      [styles.pinMinimized]: minimized,
    })}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  />
);

export default Pin;
