(function () {
  if (window.require == null) {
    const createProxy = (apiKey) =>
      new Proxy(
        {},
        {
          get(_, prop) {
            return () => {
              console.warn(`${apiKey}.${prop} api not supported in browser`);
            };
          },
        },
      );

    const electronApiKeys = [
      'clipboard',
      'nativeImage',
      'shell',
      'contextBridge',
      'crashReporter',
      'ipcRenderer',
      'webFrame',
    ];

    window.require = (module) => {
      if (module !== 'electron') {
        console.error(`requested module ${module} not exists in browser`);
      }

      return Object.fromEntries(electronApiKeys.map((key) => [key, createProxy(key)]));
    };
  }
})();
