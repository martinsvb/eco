export const handleError = (event: any) => {
  console.log(Error(event.message ?? event));
  const { message, filename, lineno, colno, error } = event;
  console.log('Captured uncaught error:', message, filename, lineno, colno, error.stack);
}
