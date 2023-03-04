// TODO: Проверить работу коллбека

import React from "react";

import { Option } from "@utils/types";
import classNames from "classnames";

import styles from "./MultiDropdownOption.module.scss";

export type MultiDropdownOptionProps = {
  option: Option;
  value: Option[];
  onChange?: (value: Option[]) => void;
};

const MultiDropdownOption: React.FC<MultiDropdownOptionProps> = ({
  option,
  value,
  onChange,
}) => {
  const selected = value.some((val) => val.key === option.key);

  const handleClick = React.useCallback(() => {
    if (!onChange) {
      return;
    }
    if (selected) {
      onChange(value.filter((val) => val.key !== option.key));
    } else {
      onChange([option]);
    }
  }, [onChange, value, selected]);

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
