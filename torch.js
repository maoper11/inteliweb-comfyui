// Script 1 revisado — estable por defecto

module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip uninstall -y torch torchvision torchaudio triton triton-windows torch-directml xformers || true",
          "python -m pip install -U pip",
        ],
      },
    },

    // WINDOWS NVIDIA AUTO (stable default: torch 2.10.0-cu130)
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && (['','auto'].includes(String(env.TORCH_VARIANT||'auto').toLowerCase()))}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          'python -m pip install "triton-windows>=3.6,<3.7"',
        ],
      },
    },

    // WINDOWS NVIDIA 2.10.0-cu130
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.10.0-cu130'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          'python -m pip install "triton-windows>=3.6,<3.7"',
        ],
      },
    },

    // WINDOWS NVIDIA 2.8.0-cu128
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.8.0-cu128'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          'python -m pip install "triton-windows>=3.4,<3.5"',
        ],
      },
    },

    // WINDOWS NVIDIA 2.9.1-cu128
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.9.1-cu128'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.9.1 torchvision==0.24.1 torchaudio==2.9.1 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          'python -m pip install "triton-windows>=3.5,<3.6"',
        ],
      },
    },

    // WINDOWS NVIDIA latest-cu130
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='latest-cu130'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          "python -m pip install -U triton-windows",
        ],
      },
    },

    // LINUX NVIDIA AUTO (stable default: torch 2.10.0-cu130)
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && (['','auto'].includes(String(env.TORCH_VARIANT||'auto').toLowerCase()))}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          'python -m pip install "triton>=3.6,<3.7"',
        ],
      },
    },

    // LINUX NVIDIA 2.10.0-cu130
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.10.0-cu130'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          'python -m pip install "triton>=3.6,<3.7"',
        ],
      },
    },

    // LINUX NVIDIA 2.8.0-cu128
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.8.0-cu128'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.8.0 torchvision==0.23.0 torchaudio==2.8.0 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          'python -m pip install "triton>=3.4,<3.5"',
        ],
      },
    },

    // LINUX NVIDIA 2.9.1-cu128
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.9.1-cu128'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.9.1 torchvision==0.24.1 torchaudio==2.9.1 --index-url https://download.pytorch.org/whl/cu128 --force-reinstall --no-deps",
          'python -m pip install "triton>=3.5,<3.6"',
        ],
      },
    },

    // LINUX NVIDIA latest-cu130
    {
      when: "{{platform === 'linux' && gpu === 'nvidia' && String(env.TORCH_VARIANT||'').toLowerCase()==='latest-cu130'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          "python -m pip install triton",
        ],
      },
    },

    // macOS ARM64
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --force-reinstall --no-deps",
        ],
      },
    },

    // macOS x64
    {
      when: "{{platform === 'darwin' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps",
        ],
      },
    },

    // WINDOWS AMD (DirectML)
    {
      when: "{{platform === 'win32' && gpu === 'amd' && (['','auto','directml'].includes(String(env.TORCH_VARIANT||'auto').toLowerCase()))}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install numpy==1.26.4 --force-reinstall",
          "python -m pip install torch-directml torch torchvision torchaudio --force-reinstall",
        ],
      },
    },

    // LINUX AMD AUTO => CPU
    {
      when: "{{platform === 'linux' && gpu === 'amd' && (['','auto'].includes(String(env.TORCH_VARIANT||'auto').toLowerCase()))}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps",
        ],
      },
    },

    // LINUX AMD ROCm
    {
      when: "{{platform === 'linux' && gpu === 'amd' && String(env.TORCH_VARIANT||'').toLowerCase()==='2.7.0-rocm6.3'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch==2.7.0 torchvision==0.22.0 torchaudio==2.7.0 --index-url https://download.pytorch.org/whl/rocm6.3 --force-reinstall --no-deps",
        ],
      },
    },

    // CPU fallback universal
    {
      when: "{{String(env.TORCH_VARIANT||'').toLowerCase()==='cpu'}}",
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps",
        ],
      },
    },

    // SANITY CHECK
    {
      method: "shell.run",
      params: {
        venv: "{{args && args.venv ? args.venv : null}}",
        path: "{{args && args.path ? args.path : '.'}}",
        message: [
          "python -c \"import torch; print('torch', torch.__version__); print('cuda_available', torch.cuda.is_available()); print('cuda_version', torch.version.cuda); print('mps_available', hasattr(torch.backends, 'mps') and torch.backends.mps.is_available()); print('hip_version', getattr(torch.version, 'hip', None))\"",
        ],
      },
    },
  ],
};
