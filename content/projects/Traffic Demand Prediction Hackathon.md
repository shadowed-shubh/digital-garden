---
title: Traffic Demand Prediction Hackathon
tags:
  - garden
  - project
  - hackathon
  - ml
---

# Traffic Demand Prediction Hackathon

## Status

Active or recently active hackathon project.

## Problem

Predict traffic `demand` for a location and timestamp using geohash, time, road type, lanes, large-vehicle permission, landmarks, temperature, and weather.

## Submission

The output is a CSV with:

- `Index`
- `demand`

The test set has 41,778 rows, and test `Index` order must be preserved.

## Best Known Result

| Version | Method | Score |
| --- | --- | --- |
| v1 | Default LightGBM baseline | OOF R2 52.543354 |
| v2 | `log1p` target | OOF R2 49.098188 |
| v3 | Optuna-tuned LightGBM + temp/location features | OOF R2 73.882431 |
| v4 | LGB + XGB + CatBoost ensemble | OOF R2 57.639065 |

Best known submission: `submissions/sub_v3.csv`.

## Lessons

- LightGBM was the strongest path so far.
- `log1p` target transform hurt performance.
- Temperature was not just a time proxy; it acted like spatial/environmental signal.
- Ensembling weak models can make performance worse.
- Target encoding must be fold-safe to avoid leakage.

## Next Tasks

- Reproduce the tuned LightGBM score in any ensemble script before adding more models.
- Tune XGBoost independently.
- Only ensemble models that are individually strong.

## Related Learning

- [[learning/Machine Learning]]
- [[learning/Agent Workflow]]
