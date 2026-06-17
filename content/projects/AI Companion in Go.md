---
title: AI Companion in Go
tags:
  - garden
  - project
  - active
  - go
  - ai
---

# AI Companion in Go

## Status

Active idea/project. This is the main project for learning Go.

## What I Am Building

A local AI companion, described informally as an "AI girlfriend", built as a real backend/systems learning project rather than a toy chatbot.

The serious engineering angle is:

- learn Go through a project with state, APIs, memory, and long-running behavior
- experiment with local LLMs and persona design
- build a memory layer that can retrieve past context
- keep the system privacy-first and local-first where possible

## Possible Architecture

```text
client / terminal / web UI
  -> Go API/service
  -> conversation manager
  -> memory store
  -> retrieval layer
  -> local or remote LLM adapter
```

## Learning Goals

- Go syntax and idioms.
- HTTP servers and routing.
- JSON APIs.
- Concurrency with goroutines and channels.
- Persistent storage.
- Local LLM integration.
- Conversation memory design.

## Public Writing Ideas

- Why I chose Go for this project.
- Designing memory for an AI companion.
- Local-first companion AI and privacy.
- What makes a chatbot feel stateful.
- Building a Go service from zero.

## Open Questions

- What is the smallest useful v1?
- Should the first interface be CLI, TUI, or web?
- Should memory start with SQLite, files, or embeddings?
- Which local model/runtime should be used first?
