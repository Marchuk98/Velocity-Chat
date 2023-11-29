import { useNavigate } from "react-router-dom";

import { RegisterFormInputs } from "@/common";
import { PATH } from "@/common/constants/route-path";
import { RegisterForm } from "@/components/auth/register-form/register-form";
import { Page } from "@/components/ui/page/page";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../../firebase/firebase";

export const Register = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (
    data: Omit<RegisterFormInputs, "confirmPassword">,
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // Update user profile without file upload
      await updateProfile(res.user, {
        displayName: data.name,
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        avatar: "",
        displayName: data.name,
        email: data.email,
        uid: res.user.uid,
      });

      await setDoc(doc(db, "userChat", res.user.uid), {});

      navigate(PATH.LOGIN);
    } catch (error: any) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <Page flex>
      <RegisterForm onSubmitHandler={onSubmitHandler} />
    </Page>
  );
};
