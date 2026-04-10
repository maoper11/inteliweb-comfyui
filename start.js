module.exports = {
  requires: { bundle: "ai" },
  daemon: true,
  run: [
    // =========================
    // [0] Start ComfyUI
    // =========================
    {
      id: "start_comfyui",
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          PYTORCH_ENABLE_MPS_FALLBACK: "1",
          TOKENIZERS_PARALLELISM: "false",
        },
        path: "app",
        message: [
          "{{platform === 'win32' && gpu === 'amd' ? 'python main.py --directml' : 'python main.py'}}",
        ],
        on: [
          // ✅ Normal startup → capture URL (group 1 is URL)
          {
            event:
              "/To see the GUI go to:\\s*(https?:\\/\\/[a-zA-Z0-9._-]+:\\d+)/i",
            done: true,
          },

          // ✅ Fallback if wording changes (group 1 is URL)
          {
            event: "/starting server.*?(https?:\\/\\/[a-zA-Z0-9._-]+:\\d+)/i",
            done: true,
          },

          // 🔁 Manager restart request → kill ComfyUI cleanly
          // IMPORTANT: no capturing groups here
          {
            event: "/\\[ComfyUI-Manager\\].*Restarting to reapply dependency/i",
            kill: true,
          },

          { event: "/errno/i", break: false },
          { event: "/error:/i", break: false },
        ],
      },
    },

    // =========================
    // [1] Route based on *real* URL
    // =========================
    {
      method: "jump",
      params: {
        id: "{{(input.event && input.event[1] && /^https?:\\/\\//.test(input.event[1])) ? 'set_url' : 'manager_restart'}}",
        params: {
          url: "{{(input.event && input.event[1] && /^https?:\\/\\//.test(input.event[1])) ? input.event[1] : ''}}",
        },
      },
    },

    // =========================
    // [2] Manager restart flow
    // =========================
    {
      id: "manager_restart",
      method: "log",
      params: {
        type: "raw",
        data: "Restart Required — ComfyUI-Manager installed new dependencies. Restarting ComfyUI once more to apply them.",
      },
    },
    {
      method: "jump",
      params: { id: "start_comfyui" },
    },

    // =========================
    // [3] Normal startup path
    // =========================
    {
      id: "set_url",
      method: "local.set",
      params: {
        url: "http://localhost:8188",
      },
    },
  ],
};
