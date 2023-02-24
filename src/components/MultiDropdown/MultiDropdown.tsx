import React from "react";

import classNames from "classnames";

import { MultiDropdownProps } from "./";
import styles from "./MultiDropdown.module.scss";
import MultiDropdownOptions from "./MultiDropdownOptions";

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  pluralizeOptions,
  className,
}) => {
  const MultiDropdownClass = classNames(
    styles["multi-dropdown"],
    styles["multi-dropdown_disabled"] && disabled,
    styles["multi-dropdown_picked"] && value.length
  );

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={MultiDropdownClass}>
      <div className={styles["multi-dropdown__selected"]} onClick={handleClick}>
        {pluralizeOptions(value)}
      </div>
      {isVisible && !disabled && (
        <MultiDropdownOptions
          options={options}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
