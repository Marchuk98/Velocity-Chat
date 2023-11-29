import { useNavigate } from "react-router-dom";

import { LoginFormInputs } from "@/common";
import { LoginForm } from "@/components/auth/login-form/login-form";
import { Page } from "@/components/ui/page/page";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase/firebase";

export const Login = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (data: LoginFormInputs) => {
    try {
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password);

      // const user = userCredential.user;
      navigate("/");
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <Page flex>
      <LoginForm onSubmitHandler={onSubmitHandler} />
    </Page>
  );
};
