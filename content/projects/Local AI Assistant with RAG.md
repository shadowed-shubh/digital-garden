---
title: Local AI Assistant with RAG
tags:
  - garden
  - project
  - core
  - rust
  - ai
  - rag
---

# Local AI Assistant with RAG

## Status

Core project, needs polishing and verification against claims.

## Summary

A local retrieval-augmented generation assistant built in Rust, using document ingestion, chunking, embeddings, vector similarity search, and local LLM generation through Ollama.

## Why It Matters

This project combines local AI with backend/systems concerns:

- async Rust
- file I/O
- local storage
- embedding generation
- vector search
- LLM orchestration
- privacy-first local tooling

## Stack

- Rust 2024
- Tokio
- Reqwest
- Serde / JSON
- Bincode
- Ollama
- local embedding model

## Next Tasks

- Verify every implementation claim against the repo.
- Add architecture documentation.
- Add a reproducible demo with sample documents.
- Add benchmarks for ingestion, retrieval latency, and memory/storage size.

## Related Learning

- [[learning/Rust]]
- [[learning/Local AI and RAG]]
- [[learning/Backend Engineering]]
