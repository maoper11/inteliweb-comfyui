module.exports = async (kernel, info) => {
  const run = [
    // 1) Clone ComfyUI into ./app
    {
      method: "shell.run",
      params: {
        message:
          "git clone --branch {{ (() => { let ver = String(env.COMFY_VER || 'latest').trim().toLowerCase(); if (ver === 'latest') return 'master'; if (/^v/.test(ver)) return ver; if (/^\\d/.test(ver)) return 'v' + ver; return ver; })() }} --depth 1 https://github.com/comfyanonymous/ComfyUI app",
      },
    },

    // 2) ComfyUI-Manager
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/ltdrdata/ComfyUI-Manager",
        path: "app/custom_nodes",
      },
    },

    // 3) Create the virtual environment
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "uv python install {{env.PYTHON_VER || '3.12'}}",
          "{{ platform === 'win32' ? 'if exist env rmdir /s /q env' : 'rm -rf env' }}",
          "uv venv --python {{env.PYTHON_VER || '3.12'}} env",
        ],
      },
    },

    // 4) Install ComfyUI and Manager requirements
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -U pip setuptools wheel",
          "uv pip install -r requirements.txt",
          "uv pip install -r custom_nodes/ComfyUI-Manager/requirements.txt",
          "uv pip install -U bitsandbytes",
          "uv pip install -U requests",
        ],
      },
    },

    // 5) Install Torch variant
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
        },
      },
    },

    // 6) Install comfy-cli in app/env
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        env: {
          COMFY_NO_TELEMETRY: "1",
        },
        message: [
          "python -m pip install comfy-cli=={{env.COMFY_CLI_VER || '1.12.0'}}",
          "python -m comfy_cli --version",
        ],
      },
    },

    // 7) Link model folders to the Pinokio drive
    {
      method: "fs.link",
      params: {
        drive: {
          checkpoints: "app/models/checkpoints",
          clip: "app/models/clip",
          clip_vision: "app/models/clip_vision",
          configs: "app/models/configs",
          controlnet: "app/models/controlnet",
          embeddings: "app/models/embeddings",
          loras: "app/models/loras",
          upscale_models: "app/models/upscale_models",
          vae: "app/models/vae",
          vae_approx: "app/models/VAE-approx",
          diffusers: "app/models/diffusers",
          unet: "app/models/unet",
          hypernetworks: "app/models/hypernetworks",
          gligen: "app/models/gligen",
          style_models: "app/models/style_models",
          photomaker: "app/models/photomaker",
          diffusion_models: "app/models/diffusion_models",
          text_encoders: "app/models/text_encoders",
          latent_upscale_models: "app/models/latent_upscale_models",
          geometry_estimation: "app/models/geometry_estimation",
          frame_interpolation: "app/models/frame_interpolation",
          detection: "app/models/detection",
          audio_encoders: "app/models/audio_encoders",
          background_removal: "app/models/background_removal",
        },
        peers: [
          "https://github.com/maoper11/inteliweb-comfyui.git",
          "https://github.com/pinokiofactory/comfy.git",
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git",
        ],
      },
    },

    // 8) Link output folder
    {
      method: "fs.link",
      params: {
        drive: { output: "app/output" },
        peers: [
          "https://github.com/maoper11/inteliweb-comfyui.git",
          "https://github.com/pinokiofactory/comfy.git",
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git",
        ],
      },
    },
  ];

  return {
    run,
    requires: { bundle: "ai" },
  };
};
