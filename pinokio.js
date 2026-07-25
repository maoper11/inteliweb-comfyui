module.exports = {
  version: "1.2-beta",
  title: "ComfyUI",
  description:
    "One-click ComfyUI + Torch + Python installer by Inteliweb AI. https://github.com/Comfy-Org",
  icon: "icon.jpeg",

  menu: async (kernel, info) => {
    const installed = info.exists("app/env") && info.exists("app/main.py");
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
    };

    const downloadingScripts = [
      "download-flux-schnell-fp8.json",
      "download-flux-schnell.json",
      "download-sdxl.json",
      "download-turbo.json",
      "download-sd15.json",
      "mochi-lite.json",
      "mochi-high.json",
      "ltx.json",
      "fluxtools/fill.json",
      "fluxtools/redux_schnell.json",
      "fluxtools/redux_dev.json",
      "fluxtools/depth.json",
      "fluxtools/canny.json",
      "hunyuan/install.js",
      "wan/text1.3b.js",
      "wan/text14b.js",
      "wan/image480p.js",
      "wan/image720p.js",
      "ltx/install.js",
      "download.json",
    ];

    const activeDownload = downloadingScripts.find((script) =>
      info.running(script),
    );

    if (running.install) {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Installing",
          href: "install.js",
        },
      ];
    }

    if (!installed) {
      return [
        {
          default: true,
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        },
      ];
    }

    if (running.start) {
      const local = info.local("start.js");

      if (local && local.url) {
        return [
          {
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open ComfyUI",
            href: local.url,
          },
          {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          },
        ];
      }

      return [
        {
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Terminal",
          href: "start.js",
        },
      ];
    }

    if (activeDownload) {
      return [
        {
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Downloading",
          href: activeDownload,
        },
      ];
    }

    if (running.update) {
      return [
        {
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js",
        },
      ];
    }

    if (running.reset) {
      return [
        {
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.js",
        },
      ];
    }

    return [
      {
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js",
      },
      {
        icon: "fa-solid fa-download",
        text: "Download Models",
        menu: [
          {
            text: "Download by URL",
            icon: "fa-solid fa-download",
            href: "download.html?raw=true",
          },
        ],
      },
      {
        icon: "fa-solid fa-plug",
        text: "Update",
        href: "update.js",
      },
      {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      },
      {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
        confirm: "Are you sure you wish to reset the app?",
      },
    ];
  },
};
