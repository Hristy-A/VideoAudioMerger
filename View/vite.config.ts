import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import replaceImportWithRequire from './vite-plugins/replace-import-with-require';

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    build: {
      rollupOptions: {
        input: getPages(),
      },
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
  const pages = readdirSync(resolve(__dirname, 'pages'))
    .filter((file) => file.endsWith('.html'))
    .map((file) => file.replace('.html', ''));

  return Object.fromEntries(pages.map((page) => [page, resolve(__dirname, `pages/${page}.html`)]));
}
