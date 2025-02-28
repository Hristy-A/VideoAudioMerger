import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import replaceImportWithRequire from './vite-plugins/replace-import-with-require';

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    root: 'src',
    publicDir: '../public',
    build: {
      rollupOptions: {
        input: getPages(),
      },
    },
    server: {
      open: '/pages/main/main.html',
    },
    resolve: {
      alias: {
        '~': resolve('src/'),
      },
    },
    plugins: [react(), replaceImportWithRequire(), ...(mode === 'inspect' ? [Inspect()] : [])],
  });
};

function getPages(): Record<string, string> {
  const pages = readdirSync(resolve(__dirname, 'src/pages'));

  return Object.fromEntries(
    pages.map((page) => [page, resolve(__dirname, `src/pages/${page}/${page}.html`)]),
  );
}
