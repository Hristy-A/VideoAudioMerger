import { ipcRenderer } from 'electron';
import { Event } from '../event';

export const selectDirectory = async (): Promise<string | null> => {
  ipcRenderer.send('global:select-directory', new Event(null));

  return new Promise((resolve) => {
    ipcRenderer.once('global:select-directory-reply', (_, path) => {
      resolve(path[0] ?? null);
    });
  });
};
