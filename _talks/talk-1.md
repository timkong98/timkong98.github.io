---
title: "A Comparison of Minimum Action Methods for Computing Noise-induced Transitions of the Lorenz System"
collection: talks
type: "Poster"
permalink: /talks/talk-1
venue: "SIAM Conference on Applications of Dynamical Systems (DS21)"
date: 2021-05
location: "Online"
---

Tianyu Kong, Justin M. Finkel, Mary Silber

We consider noise-induced transitions between two stable fixed points of the Lorenz equations. We compare two different numerical implementations of the minimum action method (MAM), which minimizes the Freidlin-Wentzell functional to compute the most probable transition path in the weak noise limit. Several challenges arise when solving this optimization problem — the discretized trajectory clusters around fixed points, the energy landscape is relatively flat around solutions of the system, and the solution of the optimization problem may be highly dependent on the initial guess of the transition path. We propose recasting the optimizing problem in momentum coordinates, which represent the strength of noise perturbations by way of a Legendre transform. This greatly simplifies the objective function while complicating the endpoint constraint, which is enforced with a penalty function and requires an adjoint method to differentiate. We use sequential quadratic programming to enforce the convergence. Compared to the traditional MAM, the transformed method doesn’t require a good initial guess or predetermined time horizon, and converges with fewer iterations. We explore adapting this method for transitions between other types of stable invariant sets, such as limit cycles.

[Poster](https://timkong98.github.io/files/Poster.pdf)
