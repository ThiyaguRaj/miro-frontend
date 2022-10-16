const {NextFederationPlugin} = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "container",
          filename: "remoteEntry.js",
          remotes: {
            counter: "counter@http://localhost:8080/remoteEntry.js",
          },
        })
      );
    }

    return config;
  },
};