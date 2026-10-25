---
layout: post
title: "Improving Satellite Object Detection with Capsule NNs"
date_range: true
end_date: 2021-08-27
authors: [e_tregidga, thales]
categories: [Projects, Object Detection]
tags: [
  Internship,
  Machine Learning,
  Earth Observation,
  Satellite Imaging,
]
---

# Description

Designed YOLO-CapsNet, combining capsule neural networks (NNs) with You Only Look Once (YOLO), for improved real-time object detection in satellite and aerial imagery.
Capsule NNs build upon convolutional NNs to encode pose information in the weights, such as object orientation, to learn equivariance rather than invariance for improved performance in imagery where the objects pose can change.
YOLO is a real-time object detection neural network using convolutional NNs; therefore, we developed YOLO-CapsNet to take the advantages of real-time object detection from YOLO and the improved pose detection of capsule NNs, to get real-time object detection in satellite and aerial imaging.
