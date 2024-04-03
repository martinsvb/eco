import { useCallback } from 'react';
import { Tooltip, IconButton, useTheme, Stack } from '@mui/material';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useTranslation } from 'react-i18next';
import { LocalStorageItems, THEME_MODE } from '@eco/config';

const UserColorMode = () => {

    const { t } = useTranslation();

    const { palette } = useTheme();

    const handleClick = useCallback(
        (mode: THEME_MODE | null) => {
            if (mode) {
                localStorage.setItem(LocalStorageItems.Mode, mode);
            }
            else {
                localStorage.removeItem(LocalStorageItems.Mode);
            }
            dispatchEvent(new Event('storage'));
        },
        [palette]
    )

    return (
        <Stack direction="row" justifyContent="space-around">
            <IconButton
                color="inherit"
                onClick={() => {
                    handleClick(THEME_MODE.LIGHT)
                }}
                aria-label={t('labels:colorModeLight')}
                title={t('labels:colorModeLight')}
            >
                <Brightness5Icon />
            </IconButton>
            <IconButton
                color="inherit"
                onClick={() => {
                    handleClick(THEME_MODE.DARK)
                }}
                aria-label={t('labels:colorModeDark')}
                title={t('labels:colorModeDark')}
            >
                <Brightness2Icon />
            </IconButton>
            <IconButton
                color="inherit"
                onClick={() => {
                    handleClick(null)
                }}
                aria-label={t('labels:colorModeSystem')}
                title={t('labels:colorModeSystem')}
            >
                <SettingsBrightnessIcon />
            </IconButton>
        </Stack>
    );
};

export default UserColorMode;
