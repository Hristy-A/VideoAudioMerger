import { ipcRenderer } from 'electron';
import { Event } from '../event';
import { SelectFileOptions } from '../types';

export const selectFile = async (options?: SelectFileOptions): Promise<string | null> => {
  ipcRenderer.send('global:select-file', new Event(options));

  return new Promise((resolve) => {
    ipcRenderer.once('global:select-file-reply', (_, path) => {
      resolve(path[0] ?? null);
    });
  });
};
