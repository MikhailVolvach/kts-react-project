import React from "react";

import { Option } from "@components/MultiDropdown";
import styles from "@components/MultiDropdown/MultiDropdown.module.scss";

import OptionComponent from "./OptionComponent";

type OptionsComponentProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
};

const OptionsComponent: React.FC<OptionsComponentProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.multidropdown__options}>
      {options.map((option) => {
        let selected: boolean = value.some((val) => val.key === option.key);

        const handleClick = (opt: Option[]) => {
          if (selected) {
            onChange(value.filter((val) => val.key !== opt[0].key));
          } else {
            onChange(opt);
          }
        };

        return (
          <OptionComponent
            key={option.key}
            keyOpt={option.key}
            value={option.value}
            selected={selected}
            onChange={handleClick}
          />
        );
      })}
    </div>
  );
};

export default OptionsComponent;
