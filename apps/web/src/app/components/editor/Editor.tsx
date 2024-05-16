import { ReactNode, forwardRef, memo } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { InputBaseProps, InputLabel, Stack } from '@mui/material';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import CapturePlugin from './plugins/CapturePlugin';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'Editor',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

export type EditorProps = {
  label: ReactNode;
} & Pick<InputBaseProps, 'id' | 'disabled'>;

const Editor = forwardRef(({
  id,
  disabled,
  label,
  onChange
}: EditorProps & Pick<ControllerRenderProps, 'onChange'>, ref) => {

  const formControlStates = { disabled };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Stack>
        <InputLabel
          {...formControlStates}
          shrink
          htmlFor={id}
          sx={{
            lineHeight: 1,
            mb: 0.25
          }}
        >
          {label}
        </InputLabel>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={onChange} />
            <CapturePlugin ref={ref} />
          </div>
        </div>
      </Stack>
    </LexicalComposer>
  );
})

export default memo(Editor);
