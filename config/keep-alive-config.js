export const keepAliveConfig = {
  consoleLogOnError: true,

  otherEndpoints: [
    'https://your-other-vercel-project-urls.vercel.app/api/keep-alive',
  ],
};

// Removed the TS-only line:
// export type KeepAliveConfig = typeof keepAliveConfig
