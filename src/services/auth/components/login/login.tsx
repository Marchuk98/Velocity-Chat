import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainLoader } from "@/assets/loaders/main-loader";
import { LoginFormInputs } from "@/common";
import { LoginForm } from "@/components/auth/login-form/login-form";
import { Page } from "@/components/ui/page/page";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase/firebase";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error: any) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page flex>
      {loading && <MainLoader />}
      <LoginForm onSubmitHandler={onSubmitHandler} />
    </Page>
  );
};
