import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { Checkbox, CheckboxProps } from "@/components/ui/checkbox/checkbox";

type ControlledCheckboxProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "rules"
> &
  Omit<CheckboxProps, "onChange" | "value">;

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ control, name, shouldUnregister });

  const handleChange = onChange as (value: boolean) => void;

  return (
    <Checkbox
      checked={value}
      errorMessage={error?.message}
      onChange={handleChange}
      {...rest}
    />
  );
};
