import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@eco/config";
import { apiPatchAccount, apiPostAccount, useAppDispatch } from "@eco/redux";
import { AccountData } from "@eco/types";

export const useAccountFormHandlers = (id?: string) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submit = useCallback(
    (body: AccountData) => {
      if (id) {
        dispatch(
          apiPatchAccount({
            body,
            id,
          })
        );
      }
      else {
        dispatch(
          apiPostAccount({
            body,
          })
        );
      }
    },
    [dispatch, id]
  );

  const handleClose = useCallback(
    () => {
      navigate(routes.accounts);
    },
    [navigate]
  );

  return {
    submit,
    handleClose
  }
}
