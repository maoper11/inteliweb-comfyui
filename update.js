module.exports = async (kernel, info) => {
  const run = [
    // 1) Update the Pinokio installer repository
    {
      method: "shell.run",
      params: {
        message: "git pull --ff-only",
      },
    },

    // 2) Update ComfyUI only when tracking the automatic/latest branch
    {
      when:
        "{{['', 'auto', 'latest'].includes(String(env.COMFY_VER || 'auto').trim().toLowerCase())}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull --ff-only",
      },
    },

    // 3) Update ComfyUI-Manager
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-Manager",
        message: "git pull --ff-only",
      },
    },

    // 4) Refresh Python requirements and the selected comfy-cli version
    {
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        env: {
          COMFY_NO_TELEMETRY: "1",
        },
        message: [
          "uv pip install -r requirements.txt",
          "uv pip install -r custom_nodes/ComfyUI-Manager/requirements.txt",
          "python -m pip install {{ (() => { const ver = String(env.COMFY_CLI_VER || '1.12.0').trim().toLowerCase(); return ['', 'auto', 'latest'].includes(ver) ? '--upgrade comfy-cli' : '--upgrade comfy-cli==' + ver; })() }}",
          "python -m comfy_cli --version",
        ],
      },
    },
  ];

  return {
    run,
    requires: { bundle: "ai" },
  };
};
