import React from "react";

import classNames from "classnames";

import OptionsComponent from "./components/OptionsComponent";
import styles from "./MultiDropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = React.PropsWithChildren<{
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
}>;

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  pluralizeOptions,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const multiDropdownClass = classNames(
    styles.multidropdown,
    `${disabled ? styles.multidropdown__disabled : ""}`
  );

  return (
    <div className={multiDropdownClass}>
      <div onClick={toggleVisible} className={styles.multidropdown__selected}>
        {children}
        {pluralizeOptions(value)}
      </div>
      {isVisible && !disabled && (
        <OptionsComponent options={options} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default MultiDropdown;
