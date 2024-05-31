import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { filter, compose, not, isEmpty, omit } from "ramda";
import { routes } from "@eco/config";
import { apiPatchAccount, apiPostAccount, useAppDispatch } from "@eco/redux";
import { AccountData, AccountItems } from "@eco/types";

export const useAccountFormHandlers = (id?: string) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submit = useCallback(
    (data: AccountData) => {
      const body = filter(compose(not, isEmpty), omit([AccountItems.description], data));
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
