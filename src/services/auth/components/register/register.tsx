import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MainLoader } from "@/assets/loaders/main-loader";
import { RegisterFormInputs } from "@/common";
import { PATH } from "@/common/constants/route-path";
import { RegisterForm } from "@/components/auth/register-form/register-form";
import { Page } from "@/components/ui/page/page";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../../firebase/firebase";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (
    data: Omit<RegisterFormInputs, "confirmPassword">,
  ) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(res.user, {
        displayName: data.name,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        displayName: data.name,
        email: data.email,
        photoURL: "",
        uid: res.user.uid,
      });

      await setDoc(doc(db, "userChat", res.user.uid), {});

      navigate(PATH.LOGIN);
    } catch (error: any) {
      console.error("An error occurred during registration:", error);
    } finally {
      setLoading(false); // В любом случае (успех или неудача) устанавливаем состояние загрузки в false
    }
  };

  return (
    <Page flex>
      {loading && <MainLoader />}

      <RegisterForm onSubmitHandler={onSubmitHandler} />
    </Page>
  );
};
