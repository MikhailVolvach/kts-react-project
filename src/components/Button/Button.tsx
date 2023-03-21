import React from "react";

import classNames from "classnames";
import Loader, { LoaderSize } from "components/Loader";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
    loading?: boolean;
    className?: string;
    dataAttr?: string;
}> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
    loading = false,
    children,
    onClick,
    disabled = false,
    className = "",
    dataAttr="",
    ...ButtonProps
}) => {
    if (loading) {
        disabled = true;
    }
    const buttonClass = classNames(styles.button, disabled && styles.button_disabled, className);
    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled} data-attr={dataAttr} {...ButtonProps}>
            {loading && <Loader loading={loading} size={LoaderSize.s} />}
            {children}
        </button>
    );
};

export default React.memo(Button);
