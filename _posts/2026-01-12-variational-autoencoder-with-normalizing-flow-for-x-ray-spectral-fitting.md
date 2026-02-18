---
layout: post
title: Variational Autoencoder with Normalizing Flow for X-Ray Spectral Fitting
authors: [f_redmen, e_tregidga, j_steiner, c_garraffo]
---

# Abstract

Black hole X-ray binaries (BHBs) can be studied with spectral fitting to provide physical constraints on accretion in extreme gravitational environments.
Traditional methods of spectral fitting such as Markov Chain Monte Carlo (MCMC) face limitations due to computational times.
We introduce a probabilistic model, utilizing a variational autoencoder with a normalizing flow, trained to adopt a physical latent space.
This neural network produces predictions for spectral-model parameters as well as their full probability distributions.
Our implementations result in a significant improvement in spectral reconstructions over a previous deterministic model while performing three orders of magnitude faster than traditional methods.

**arXiv:** [2601.07440](https://arxiv.org/abs/2601.07440)\\
**Code:** [Fast Spectra Prediction Network Variational](https://github.com/fi-redmen/fspnet-var.git)
