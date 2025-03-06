import { ipcRenderer } from 'electron';

ipcRenderer.on('global:register-window', (_, [windowId]) => {
  window.__WINDOW_ID__ = windowId;
});
