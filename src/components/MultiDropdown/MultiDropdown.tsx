import React from "react";

import { Option } from "@utils/types";
import classNames from "classnames";

import MultiDropdownOptions, {
  MultiDropdownOptionsProps,
} from "./components/MultiDropdownOptions";
import styles from "./MultiDropdown.module.scss";

export type MultiDropdownProps = MultiDropdownOptionsProps & {
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
  className?: string;
};

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
    styles["multi-dropdown_picked"] && value.length,
    styles["multi-dropdown_disabled"] && disabled,
    className
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
