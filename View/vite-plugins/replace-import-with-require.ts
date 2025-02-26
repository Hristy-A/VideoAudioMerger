import { Plugin } from 'vite';

export default function replaceImportWithRequire(): Plugin {
  return {
    name: 'vite-plugin-replace-import-with-require',
    transform(code, id) {
      if (id.endsWith('.tsx') || id.endsWith('.ts')) {
        return code.replace(
          /import(\s*.*?)from\s['"]electron['"]/,
          'const $1 = require("electron");',
        );
      }

      return code;
    },
  };
}
