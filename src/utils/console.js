const console = {
  log(...args) {
    return console.info('[aofuji]', ...args);
  },
  info(...args) {
    return console.info('[aofuji]', ...args);
  },
  error(...args) {
    return console.error('[aofuji]', ...args);
  },
};

export { console };
