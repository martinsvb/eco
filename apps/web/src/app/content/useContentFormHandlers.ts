import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "@eco/config";
import { apiPatchContent, apiPostContent, useAppDispatch } from "@eco/redux";
import { ContentData, ContentTypes } from "@eco/types";

export const useContentFormHandlers = (
  type: ContentTypes,
  id?: string,
  handleDialogClose?: () => void
) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const submit = useCallback(
    (body: ContentData) => {
      if (id && !handleDialogClose) {
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
            parentId: id,
            type,
            onSuccess: () => {
              if (!handleDialogClose) {
                navigate(routes.content[type].list);
              }
              handleDialogClose?.();
            }
          })
        );
      } 
    },
    [dispatch, navigate, id, handleDialogClose, type]
  );

  const handleClose = useCallback(
    () => {
      navigate(routes.content[type].list);
    },
    [navigate, type]
  );

  return {
    submit,
    handleClose
  }
}
