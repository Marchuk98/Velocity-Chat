import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

  useEffect(() => {
    // Используйте isMounted для предотвращения вызова setLoggedIn после размонтирования компонента
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        setLoggedIn(!!user); // Конвертируем в булево значение
        setCheckingStatus(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe(); // Отписываемся при размонтировании компонента
    };
  }, []);

  return { checkingStatus, loggedIn };
};
