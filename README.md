# 🚀 Inteliweb ComfyUI Installer (Pinokio)

One-click ComfyUI installer with automatic GPU detection and PyTorch setup
for NVIDIA, AMD and macOS. Designed for fast, reproducible AI workflows with
optimized defaults by Inteliweb AI.

---

## 🖼️ Configuration Interface

![Installer configuration screen](assets/config.png)

---

## ✨ Features

✅ Automatic GPU detection (RTX 20/30/40/50, AMD, Apple Silicon)  
✅ Smart PyTorch & CUDA selection (cu128 / cu130 / DirectML / ROCm / CPU)  
✅ Works on Windows, Linux and macOS  
✅ Clean, reproducible environment  
✅ ComfyUI-Manager restart support through comfy-cli  
✅ Beginner friendly — advanced ready

---

## ⚡ Quick Start

Leave everything at its default value:

```text
COMFY_VER=latest
PYTHON_VER=3.12
TORCH_VARIANT=auto
COMFY_CLI_VER=1.12.0
COMFY_NO_TELEMETRY=1
```

The installer automatically selects the configured PyTorch build, creates an
isolated environment, installs ComfyUI-Manager and installs the selected
`comfy-cli` supervisor version.

Only these five user-facing options are exposed. Pinokio sharing, autolaunch
and cache variables are left to Pinokio's own defaults instead of being shown
in the installer configuration screen.

---

## 🔁 ComfyUI-Manager Restart Support

ComfyUI is launched through `comfy-cli` instead of running `main.py` directly.
This allows ComfyUI-Manager to restart ComfyUI while Pinokio keeps the
supervisor alive.

Supported scenarios include:

- Manual restart from ComfyUI-Manager.
- Restart after installing a custom node.
- Automatic restart after installing Python dependencies during prestartup.
- Multiple consecutive restarts in the same Pinokio session.
- Stop and subsequent Start from Pinokio without leaving port 8188 occupied.

The normal launch command is equivalent to:

```bash
python -m comfy_cli --here --skip-prompt launch -- --listen 127.0.0.1 --port 8188
```

Windows AMD adds `--directml` to the ComfyUI arguments.

### Known cosmetic warning

A manual restart may print messages similar to:

```text
Task exception was never retrieved
SystemExit: 0
ValueError: I/O operation on closed file
```

This originates in the ComfyUI-Manager HTTP reboot handler. The restart is
successful when ComfyUI subsequently prints `Starting server` and the GUI URL
again. The installer does not patch or suppress ComfyUI-Manager output.

### Diagnostics

Run these commands from the activated `app/env` environment and the `app`
folder:

```bash
python -m comfy_cli --version
python -m comfy_cli --here --skip-prompt which
```

`COMFY_NO_TELEMETRY=1` explicitly disables comfy-cli telemetry. Leaving it
empty stops setting that explicit opt-out variable, while `--skip-prompt`
still prevents automated Pinokio launches from waiting for interactive input.

---

## 🧠 Torch Variant Options

### Recommended

```text
TORCH_VARIANT=auto
```

### NVIDIA GPUs

```text
2.9.1-cu128   RTX 20/30/40 fallback
2.10.0-cu130  Stable default and RTX 50 recommendation
latest-cu130  Testing newer cu130 builds
```

### AMD GPUs

```text
directml       Windows
2.7.0-rocm6.3  Linux ROCm
```

### CPU

```text
cpu
```

### macOS

Leave `TORCH_VARIANT=auto`:

- Apple Silicon uses MPS.
- Intel Mac uses CPU.

---

## 🖥️ Supported Platforms

- Windows — NVIDIA / AMD / CPU
- Linux — NVIDIA / AMD (ROCm optional) / CPU
- macOS — Apple Silicon (MPS) / CPU

---

## 🔄 Update and Reset

**Update** refreshes the installer, ComfyUI when `COMFY_VER=latest`,
ComfyUI-Manager, their Python requirements and the selected `comfy-cli`
version.

**Reset** removes the local `app` folder. A new installation can then be
created from scratch with the Install button.

---

## 📺 Learn More

https://www.youtube.com/@InteliwebAI

---

Built with ❤️ by Inteliweb AI
