import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useState,
} from "react";

import { Close, Eye, EyeOff, Search } from "@/assets/icons";
import clsx from "clsx";

import s from "./text-field.module.scss";

import { Typography } from "../typography/typography";

export type TextFieldProps = {
  className?: string;
  errorMessage?: string;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  label?: string;
  onClearValue?: () => void;
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
} & ComponentPropsWithoutRef<"input">;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      iconEnd,
      iconStart,
      label,
      onClearValue,
      onEnter,
      onKeyDown,
      type,
      value,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const showError = errorMessage && errorMessage.length > 0;

    const classNames = {
      field: clsx(s.field, showError && s.error),
      iconButton: clsx(s.iconButton, disabled && s.disabled),
      iconDisabled: clsx(disabled && s.iconDisabled),
      iconStart: clsx(s.iconStart),
      label: clsx(s.label),
      root: clsx(s.root, className),
    };

    if (type === "search") {
      iconStart = <Search className={classNames.iconDisabled} />;
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onEnter && e.key === "Enter") {
        onEnter(e);
      }
      onKeyDown?.(e);
    };

    const showClearValueIcon =
      !iconEnd && !showError && onClearValue && value?.length! > 0;
    const dataIconStart = iconStart ? "start" : "";
    const dataIconEnd = iconEnd || showClearValueIcon ? "end" : "";
    const dataIcon = dataIconStart + dataIconEnd;
    const onClickShowValue = () => {
      if (!disabled) {
        setShowPassword(!showPassword);
      }
    };

    return (
      <div className={classNames.root}>
        {label && (
          <Typography
            as={"label"}
            className={classNames.label}
            variant={"body_2"}
          >
            {label}
          </Typography>
        )}
        <div className={s.fieldContainer}>
          {iconStart && <span className={s.iconStart}>{iconStart}</span>}
          <input
            className={classNames.field}
            data-icon={dataIcon}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            ref={ref}
            type={showPassword ? "text" : type}
            value={value}
            {...rest}
          />

          {type === "password" && (
            <button
              className={classNames.iconButton}
              onClick={onClickShowValue}
              type={"button"}
            >
              {!showPassword ? (
                <Eye className={classNames.iconDisabled} />
              ) : (
                <EyeOff className={classNames.iconDisabled} />
              )}
            </button>
          )}

          {showClearValueIcon && (
            <button
              className={classNames.iconButton}
              onClick={onClearValue}
              type={"button"}
            >
              {<Close />}
            </button>
          )}

          {iconEnd && <span className={s.iconEnd}>{iconEnd}</span>}
        </div>
        {showError && (
          <Typography color={"error"} variant={"error"}>
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  },
);
