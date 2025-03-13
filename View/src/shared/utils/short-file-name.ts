const DELIMETERS = /[\\/]/;

export const shortFileName = (path: string) => {
  const fileParts = path.split(DELIMETERS);

  return fileParts[fileParts.length - 1];
};
