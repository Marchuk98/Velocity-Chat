import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import { TextField, TextFieldProps } from "../ui";

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "defaultValue" | "rules"
> &
  Omit<TextFieldProps, "onChange" | "value">;

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return <TextField {...field} {...rest} errorMessage={error?.message} />;
};
