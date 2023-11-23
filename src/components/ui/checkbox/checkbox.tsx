import { CheckMark } from "@/assets/icons";
import { Typography } from "@/components/ui/typography";
import * as CheckboxRDX from "@radix-ui/react-checkbox";
import * as LabelRadix from "@radix-ui/react-label";
import { clsx } from "clsx";

import s from "./checkbox.module.scss";

export type CheckboxProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  id?: string;
  label?: string;
  onChange?: (checked: boolean) => void;
  position?: "left";
  required?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    className,
    disabled,
    errorMessage,
    id,
    label,
    onChange,
    required,
  } = props;

  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper),
    container: clsx(s.container, className),
    error: s.error,
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
  };

  return (
    <>
      <div className={classNames.container}>
        <LabelRadix.Root asChild>
          <Typography as={"label"} className={s.wrap} variant={"body_2"}>
            <div className={classNames.buttonWrapper}>
              <CheckboxRDX.Root
                checked={checked}
                className={classNames.root}
                disabled={disabled}
                id={id}
                onCheckedChange={onChange}
                required={required}
              >
                {checked && (
                  <CheckboxRDX.Indicator
                    className={classNames.indicator}
                    forceMount
                  >
                    <CheckMark />
                  </CheckboxRDX.Indicator>
                )}
              </CheckboxRDX.Root>
            </div>
            {label}
          </Typography>
        </LabelRadix.Root>
      </div>
      {errorMessage && (
        <Typography className={classNames.error} variant={"body_2"}>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};
