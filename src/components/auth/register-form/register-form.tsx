import { PATH } from "@/common/constants/route-path";
import { RegisterFormInputs, UseRegisterForm } from "@/common/schemas";
import { ControlledTextField } from "@/components/controlled";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card/card";
import { Typography } from "@/components/ui/typography";

import s from "./register-form.module.scss";

export type RegisterFormProps = {
  onSubmitHandler: (data: Omit<RegisterFormInputs, "confirmPassword">) => void;
};

export const RegisterForm = (props: RegisterFormProps) => {
  const { onSubmitHandler } = props;

  const { control, handleSubmit, reset } = UseRegisterForm();

  const onSubmit = handleSubmit((data) => {
    onSubmitHandler({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    reset();
  });

  return (
    <Card className={s.card}>
      <Typography as={"h1"} variant={"large"}>
        Sign Up
      </Typography>

      <form onSubmit={onSubmit}>
        <ControlledTextField
          autoComplete={"name"}
          className={s.textField}
          control={control}
          label={"name"}
          name={"name"}
        />
        <ControlledTextField
          autoComplete={"username"}
          className={s.textField}
          control={control}
          label={"Email"}
          name={"email"}
        />
        <ControlledTextField
          autoComplete={"current-password"}
          className={s.textField}
          control={control}
          label={"Password"}
          name={"password"}
          type={"password"}
        />
        <ControlledTextField
          autoComplete={"confirm-password"}
          className={s.textField}
          control={control}
          label={"Confirm password"}
          name={"confirmPassword"}
          type={"password"}
        />
        <Button className={s.registerAccountButton} fullWidth type={"submit"}>
          Submit
        </Button>
        <Typography
          className={s.accountCreated}
          color={"form"}
          variant={"body_2"}
        >
          {`Already have an account?`}
        </Typography>
        <Typography
          as={"a"}
          className={s.signInLink}
          href={PATH.LOGIN}
          variant={"link_1"}
        >
          Sign In
        </Typography>
      </form>
    </Card>
  );
};
