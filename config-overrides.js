const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "components": "src/components",
    "fonts": "src/fonts",
    "public": "public",
    "src": "src",
    "node_modules": "node_modules",
  })(config);

  return config;
};
