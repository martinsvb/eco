import { useTranslation } from "react-i18next";
import { Box, useTheme } from "@mui/material";

const Placeholder = () => {

  const { t } = useTranslation();

  const { palette, typography } = useTheme();

  return (
    <Box
      sx={{
        color: palette.grey[600],
        overflow: 'hidden',
        position: 'absolute',
        textOverflow: 'ellipsis',
        top: 16,
        left: 10,
        fontSize: typography.fontSize,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none'
      }}
    >
      {t('editor:placeholder')}
    </Box>
  );
}

export default Placeholder;
