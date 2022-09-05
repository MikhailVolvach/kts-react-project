import React from "react";

import { Option } from "@ui/MultiDropdown";
import s from "@ui/MultiDropdown/MultiDropdown.module.scss";

import { OptionsComponentProps } from "./";
import OptionComponent from "./OptionComponent";

const OptionsComponent: React.FC<OptionsComponentProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className={s.multidropdown__options}>
      {options.map((option) => {
        let isSelected: boolean = selected.some(
          (val) => val.key === option.key
        );

        const handleClick = (opt: Option[]) => {
          if (isSelected) {
            onChange(selected.filter((val) => val.key !== opt[0].key));
          } else {
            onChange(opt);
          }
        };

        return (
          <OptionComponent
            key={option.key}
            keyOpt={option.key}
            selected={option.value}
            isSelected={isSelected}
            onChange={handleClick}
          />
        );
      })}
    </div>
  );
};

export default React.memo(OptionsComponent);
