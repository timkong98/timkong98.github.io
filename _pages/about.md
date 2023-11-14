---
permalink: /
title: "About"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a 3rd year applied mathematics Ph.D. student at the University of Minnesota. My advisor is Prof.[Mitchell Luskin](https://www-users.cse.umn.edu/~luskin/). I earned an Honors B.S. in applied mathematics and B.A. in physics at University of Chicago in 2021. 

My research interest lies in mathematical modeling and numerical analysis of electronic properties of stacked 2D, especially twisted bilayer graphene (TBG) and other moir\'e materials. They have been the subject of theoretical and experimental interest in physics in recent years, as they provide important experimental platforms for realizing exotic quantum phenomena such as superconductivity. I aim to develop mathematical foundations and computational methods for understanding recent discoveries, and identifying new materials with potential to realize new fundamental quantum physics. These moir\'e materials can have a wide range of applications like room-temperature superconductors and scalable quantum computers.  

The starting point of my research is the atomistic tight-binding model of twisted bilayer graphene. The single electron wave functions are evaluated on the lattice sites, and are isomorphic to $\ell^2(\mathbb{Z}^2)$ sequences in $\mathbb C^2$ (\cref{fig:graphene_lattice}). The quantum dynamics of electrons is governed by the Schr\"odinger equation $i \partial_t \psi = H\psi$, where the Hamiltonian $H$ records the interactions between lattice sites, and the squared modulus of $\psi$ represents the electron probability density.
The accurate numerical computation of time evolved solutions is made challenging by the fact that the model is infinite dimensional and aperiodic at generic twist angles.

Bistritzer and MacDonald observed that the single-particle electronic properties of twisted bilayer graphene with a small twist angle can often be captured by effective continuum models \cite{Bistritzer_MacDonald_2011}.
The Bistritzer-MacDonald (BM) Hamiltonian is a system of PDEs with periodic coefficients over the moir\'e lattice, the periodicity allows its solutions to be expressed using Bloch band theory. This effective model correctly predicted near-zero electron dispersion when the twist angle is near the magic angle $\theta \approx 1.05 ^\circ$. In [my first paper](https://timkong98.github.io/publication/paper-2), I considered the tight-binding model in TBG with spectrally concentrated wave-packet initial data. I estimated the difference between the wave-packet time-evolved according to the tight-binding model $\psi_{\text{TB}}(t)$, and the same wave-packet time-evolved according to the BM model $\psi_{\text{BM}}(t)$. Let $\epsilon$ be the spectral width of the wave-packet, $\theta$ the twist angle, and $\mathfrak h$ the ratio between intralayer and interlayer hopping strength, the main theorem is

$$\theta \lesssim \epsilon \text{ and } \mathfrak h \sim \epsilon \implies \| \psi_{\text{TB}}(t) - \psi_{\text{BM}}(t) \|_{\ell^2} \leq C \epsilon^{2 - c} t.$$

This regime is indeed realized in experiments. The magic angle corresponds to $\theta \approx 0.017$ radians, while the value of $\mathfrak h$ is estimated as $\approx 0.042$, so $\epsilon$ can take values in a non-trivial range at the magic angle.

In [my second paper](https://timkong98.github.io/publication/paper-3), I computed the time-evolved wave-packet solutions of the tight-binding model of TBG with rigorous error control. The main idea of the estimate is a bound on the speed of propagation $v_{\max}$ for solutions of the tight-binding Schr\"odinger equation. I considered a finite dimensional truncated model by restricting interactions to only between sites inside a ball of radius $R$. For wave-packet initial data concentrated in ball with smaller radius $r$, the difference between time-evolved solution of the finite dimensional model $\psi_{\text{TB}, R}$ and the infinite dimensional model $\psi_{\text{TB}}$ can be estimated *a priori* by 
$$ \|\psi_{\text{TB}}(t) - \psi_{\text{TB}, R}(t) \|_{\ell^2} \leq CR^{\frac{5}{2}}r^{\frac{1}{2}} e^{\kappa \left(t - v_{\max}(R - r)\right)},
$$

For a sufficiently large truncation radius with negligible truncation error, I was able to numerically compute the approximation error between the BM model and tight-binding model.


