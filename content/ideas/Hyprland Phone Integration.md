---
title: Hyprland Phone Integration
tags:
  - garden
  - idea
  - rust
  - linux
  - hyprland
---

# Hyprland Phone Integration

## Status

Prospective project idea.

## Concept

Build a Hyprland-native phone integration layer similar to KDE Connect, focused on Linux desktop workflows such as notifications, clipboard sync, battery status, file transfer, and device actions.

## Strongest Direction

Do not build a custom Android app first. Instead, speak or reuse the KDE Connect protocol so the existing Android app can be used, then build a Hyprland/Wayland-native desktop integration layer.

## Possible Architecture

```text
KDE Connect Android app
  <-> KDE Connect protocol over LAN/TLS
Rust daemon
  <-> D-Bus / Wayland tools / Hyprland IPC / Waybar / rofi
```

## v1 Feature Candidates

- connected-device status
- battery status in Waybar
- clipboard sync
- notification sync
- ring device action
- send file action

## Why It Fits

This idea fits Linux, Rust, async networking, protocol interoperability, desktop IPC, and practical tooling.

## Open Questions

- Fresh project or adaptation/fork of an existing KDE Connect-compatible implementation?
- Which features are mandatory for v1?
- How much protocol implementation is needed before a useful frontend can exist?
