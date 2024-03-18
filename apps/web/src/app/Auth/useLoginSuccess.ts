import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallowEqualSelector, selectIsUserLoggedIn } from "@eco/redux";

export const useLoginSuccess = (handleClose: () => void) => {

    const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

    const navigate = useNavigate();
  
    useEffect(
      () => {
        if (isUserLoggedIn) {
          handleClose();
        }
      },
      [isUserLoggedIn, navigate]
    );
}
