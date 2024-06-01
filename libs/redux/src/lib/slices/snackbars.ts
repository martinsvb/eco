import { SharedProps, enqueueSnackbar } from 'notistack';

export const showSnackbar = (message: string, options: SharedProps) => {
  enqueueSnackbar(message, options);
}

export const successSnackbar = (message: string, options?: SharedProps) => {
  showSnackbar(message, {...options, variant: 'success'});
}

export const errorSnackbar = (message: string, options?: SharedProps) => {
  showSnackbar(message, {...options, variant: 'error'});
}
