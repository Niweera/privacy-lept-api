module.exports = {
  apps: [
    {
      name: "privacy-lept-api",
      script: "./dist/src/index.js",
      args: ["--color"],
      exec_mode: "fork",
      instances: 1,
    },
  ],
};
