import { useMemo } from "react";
import sanitize from "sanitize-html";
import { serialize } from "../components/editor/serialize/richTextParser";

export const useHtml = (text: any) => {

  const htmlContent = useMemo(
    () => {
      try {
        return text
          ? {__html: sanitize(serialize(text.root.children).join(''), {
            allowedAttributes: {
              'span': [ 'class' ]
            }
          })}
          : undefined;
      }
      catch {
        return undefined;
      }
    },
    [text]
  );

  return htmlContent;
}
