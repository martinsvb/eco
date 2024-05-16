import { forwardRef, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const CapturePlugin = forwardRef((props, ref: any) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    ref.current = editor;
    return () => {
      ref.current = null;
    };
  }, [editor, ref]);

  return null;
});

export default CapturePlugin;
