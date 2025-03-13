import { ipcRenderer } from 'electron';
import { Event } from '../event';

interface OpenDirectoryEvent {
  path: string;
}

export const openDirectory = (path: string) => {
  ipcRenderer.send('global:open-directory', new Event<OpenDirectoryEvent>({ path }));

  return new Promise((resolve) => {
    ipcRenderer.once('global:open-directory-reply', () => {
      resolve(path);
    });
  });
};
