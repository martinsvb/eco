import { useTheme } from "@mui/material";
import { THEME_MODE } from '../../../config';

export interface EditorDesign {
  minHeight: string;
}

export const editorMinHeight = '200px';

export const useEditorElementsDesign = () => {

  const { palette: { grey }, spacing, typography } = useTheme();

  return {
    editorElementsDesign: {
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
      '& h1': {
        fontSize: '2.8rem',
        fontWeight: typography.h1.fontWeight,
        m: 0,
        mb: 1.5
      },
      '& h2': {
        fontSize: '2.2rem',
        fontWeight: typography.h2.fontWeight,
        m: 0,
        my: 1,
      },
      '& h3': {
        fontSize: '1.8rem',
        fontWeight: typography.h3.fontWeight,
        m: 0,
        my: 1,
      },
      '& p': {
        ...typography.body1,
        margin: 0,
        lineHeight: 1.3
      },
      '& p:last-child': {
        mb: 1
      },
      '& ol': {
        p: 0,
        m: 0,
        pl: 2,
        my: 1,
        '& li': {
          ml: 2
        }
      },
      '& ul': {
        p: 0,
        m: 0,
        pl: 2,
        my: 1,
        '& li': {
          ml: 2
        }
      },
      '& table': {
        borderCollapse: 'collapse',
        my: 1,
        '& th, td': {
          width: '200px',
          padding: spacing(1),
          border: `1px solid ${grey[800]}`,
        },
      }
    }
  }
}

export const useEditorDesign = ({
  minHeight
}: EditorDesign) => {

  const { palette: { background, common, grey, mode }, shape, typography } = useTheme();

  const { editorElementsDesign } = useEditorElementsDesign();

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
        minHeight,
        resize: 'none',
        fontSize: typography.body1.fontSize || typography.fontSize,
        position: 'relative',
        tabSize: 1,
        outline: 0,
        py: 2,
        px: 1.5, 
        caretColor: grey[800],
      },
      ...editorElementsDesign,
    },
  }
}
