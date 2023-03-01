import React from "react";

import { Option } from "@utils/types";

import styles from "./MultiDropdownOptions.module.scss";
import MultiDropdownOption from "../MultiDropdownOption";

export type MultiDropdownOptionsProps = {
  onChange: (value: Option[]) => void;
  options: Option[];
  value: Option[];
};

const MultiDropdownOptions: React.FC<MultiDropdownOptionsProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.multiDropdown__options}>
      {options.map((option) => {
        return (
          <MultiDropdownOption
            key={option.key}
            option={option}
            onChange={onChange}
            value={value}
          />
        );
      })}
    </div>
  );
};

export default React.memo(MultiDropdownOptions);
