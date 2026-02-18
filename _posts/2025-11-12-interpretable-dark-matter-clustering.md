---
layout: post
title: "Measuring the Dark Matter Self-Interaction Cross-Section with Deep Compact Clustering for Robust Machine Learning Inference"
pin: true
math: true
authors:
  [
    e_tregidga,
    d_harvey,
    l_biggio,
    f_vecchi,
  ]
---

# Abstract

We have developed a machine learning algorithm capable of detecting ‘out-of-domain data’ for trustworthy cosmological inference.
By using data from two separate suites of cosmological simulations, we show that our algorithm is able to determine whether ‘observed’ data is consistent with its training domain, returning confidence estimates as well as accurate parameter estimations.
We applied our algorithm to 2D images of galaxy clusters from the BAHAMAS-SIDM and DARKSKIES simulations with the aim of measuring the self-interaction cross-section of dark matter.
Through deep compact clustering, we constructed an informative latent space where galaxy clusters were mapped to the latent space forming ‘latent clusters’ for each simulation, with the location of the latent cluster corresponding to the macroscopic parameters, such as the cross-section, $\sigma_{\rm DM}/m$.
We then passed through mock observations, where the location of the observed latent cluster informed us of which properties are shared with the training data.
If the observed latent cluster shares no similarities with latent clusters from the known simulations, we can conclude that our simulations do not represent the observations and discard any parameter estimations.
This thus provides us with a method of measuring measure machine learning confidence.
This method serves as a blueprint for transparent and robust inference that is in demand in scientific machine learning.

**Journal**: [Astronomy & Astrophysics](https://doi.org/10.1051/0004-6361/202556629)\\
**arXiv:** [2511.09660](https://arxiv.org/abs/2511.09660)\\
**Code:** [Bayesian DARKSKIES](https://github.com/EthanTreg/Bayesian-DARKSKIES)
