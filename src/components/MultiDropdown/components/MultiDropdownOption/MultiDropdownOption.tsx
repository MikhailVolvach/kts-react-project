import React from "react";

import { Option } from "utils/types";
import classNames from "classnames";

import styles from "./MultiDropdownOption.module.scss";

export type MultiDropdownOptionProps = {
  keyOpt: string;
  keyValue: string;
  onChange?: (option: Option) => void;
  isSelected: boolean;
};

const MultiDropdownOption: React.FC<MultiDropdownOptionProps> = ({
  keyOpt,
  keyValue,
  onChange,
  isSelected,
}) => {
  const handleClick = React.useCallback(() => {
    if (!onChange) {
      return;
    }
    onChange({ key: keyOpt, value: keyValue });
  }, [onChange]);

  return (
    <div
      className={classNames(
        styles["multi-dropdown__option"],
        isSelected && styles["multi-dropdown__option_selected"]
      )}
      onClick={handleClick}
    >
      {keyValue}
    </div>
  );
};

export default React.memo(MultiDropdownOption);
