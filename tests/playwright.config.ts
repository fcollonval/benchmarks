// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

export default {
  reportSlowTests: null,
  timeout: 90000,
  projects: [
    // JupyterLab 3 and later
    {
      name: "jupyterlab",
      testMatch: "jupyterlab/**",
    },
    // JupyterLab 1 or 2
    {
      name: "jupyterlab-1-2",
      testMatch: "jupyterlab-1-2/**",
    },
    {
      name: "testing",
      testMatch: "jupyterlab/**",
      use: {
        video: "retain-on-failure"
      }
    },
    {
      name: "retrolab",
      testMatch: "retrolab/**",
      use: {
        baseURL: "http://localhost:9980",
        mockSettings: {
          "@jupyterlab/fileeditor-extension:plugin": {
            editorConfig: { cursorBlinkRate: -1 },
          },
          "@jupyterlab/notebook-extension:tracker": {
            codeCellConfig: { cursorBlinkRate: -1 },
            markdownCellConfig: { cursorBlinkRate: -1 },
            rawCellConfig: { cursorBlinkRate: -1 },
          },
        },
      },
    },
    {
      name: "jlab-no-virtualization",
      testMatch: "jupyterlab/**",
      use: {
        mockSettings: {
          "@jupyterlab/fileeditor-extension:plugin": {
            editorConfig: { cursorBlinkRate: -1 },
          },
          "@jupyterlab/notebook-extension:tracker": {
            codeCellConfig: { cursorBlinkRate: -1 },
            markdownCellConfig: { cursorBlinkRate: -1 },
            rawCellConfig: { cursorBlinkRate: -1 },
            renderCellOnIdle: false,
            numberCellsToRenderDirectly: 10000000000000,
          },
        },
      },
    },
  ],
  reporter: [
    [process.env.CI ? "dot" : "list"],
    [
      "@jupyterlab/galata/lib/benchmarkReporter",
      { outputFile: "lab-benchmark.json" },
    ],
  ],
  use: {
    // Browser options
    browserName: process.env.BROWSER_NAME ?? 'chromium',
    // headless: false,
    // slowMo: 500,
    // Context options
    viewport: { width: 1024, height: 768 },
    // Artifacts
    video: process.env.PW_VIDEO ? "on" : "off", // "retain-on-failure",
    baseURL: process.env.TARGET_URL ?? 'http://localhost:9999'
  },
  preserveOutput: "failures-only",
  workers: 1,
  retries: 0
};
