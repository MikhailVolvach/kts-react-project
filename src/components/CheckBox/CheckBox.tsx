import React from "react";

import styles from "./CheckBox.module.scss";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  checked?: boolean;
  onChange: (value: boolean) => void;
  text?: string;
};

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
        className={styles.checkbox}
        checked={status}
        onChange={handleChange}
        type="checkbox"
        {...rest}
      />
      <label>{text}</label>
    </div>
  );
};

export default CheckBox;
