import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@eco/config";
import { useShallowEqualSelector, selectIsUserLoggedIn } from "@eco/redux";

export const useLoginSuccess = () => {

    const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

    const navigate = useNavigate();
  
    useEffect(
      () => {
        if (isUserLoggedIn) {
          navigate(`${routes.base}${routes.accounts}`);
        }
      },
      [isUserLoggedIn, navigate]
    );
}
