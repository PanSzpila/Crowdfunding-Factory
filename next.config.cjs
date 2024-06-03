module.exports = {
  swc: {
    jsc: {
      parser: {
        syntax: "ecmascript",
        dynamicImport: true,
      },
    },
    minify: process.env.NODE_ENV === "production",
    async transform(src, filename) {
      const result = await require("@swc/core").transform(src, {
        filename,
        jsc: {
          parser: {
            syntax: "ecmascript",
            dynamicImport: true,
          },
        },
      });
      return {
        code: result.code,
        map: result.map,
      };
    },
  },
  compiler: {
    // Enable the SWC-based emotion plugin
    emotion: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  },
};
