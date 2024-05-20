import { ReactNode, forwardRef, memo } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { Box, InputBaseProps, InputLabel, Stack } from '@mui/material';
import { ListNode, ListItemNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HeadingNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import ExampleTheme from './ExampleTheme';
import ToolbarPlugin, { ToolbarPluginProps } from './plugins/ToolbarPlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import CapturePlugin from './plugins/CapturePlugin';
import { useEditorDesign } from './useEditorDesign';
import Placeholder from './Placeholder';

const editorConfig = {
  namespace: 'Editor',
  nodes: [HeadingNode, ListNode, ListItemNode, TableCellNode, TableNode, TableRowNode],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

export type EditorProps = {
  label: ReactNode;
  value?: string;
  toolbarProps?: ToolbarPluginProps;
} & Pick<InputBaseProps, 'id' | 'disabled'>;

const Editor = forwardRef(({
  id,
  disabled,
  label,
  onChange,
  value,
  toolbarProps = {
    showHeadingsPlugin: true,
    showListsPlugin: true,
    showTablePlugin: false,
  },
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
          <ToolbarPlugin {...toolbarProps} />
          <Box sx={editorInnerSx}>
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" id={id} />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin onChange={onChange} value={value} />
              <CapturePlugin ref={ref} />
              {toolbarProps.showListsPlugin && <ListPlugin />}
              {toolbarProps.showTablePlugin && <TablePlugin />}
          </Box>
        </Box>
      </Stack>
    </LexicalComposer>
  );
})

export default memo(Editor);
