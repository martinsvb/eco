import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import AppIconButton from "../../buttons/AppIconButton";

enum Lists {
  OrderedList = 'ol',
  UnorderedList = 'ul',
}

const ListsPlugin = () => {

  const { t } = useTranslation();

  const [ editor ] = useLexicalComposerContext();

  const handleClick = (list: Lists) => () => {
    editor.dispatchCommand(
      list === Lists.OrderedList
        ? INSERT_ORDERED_LIST_COMMAND
        : INSERT_UNORDERED_LIST_COMMAND,
      undefined
    );
  };

  return (
    <Stack direction="row">
      <AppIconButton
        title={t('editor:orderedList')}
        id={`editorList-${Lists.OrderedList}`}
        onClick={handleClick(Lists.OrderedList)}
      >
        <FormatListNumberedIcon />
      </AppIconButton>
      <AppIconButton
        title={t('editor:unorderedList')}
        id={`editorList-${Lists.UnorderedList}`}
        onClick={handleClick(Lists.UnorderedList)}
      >
        <FormatListBulletedIcon />
      </AppIconButton>
    </Stack>
  );
}

export default ListsPlugin;
