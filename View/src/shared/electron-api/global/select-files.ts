import { ipcRenderer } from 'electron';
import { Event } from '../event';
import { SelectFileOptions } from '../types';

export const selectFiles = async (options?: SelectFileOptions): Promise<string[]> => {
  ipcRenderer.send('global:select-files', new Event(options));

  return new Promise((resolve) => {
    ipcRenderer.once('global:select-files-reply', (_, paths) => {
      resolve(paths);
    });
  });
};
