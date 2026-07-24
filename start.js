module.exports = {
  requires: { bundle: "ai" },
  daemon: true,

  run: [
    {
      id: "start_comfyui",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: "1",
          TOKENIZERS_PARALLELISM: "false",
          COMFY_NO_TELEMETRY: "1",
        },
        message: [
          "{{platform === 'win32' && gpu === 'amd' ? 'python -m comfy_cli --here --skip-prompt launch -- --directml --listen 127.0.0.1 --port 8188' : 'python -m comfy_cli --here --skip-prompt launch -- --listen 127.0.0.1 --port 8188'}}",
        ],
        on: [
          {
            event:
              "/To see the GUI go to:\\s*(https?:\\/\\/[a-zA-Z0-9._-]+:\\d+)/i",
            done: true,
          },
          { event: "/errno/i", break: false },
          { event: "/error:/i", break: false },
        ],
      },
    },

    {
      method: "local.set",
      params: {
        url: "{{(input.event && input.event[1] && /^https?:\\/\\//.test(input.event[1])) ? input.event[1].replace('127.0.0.1', 'localhost') : 'http://localhost:8188'}}",
      },
    },
  ],
};
