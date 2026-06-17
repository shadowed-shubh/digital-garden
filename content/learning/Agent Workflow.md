---
title: Agent Workflow
tags:
  - garden
  - learning
  - ai-agents
---

# Agent Workflow

## Current Lesson

AI agents are useful when their roles are separated. Asking every agent to do the same thing wastes rate limits and creates conflicting context.

## Current Roles

- Codex: code edits, terminal execution, project implementation.
- Gemini: large-context analysis, EDA interpretation, feature-importance review.
- Claude-style planning: architecture, reasoning, debugging decisions, next-step selection.
- OpenCode: fallback if Codex is unavailable.

## Shared Memory

Every serious project should have a `notes.md` that tracks:

- current score/state
- files created
- decisions made
- next task
- blockers
- session log

## Lesson From Traffic Demand Prediction

The useful loop was:

```text
Gemini analyzes data
  -> Codex implements and runs
  -> results return to reasoning/planning
  -> notes.md updates
```

## Notes To Write

- How to coordinate multiple AI agents on one project.
- Why `notes.md` matters.
- How to avoid duplicate agent work.
