import { $getSelection, $isRangeSelection } from "lexical";
import { useTranslation } from "react-i18next";
import { Typography, useTheme } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode } from '@lexical/rich-text';
import AppIconButton from "../../buttons/AppIconButton";

type HeadingTag = 'h1' | 'h2' | 'h3';

const HeadingsPlugin = () => {

  const { t } = useTranslation();

  const [ editor ] = useLexicalComposerContext();

  const { typography } = useTheme();

  const headingLevels = [1, 2, 3];

  const handleClick = (level: number) => () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(`h${level}` as HeadingTag));
      }
    });
  };

  return (
    <>
      {headingLevels.map((level) => (
        <AppIconButton
          title={t('editor:heading', {level})}
          id={`editorHeading-${level}`}
          onClick={handleClick(level)}
        >
          <Typography
            variant="h6"
            sx={{
              mx: 0.25,
              fontWeight: typography.fontWeightBold,
              fontSize: '1rem !important',
            }}
          >
            {t('editor:headingShortcut', {level})}
          </Typography>
        </AppIconButton>
      ))}
    </>
  );
}

export default HeadingsPlugin;
