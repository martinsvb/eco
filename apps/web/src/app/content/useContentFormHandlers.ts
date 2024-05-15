import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@eco/config";
import { apiPatchContent, apiPostContent, useAppDispatch } from "@eco/redux";
import { ContentData, ContentTypes } from "@eco/types";

export const useContentFormHandlers = (type: ContentTypes, formData: ContentData, id?: string) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submit = useCallback(
    (body: ContentData) => {
      if (id) {
        dispatch(
          apiPatchContent({
            body,
            id,
            type,
          })
        );
      }
      else {
        dispatch(
          apiPostContent({
            body,
            type,
            onSuccess: () => {
              navigate(routes.content[type].list);
            }
          })
        );
      } 
    },
    [dispatch, navigate, id, type]
  );

  const handleClick = useCallback(
    () => {
      submit(formData);
    },
    [submit, formData]
  );

  const handleClose = useCallback(
    () => {
      navigate(routes.content[type].list);
    },
    [navigate, type]
  );

  return {
    submit,
    handleClick,
    handleClose
  }
}
