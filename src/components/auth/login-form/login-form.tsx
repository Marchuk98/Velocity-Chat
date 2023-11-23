import { LoginFormInputs, useLoginForm } from "@/common";

import s from "./login-form.module.scss";

import { ControlledCheckbox, ControlledTextField } from "../../controlled";
import { Button, Card, Typography } from "../../ui";

type LoginFormProps = {
  onSubmitHandler: (data: LoginFormInputs) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmitHandler } = props;

  const { control, handleSubmit } = useLoginForm();

  const onSubmit = handleSubmit(onSubmitHandler);

  return (
    <Card className={s.card}>
      <Typography as={"h1"} variant={"large"}>
        Sign In
      </Typography>

      <form onSubmit={onSubmit}>
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
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          label={"Remember me"}
          name={"rememberMe"}
        />
        <Typography
          as={"a"}
          className={s.forgotPassword}
          href={""}
          variant={"body_2"}
        >
          Forgot password?
        </Typography>

        <Button fullWidth type={"submit"}>
          Sign In
        </Button>
        <Typography className={s.noAccount} variant={"body_2"}>
          {`Don't have an account?`}
        </Typography>
        <Typography
          as={"a"}
          className={s.signUpLink}
          href={""}
          variant={"link_1"}
        >
          Sign Up
        </Typography>
      </form>
    </Card>
  );
};
