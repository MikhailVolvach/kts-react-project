import React from "react";

import { Option } from "utils/types";

import styles from "./MultiDropdownOptions.module.scss";
import MultiDropdownOption from "../MultiDropdownOption";

export type MultiDropdownOptionsProps = {
  onChange: (value: Option) => void;
  options: Option[];
  value: string;
};

const MultiDropdownOptions: React.FC<MultiDropdownOptionsProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles["multi-dropdown__options"]}>
      {options.map((option) => {
        const selected = value === option.value;
        const handleClick = React.useCallback((option: Option) => {
          onChange(option);
        }, []);
        return (
          <MultiDropdownOption
            key={option.key}
            keyOpt={option.key}
            keyValue={option.value}
            onChange={handleClick}
            isSelected={selected}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MultiDropdownOptions);
