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
          "{{(() => { const variant = String(env.TORCH_VARIANT || 'auto').trim().toLowerCase(); const rawPort = String(env.COMFY_PORT || '8188').trim(); const parsedPort = Number(rawPort); const port = /^\\d+$/.test(rawPort) && parsedPort >= 1 && parsedPort <= 65535 ? rawPort : '8188'; const rawDevice = String(env.COMFY_GPU_DEVICE || 'auto').trim().toLowerCase(); const device = /^\\d+$/.test(rawDevice) ? rawDevice : 'auto'; const args = []; const forceCpu = variant === 'cpu' || (platform === 'linux' && gpu === 'amd' && ['', 'auto'].includes(variant)) || (platform === 'darwin' && arch === 'x64'); const useDirectML = platform === 'win32' && gpu === 'amd' && ['', 'auto', 'directml'].includes(variant); if (forceCpu) { args.push('--cpu'); } else if (useDirectML) { args.push('--directml'); if (device !== 'auto') args.push(device); } else if (platform !== 'darwin' && device !== 'auto' && (gpu === 'nvidia' || (platform === 'linux' && gpu === 'amd' && variant === '2.7.0-rocm6.3'))) { args.push('--cuda-device', device); } args.push('--listen', '127.0.0.1', '--port', port); return 'python -m comfy_cli --here --skip-prompt launch -- ' + args.join(' '); })()}}",
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
        url: "{{(input.event && input.event[1] && /^https?:\\/\\//.test(input.event[1])) ? input.event[1].replace('127.0.0.1', 'localhost') : 'http://localhost:' + ((() => { const rawPort = String(env.COMFY_PORT || '8188').trim(); const parsedPort = Number(rawPort); return /^\\d+$/.test(rawPort) && parsedPort >= 1 && parsedPort <= 65535 ? rawPort : '8188'; })())}}",
      },
    },
  ],
};
