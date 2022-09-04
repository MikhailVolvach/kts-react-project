import React from "react";

import cn from "classnames";

import { MultiDropdownProps } from "./";
import OptionsComponent from "./components/OptionsComponent";
import s from "./MultiDropdown.module.scss";

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  selected,
  onChange,
  disabled = false,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={cn(s.multidropdown, disabled && s.multidropdown__disabled)}>
      <div onClick={toggleVisible} className={s.multidropdown__selected}>
        {children}
        {selected.map((val) => val.value)}
      </div>
      {isVisible && !disabled && (
        <OptionsComponent
          options={options}
          selected={selected}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
