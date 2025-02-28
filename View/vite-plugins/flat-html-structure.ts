import { rename, rmdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { Plugin } from 'vite';

export default function flatHtmlStructure(): Plugin {
  return {
    name: 'vite-plugin-flat-html-structure',
    writeBundle: async (options, bundle) => {
      const outDir = options.dir as string;
      const files = Object.keys(bundle);
      const htmlFiles = files.filter((file) => file.endsWith('.html'));

      for await (const htmlFile of htmlFiles) {
        const htmlFilePath = join(outDir, htmlFile);
        const htmlFileNameFull = basename(htmlFilePath);
        const htmlFileName = htmlFileNameFull.replace(/\.html$/, '');

        await rename(htmlFilePath, join(outDir, 'pages', htmlFileNameFull));
        await rmdir(join(outDir, 'pages', htmlFileName));
      }
    },
  };
}
