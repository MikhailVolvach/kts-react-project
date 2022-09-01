import React from "react";

import styles from "./CheckBox.module.scss";
import { CheckBoxProps } from "./config";

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked = false,
  text = "",
  ...rest
}) => {
  const [status, setStatus] = React.useState(checked);

  const handleChange = () => {
    setStatus(!status);
    onChange(!status);
  };

  return (
    <div onClick={handleChange}>
      <input
        className={[styles.checkbox, "visually-hidden"].join(" ")}
        checked={status}
        onChange={handleChange}
        type="checkbox"
        {...rest}
      />
      <label>{text}</label>
    </div>
  );
};

export default React.memo(CheckBox);
