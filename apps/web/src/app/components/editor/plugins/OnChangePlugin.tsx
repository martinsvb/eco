import { useEffect } from "react";
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ControllerRenderProps } from "react-hook-form";

export type OnChangePluginProps = {
  onChange: ControllerRenderProps['onChange'];
}

const OnChangePlugin = ({ onChange }: OnChangePluginProps) => {
  const [ editor ] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        onChange({editorState, html: $generateHtmlFromNodes(editor, null)});
      });
    });
  }, [editor, onChange]);

  return null;
}

export default OnChangePlugin;
