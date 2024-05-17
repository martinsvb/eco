import { ReactNode, forwardRef, memo } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Box, InputBaseProps, InputLabel, Stack } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import CapturePlugin from './plugins/CapturePlugin';
import { useEditorDesign } from './useEditorDesign';
import Placeholder from './Placeholder';

const editorConfig = {
  namespace: 'Editor',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
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

  const { editorContainerSx, editorInnerSx } = useEditorDesign();

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
        <Box sx={editorContainerSx}>
          <ToolbarPlugin />
          <Box sx={editorInnerSx}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" id={id} />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onChange} />
            <CapturePlugin ref={ref} />
          </Box>
        </Box>
      </Stack>
    </LexicalComposer>
  );
})

export default memo(Editor);
