import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalCommand,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from 'lexical';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { Divider, Stack } from '@mui/material';
import Icon from '../../buttons/Icon';

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const { t } = useTranslation();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);

  const handleClick = (type: LexicalCommand<void>, payload?: TextFormatType | ElementFormatType) => () => {
    editor.dispatchCommand(type, payload as void);
  };

  return (
    <Stack
      direction="row"
      sx={{
        p: 0.5
      }}
      ref={toolbarRef}
    >
      <Icon
        title={t('editor:undo')}
        disabled={!canUndo}
        id='editorUndo'
        onClick={handleClick(UNDO_COMMAND)}
      ><UndoIcon /></Icon>
      <Icon
        title={t('editor:redo')}
        disabled={!canRedo}
        id='editorRedo'
        onClick={handleClick(REDO_COMMAND)}
      ><RedoIcon /></Icon>
      <Divider orientation='vertical' sx={{mx: 1}} flexItem />
      <Icon
        title={t('editor:bold')}
        id='editorBold'
        color={isBold ? 'primary' : 'inherit'}
        onClick={handleClick(FORMAT_TEXT_COMMAND, 'bold')}
      ><FormatBoldIcon /></Icon>
      <Icon
        title={t('editor:italic')}
        id='editorItalic'
        color={isItalic ? 'primary' : 'inherit'}
        onClick={handleClick(FORMAT_TEXT_COMMAND, 'italic')}
      ><FormatItalicIcon /></Icon>
      <Icon
        title={t('editor:underline')}
        id='editorUnderline'
        color={isUnderline ? 'primary' : 'inherit'}
        onClick={handleClick(FORMAT_TEXT_COMMAND, 'underline')}
      ><FormatUnderlinedIcon /></Icon>
      <Icon
        title={t('editor:strikethrough')}
        id='editorStrikethrough'
        color={isStrikethrough ? 'primary' : 'inherit'}
        onClick={handleClick(FORMAT_TEXT_COMMAND, 'strikethrough')}
      ><StrikethroughSIcon /></Icon>
      <Divider orientation='vertical' sx={{mx: 1}} flexItem />
      <Icon
        title={t('editor:leftAlignment')}
        id='editorLeftAlign'
        onClick={handleClick(FORMAT_ELEMENT_COMMAND, 'left')}
      ><FormatAlignLeftIcon /></Icon>
      <Icon
        title={t('editor:centerAlignment')}
        id='editorCenterAlignment'
        onClick={handleClick(FORMAT_ELEMENT_COMMAND, 'center')}
      ><FormatAlignCenterIcon /></Icon>
      <Icon
        title={t('editor:rightAlignment')}
        id='editorRightAlignment'
        onClick={handleClick(FORMAT_ELEMENT_COMMAND, 'right')}
      ><FormatAlignRightIcon /></Icon>
      <Icon
        title={t('editor:justifyAlignment')}
        id='editorJustifyAlignment'
        onClick={handleClick(FORMAT_ELEMENT_COMMAND, 'justify')}
      ><FormatAlignJustifyIcon /></Icon>
    </Stack>
  );
}
