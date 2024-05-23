import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorValue } from "../types";

export type OnChangePluginProps = {
  onChange: ControllerRenderProps['onChange'];
  value?: EditorValue;
}

const OnChangePlugin = ({ onChange, value }: OnChangePluginProps) => {
  const [ editor ] = useLexicalComposerContext();

  const [ isFirstRender, setIsFirstRender ] = useState(true)

  useEffect(
    () => {
      if (isFirstRender && value) {
        setIsFirstRender(false);
        if (value.root) {
          editor.setEditorState(editor.parseEditorState(value));
        }
      }

      return editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          onChange(editorState.toJSON());
        });
      });
    },
    [editor, isFirstRender, value, onChange]
  );

  return null;
}

export default OnChangePlugin;
