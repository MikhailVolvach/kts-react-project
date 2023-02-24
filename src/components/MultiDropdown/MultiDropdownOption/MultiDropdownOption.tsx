import React from "react";

import classNames from "classnames";

import { MultiDropdownOptionProps } from "./index";
import styles from "./MultiDropdownOption.module.scss";

const MultiDropdownOption: React.FC<MultiDropdownOptionProps> = ({
  option,
  value,
  onChange,
}) => {
  const selected = value.some((val) => val.key === option.key);

  const handleClick = () => {
    if (!onChange) {
      return;
    }
    if (selected) {
      onChange(value.filter((val) => val.key !== option.key));
    } else {
      onChange([option]);
    }
  };

  return (
    <div
      className={classNames(
        styles["multi-dropdown__option"],
        selected && styles["multi-dropdown__option_selected"]
      )}
      onClick={handleClick}
    >
      {option.value}
    </div>
  );
};

export default React.memo(MultiDropdownOption);
