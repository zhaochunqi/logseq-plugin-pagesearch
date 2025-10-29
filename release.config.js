module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/git",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "zip -qq -r logseq-plugin-todo-master-${nextRelease.version}.zip dist readme.md logo.svg package.json",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "logseq-plugin-todo-master-*.zip",
      },
    ],
  ],
};
