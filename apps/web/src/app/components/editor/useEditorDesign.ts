import { useTheme } from "@mui/material";
import { THEME_MODE } from '../../../config';

export const useEditorDesign = () => {

  const { palette: { background, common, grey, mode }, shape, spacing, typography } = useTheme();

  return {
    editorContainerSx: {
      borderRadius: shape.borderRadius / 4,
      border: `1px solid ${grey[500]}`,
      color: mode === THEME_MODE.LIGHT ? common.black : common.white,
      position: 'relative',
      lineHeight: 1
    },
    editorInnerSx: {
      position: 'relative',
      background: background.default,
      '& .editor-input': {
        minHeight: '200px',
        resize: 'none',
        fontSize: typography.fontSize,
        position: 'relative',
        tabSize: 1,
        outline: 0,
        py: 2,
        px: 1.5, 
        caretColor: grey[800],
      },
      '& .editor-text-bold': {
        fontWeight: 'bold',
      },
      '& .editor-text-italic': {
        fontStyle: 'italic',
      },
      '& .editor-text-underline': {
        textDecoration: 'underline',
      },
      '& .editor-text-strikethrough': {
        textDecoration: 'line-through',
      },
      '& .editor-text-underlineStrikethrough': {
        textDecoration: 'underline line-through',
      },
      '& table': {
        borderCollapse: 'collapse',
        '& th, td': {
          width: '200px',
          padding: spacing(1),
          border: `1px solid ${grey[800]}`,
        },
      }
    }
  }
}
