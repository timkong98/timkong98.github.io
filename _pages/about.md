---
permalink: /
title: "About"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a 4th year applied mathematics Ph.D. student at the University of Minnesota. I am co-advised by Prof. [Mitchell Luskin](https://www-users.cse.umn.edu/~luskin/) and Prof. [Alexander Watson](https://abwatson.math.umn.edu/). I earned an Honors B.S. in applied mathematics and B.A. in physics at University of Chicago in 2021. 


My research interest lies in the mathematical modeling and numerical analysis of the electronic properties of two-dimensional materials, especially twisted bilayer graphene (TBG). Graphene, a single layer of carbon atoms arranged in a hexagonal lattice, is renowned for its exceptional properties, such as mechanical strength and electrical conductivity. 
Twisted bilayer graphene, created by stacking two graphene sheets with a slight twist, has garnered tremendous interest recently. Bistritzer and MacDonald predicted the existence of correlated phases such as superconductivity at a "magic angle" of about $1.05^\circ$ that was experimentally confirmed in 2018}.  This work has transformed the study of strongly correlated electron physics and been recognized by the Wolf Prize in Physics in 2020.
The overarching goal of my work is to establish mathematical frameworks and computational methods for understanding these phenomena and identifying new materials with the potential to reveal novel quantum behaviors. These materials hold promise for a variety of applications, including room-temperature superconductors and scalable quantum computers.

The broader class of materials to which TBG belongs are known as moiré materials. These materials are formed by stacking layers of slightly mismatched atomic lattices, creating interference patterns much larger than the original atomic structure. These moiré patterns can change how electrons move through the material, leading to unusual and novel properties. The shape of the moiré pattern changes when the twist angle changes, meaning its electronic properties are highly tunable. From a mathematician's perspective, the sensitivity of these properties to variables like twist angle, strain, and interlayer interactions presents a rich area for accurate modeling and rigorous error analysis. Such tools can bridge theoretical predictions with experimental observations.

The starting point of my thesis is the atomistic tight-binding model of moiré materials. The tight-binding model is a mathematical approach used to describe the movement of a single electron through the material. In this model, negatively charged electrons are considered "bound" to positively charged atomic sites, with a probability of "hopping" to neighboring atoms. This hopping probability decreases exponentially as the distance between atoms increases. The quantum dynamics of electrons is governed by the Schrödinger equation 
$i \partial_t \psi = H\psi,$
 where the Hamiltonian $H$ records the hopping strength between atom sites, and the wave function $\psi$ is a discrete sequence related to the probability of finding the electron at a certain atom. The model is relatively simple as it greatly reduces the available states an electron could be in, yet it is powerful for predicting energy levels and  conductivity in materials.

![lattice](/images/graphene_lattice.jpg)

*Atomic structure of single layer graphene*

![moire](/images/moire_white_background.png)

*Atomic structure of twisted bilayer graphene, with an approximate periodic pattern*

 Accurately solving the the Schrödinger equation is challenging by the fact that the model contains an infinite number of atoms. For periodic materials (crystals), methods like Bloch-Floquet theory simplify the problem by reducing it into a simpler problem on a single unit cell.  Although the moiré patterns in TBG look periodic, they are in fact not periodic at generic twist angles, requiring new approaches to account for subtle variations.
  
 In [this paper](https://timkong98.github.io/publication/paper-3), I developed a method to compute the time evolution of a single electron in the tight-binding model for TBG. The method relies on estimating the speed at which an electron can propagate through the material, given that the electron's ability to "hop" between atoms decreases exponentially with distance. I proved that in such "localized" tight-binding systems, the electron's maximum speed $v_{\max}$ is finite. To make computations feasible, I truncated the model by considering only interactions within a finite radius $R$. I derived an error estimate that quantifies the difference between solutions of the truncated model  $\psi_{\text{TB}, R}$ and the full infinite system $\psi_{\text{TB}}$. Specifically, the difference in solutions at time $t$ is given %\textit{a priori} 
 by
$$
        \|\psi_{\text{TB}}(t) - \psi_{\text{TB}, R}(t) \| \leq CR^{\frac{5}{2}}e^{-\kappa \left( v_{\max}(R - r) - t\right)},
$$
for constants $C,\kappa > 0$ related to the material. This estimate ensures that computations on a finite domain are valid for a given range of time if $R$
is sufficiently large. This work establishes a baseline for comparing results from simplified effective models to those of the full tight-binding model.


 Bistritzer and MacDonald observed that the single-particle electronic properties of TBG can often be captured by effective simplified models.
The Bistritzer-MacDonald (BM) Hamiltonian is a system of partial differential equations that is periodic over the moiré pattern. This effective model correctly predicted essential features like flat electron energy bands near the "magic angle," where superconductivity and other exotic phases emerge. 
![band](/images/band_structure.png)

*BM band structure for TBG*


The importance of this theoretical simplification motivates the question of the range of validity of such effective continuum models. In [this paper](https://timkong98.github.io/publication/paper-2), I used a multi-scale approach to study wave-packet solutions of the tight-binding model in TBG. The moiré pattern in TBG is much larger than the atomic scale, so wave packets that span the moiré length scale effectively "average out" atomic-level details. For such wave packets, I estimated the difference between the wave-packet time-evolved by the tight-binding model $\psi_{\text{TB}}(t)$, and that by the BM model $\psi_{\text{BM}}(t)$. When the spectral width of the wave-packet $\varepsilon$, the twist angle $\theta$, and scaled hopping between layers $\mathfrak h$ are all comparably small, the difference between tight-binding dynamics and effective BM dynamics is
$$
     \| \psi_{\text{TB}}(t) - \psi_{\text{BM}}(t) \| \leq C \varepsilon^2 t.
$$
In fact, we showed that the assumption is indeed realized in experiments. The magic angle corresponds to $\theta \approx 0.017$ radians, while the value of $\mathfrak h$ is estimated as $\approx 0.042$. This work provides rigorous justification on the predictive power of the effective model.


To improve the BM model's accuracy, I extended the multi-scale analysis to higher orders in [my third paper](https://timkong98.github.io/publication/paper-4) .  I also proved that these effective models accurately approximate the corresponding tight-binding models under a large class of parameters. The main result yields a new effective model that reduces the error to 
$$
     \| \psi_{\text{TB}}(t) - \psi_{\text{BM, higher}}(t) \| \leq C \varepsilon^{3} t.
$$
I also carried out numerical simulations demonstrating that the higher-order model captures additional features absent in the original BM model. These findings suggest the higher-order accurate model captures important aspects of the physics of these materials.

![wavepacket](/images/dynamics.png)

*Numerical simulations of wave packets*


