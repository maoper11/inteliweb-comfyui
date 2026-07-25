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
✅ Configurable port and single-GPU selection  
✅ Multiple independent ComfyUI installations on one computer  
✅ Works on Windows, Linux and macOS  
✅ Clean, reproducible environment  
✅ ComfyUI-Manager restart support through comfy-cli  
✅ Beginner friendly — advanced ready

---

## ⚡ Quick Start

Leave everything at its default value:

```text
COMFY_VER=auto
PYTHON_VER=3.12
TORCH_VARIANT=auto
COMFY_PORT=8188
COMFY_GPU_DEVICE=auto
COMFY_CLI_VER=1.12.0
```

The installer automatically selects the configured PyTorch build, creates an
isolated environment, installs ComfyUI-Manager and installs the selected
`comfy-cli` supervisor version.

These six user-facing options are exposed. Pinokio sharing, autolaunch, cache
and telemetry settings are managed internally instead of being shown in the
installer configuration screen.

`COMFY_VER=auto` installs and tracks the newest available ComfyUI version.
`latest` remains accepted as a compatibility alias. A fixed tag can be used
when an older workflow requires a specific ComfyUI release.

`COMFY_CLI_VER=1.12.0` remains the validated default. Setting it to `auto`
installs the newest comfy-cli release available from PyPI.

---

## 🔌 Port and GPU Selection

Keep the default port for a normal single installation:

```text
COMFY_PORT=8188
```

Change `COMFY_PORT` only when multiple ComfyUI installations must run at the
same time. Every simultaneous installation needs a different port.

`COMFY_GPU_DEVICE` accepts only one device:

```text
COMFY_GPU_DEVICE=auto  Default GPU
COMFY_GPU_DEVICE=0     First GPU
COMFY_GPU_DEVICE=1     Second GPU
```

Values such as `0,1` are intentionally unsupported. One installation can use
only one GPU. To use two GPUs simultaneously, create two separate Pinokio
installations and assign one GPU to each.

### Two installations on the same GPU

```text
Installation 1: COMFY_PORT=8188, COMFY_GPU_DEVICE=0
Installation 2: COMFY_PORT=8189, COMFY_GPU_DEVICE=0
```

### Two installations on different GPUs

```text
Installation 1: COMFY_PORT=8188, COMFY_GPU_DEVICE=0
Installation 2: COMFY_PORT=8189, COMFY_GPU_DEVICE=1
```

### CPU mode

```text
TORCH_VARIANT=cpu
```

CPU mode adds `--cpu` and ignores `COMFY_GPU_DEVICE`. Linux AMD with
`TORCH_VARIANT=auto` and Intel Mac also use CPU mode. On Apple Silicon,
`COMFY_GPU_DEVICE` is ignored and MPS is selected automatically.

Invalid ports fall back to `8188`. Invalid GPU device values fall back to
`auto`.

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
- Stop and subsequent Start without leaving the configured port occupied.

The default launch is equivalent to:

```bash
python -m comfy_cli --here --skip-prompt launch -- --listen 127.0.0.1 --port 8188
```

A selected NVIDIA or ROCm GPU adds `--cuda-device N`. Windows AMD DirectML adds
`--directml` and optionally its device number. CPU mode adds `--cpu`.

`COMFY_NO_TELEMETRY=1` is set internally for Install, Update and Start, so
comfy-cli telemetry remains disabled without exposing another option in the
configuration form.

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

The installer and updater only print the installed comfy-cli version. The
workspace check is kept as an optional manual diagnostic command.

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

**Update** refreshes the installer, ComfyUI when `COMFY_VER=auto` or `latest`,
ComfyUI-Manager, their Python requirements and the selected `comfy-cli`
version. When `COMFY_CLI_VER=auto`, Update installs the newest available
comfy-cli release.

**Reset** removes the local `app` folder. A new installation can then be
created from scratch with the Install button.

---

## 📺 Learn More

https://www.youtube.com/@InteliwebAI

---

Built with ❤️ by Inteliweb AI
