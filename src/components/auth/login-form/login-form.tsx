import { LoginFormInputs, useLoginForm } from "@/common";
import { PATH } from "@/common/constants/route-path";

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
        <Button fullWidth type={"submit"}>
          Sign In
        </Button>
        <Typography className={s.noAccount} variant={"body_2"}>
          {`Don't have an account?`}
        </Typography>
        <Typography
          as={"a"}
          className={s.signUpLink}
          href={PATH.REGISTRATION}
          variant={"link_1"}
        >
          Sign Up
        </Typography>
      </form>
    </Card>
  );
};
