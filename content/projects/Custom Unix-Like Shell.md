---
title: Custom Unix-Like Shell
tags:
  - garden
  - project
  - active
  - rust
  - systems
---

# Custom Unix-Like Shell

## Status

Active core project.

## Summary

A Rust shell project focused on systems fundamentals: parsing commands, executing processes, managing pipes and redirection, and understanding how Unix-like shells coordinate child processes.

## Why It Matters

This project is one of the clearest ways to learn:

- process creation and execution
- file descriptors
- pipes and IPC
- shell parsing
- exit status handling
- background execution
- Rust error handling and architecture

## Technical Surface

- Rust 2024.
- Tokenizer and parser.
- Builtin command handling.
- External command execution.
- Pipes.
- I/O redirection.
- Background jobs.
- PATH resolution.
- Child process lifecycle management.

## Next Writing/Build Tasks

- Document parser architecture.
- Document executor architecture.
- Add examples for builtins, external commands, pipes, redirection, and background jobs.
- Add transcript demos.
- Verify the implementation matches every public claim.

## Learning Notes To Add

- [[learning/Rust|Rust]]
- [[learning/Shell Internals|Shell Internals]]
- [[learning/Linux Systems|Linux Systems]]
