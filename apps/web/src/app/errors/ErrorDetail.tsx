import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { ErrorItemData } from './getErrorData';
import { is } from 'ramda';
import { THEME_MODE } from '../../config';
import { useMobileDetection } from '../hooks';

interface ErrorDetailProps {
  titleWidth: number;
  data: ErrorItemData[];
  name?: string;
}

export const ErrorDetail = ({titleWidth, data, name}: ErrorDetailProps) => {

  const { palette, typography } = useTheme();

  const isMobile = useMobileDetection();

  return (
    <Box
      component={Paper}
      mr={!isMobile ? 2 : undefined}
      mb={isMobile ? 2 : undefined}
      sx={{
        border: palette.mode === THEME_MODE.DARK
          ? `1px solid ${palette.grey[500]}`
          : undefined
      }}
    >
      {data.map(({item, value}, index) => (
        <Stack
          key={`${item}-${index}`}
          direction="row"
          p={2}
          sx={{
            background: index % 2
              ? palette.grey[palette.mode === THEME_MODE.LIGHT ? 300 : 800]
              : palette.background.default,
            borderBottom: `1px solid ${palette.grey[500]}`
          }}
        >
          <Typography
            variant="body1"
            mr={2}
            width={!isMobile ? titleWidth : undefined}
            fontWeight={typography.fontWeightBold}
          >
            {item === 'name' && name ? name : item}
          </Typography>
          {is(Object, value)
            ? <Box component="pre" my={0}>
                {JSON.stringify(value, undefined, 2)}
              </Box>
            : is(Boolean, value)
              ? value
                ? <CheckIcon />
                : <ClearIcon />
              : <Typography variant="body1">{value}</Typography>
          }
        </Stack>
      ))}
    </Box>
  );
};
