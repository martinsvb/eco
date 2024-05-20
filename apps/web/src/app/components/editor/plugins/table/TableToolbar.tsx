import { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_TABLE_COMMAND, InsertTableCommandPayload } from "@lexical/table";
import { Button, Stack } from "@mui/material";
import TableViewIcon from '@mui/icons-material/TableView';
import AppDialog, { useDialog } from "../../../dialog/AppDialog";
import AppIconButton from "../../../buttons/AppIconButton";
import TextField from "../../../formControls/TextField";

enum TableItems {
  Columns = 'columns',
  Rows = 'rows',
}

const TableToolbar = () => {

  const [ editor ] = useLexicalComposerContext();

  const { t } = useTranslation();

  const [ payload, setPayload ] = useState<InsertTableCommandPayload>({
    [TableItems.Columns]: '',
    [TableItems.Rows]: ''
  });

  const { open, handleClickOpen, handleClose } = useDialog();

  const handleInsertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, payload);
    handleClose();
  };

  const handleChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setPayload((prevPayload) => ({...prevPayload, [name]: String(value)}));
    },
    []
  );

  return (
    <>
      <AppIconButton
        title={t('editor:table')}
        id='insertEditorTable'
        onClick={handleClickOpen}
      >
        <TableViewIcon />
      </AppIconButton>
      <AppDialog
        actions={
          <>
            <Button
              autoFocus
              id="insertEditorTableDialogClose"
              onClick={handleClose}
            >
              {t('labels:close')}
            </Button>
            <Button
              id="insertEditorTableSubmit"
              type="submit"
              variant="contained"
              disabled={!payload.columns || !payload.rows}
              onClick={handleInsertTable}
            >
              {t('labels:insert')}
            </Button>
          </>
        }
        id="insertEditorTableDialog"
        dialogTitle={t('editor:insertTableTitle')}
        contentText={
          <Stack>
            <TextField
              id="editorTableColumnsCount"
              name={TableItems.Columns}
              label={t('editor:editorTableColumnsCount')}
              onChange={handleChange}
              sx={{mb: 2}}
              required
            />
            <TextField
              id="editorTableRowsCount"
              name={TableItems.Rows}
              label={t('editor:editorTableRowsCount')}
              onChange={handleChange}
              required
            />
          </Stack>
        }
        open={open}
      />
    </>
  );
}

export default TableToolbar;
