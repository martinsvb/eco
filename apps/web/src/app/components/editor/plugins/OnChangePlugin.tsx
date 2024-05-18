import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export type OnChangePluginProps = {
  onChange: ControllerRenderProps['onChange'];
  value?: string;
}

const OnChangePlugin = ({ onChange, value }: OnChangePluginProps) => {
  const [ editor ] = useLexicalComposerContext();

  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(
    () => {
      if (isFirstRender && value) {
        setIsFirstRender(false);
        if (value.includes('"root":{"children":[{')) {
          editor.setEditorState(editor.parseEditorState(value));
        }
      }

      return editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          onChange(JSON.stringify(editorState.toJSON()));
        });
      });
    },
    [editor, isFirstRender, value, onChange]
  );

  return null;
}

export default OnChangePlugin;
