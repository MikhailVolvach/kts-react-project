import React from "react";

import { Option } from "@components/MultiDropdown";
import styles from "@components/MultiDropdown/MultiDropdown.module.scss";
import classNames from "classnames";

type OptionProps = {
  keyOpt: string;
  value: string;
  onChange?: (values: Option[]) => void;
  selected: boolean;
};

const OptionComponent: React.FC<OptionProps> = ({
  keyOpt,
  value,
  onChange,
  selected,
}) => {
  const handleClick = () => {
    if (!onChange) return;
    onChange([{ key: keyOpt, value: value }]);
  };

  const optionComponentClass = classNames(
    styles.multidropdown__option,
    `${selected ? styles.multidropdown__option_selected : ""}`
  );

  return (
    <div onClick={handleClick} className={optionComponentClass}>
      {value}
    </div>
  );
};

export default OptionComponent;
