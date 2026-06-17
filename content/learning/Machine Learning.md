---
title: Machine Learning
tags:
  - garden
  - learning
  - ml
---

# Machine Learning

## Used In

- [[projects/Traffic Demand Prediction Hackathon]]
- [[projects/Auralysis]]

## Concepts

- regression
- cross-validation
- feature engineering
- target encoding
- model leakage
- LightGBM
- XGBoost
- TensorFlow/Keras
- transfer learning

## Lessons From Traffic Demand Prediction

- Baselines matter.
- Target transformations can hurt.
- Optuna tuning can massively improve tree models.
- Ensembling weak models can reduce score.
- High-cardinality categorical features need careful handling.

## Notes To Write

- Fold-safe target encoding.
- Why leakage ruins validation.
- How to read feature importances.
- Why a simple LightGBM can beat a rushed ensemble.
