import React from "react";

import s from "@ui/MultiDropdown/MultiDropdown.module.scss";
import cn from "classnames";

import { OptionProps } from "./";

const OptionComponent: React.FC<OptionProps> = ({
  keyOpt,
  selected,
  onChange,
  isSelected,
}) => {
  const handleClick = () => {
    if (!onChange) return;
    onChange([{ key: keyOpt, value: selected }]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        s.multidropdown__option,
        isSelected && s.multidropdown__option_selected
      )}
    >
      {selected}
    </div>
  );
};

export default React.memo(OptionComponent);
