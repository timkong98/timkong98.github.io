---
title: "Research"
permalink: /research/
author_profile: true
---

Twisted bilayer graphene is made from two carbon sheets, each one atom thick, stacked with a small twist. The moiré pattern they form is much larger than the spacing between atoms, and it reshapes the way electrons move — near the first "magic" angle close to one degree, experiments find superconductivity.

Such materials are modeled at two very different scales, and my work connects them: when can simplified model be derived from the atomic description, and how large is the error?

![moire](/images/moire_white_background.png)
*Atomic structure of twisted bilayer graphene, with an approximate periodic pattern*

From atoms to the moiré scale
------

The atomic description is a tight-binding model: an electron is bounded around carbon atoms and "hops" between them, the chance of a hop falling off exponentially with distance. At a generic twist angle the lattices never line up again, so the model has infinitely many atoms and no repeating cell.

Bistritzer and MacDonald replaced it with a system of partial differential equations, periodic over the moiré pattern instead of the atomic lattice. It reproduces the flat bands seen at the magic angle, where many electron states are packed into a narrow range of energies.

![band](/images/band_structure.png)
*BM band structure for TBG, with flat bands near the first magic angle*

In [this paper](https://timkong98.github.io/publication/paper-2) we found a regime where that replacement is justified. For an electron with momenta within $\varepsilon$ of the Dirac points, where a single sheet's two energy bands meet, we proved

$$
\| \psi_{\text{TB}}(t) - \psi_{\text{BM}}(t) \| \leq C \varepsilon^2 t.
$$

The two descriptions then drift apart only linearly in time, at a rate set by $\varepsilon^2$: narrowly spread electrons stay accurate far longer. Measured physical constants place the first magic angle in this regime.

In [this paper](https://timkong98.github.io/publication/paper-4), led by Solomon Quinn, we carried the expansion one order further, gaining another power of $\varepsilon$. Simulations show the corrected model captures features the original misses.

In [this paper](https://timkong98.github.io/publication/paper-3) we bounded how fast an electron can spread, showing that a large finite patch of atoms reproduces the true evolution for a correspondingly long time — enough to map where the Bistritzer-MacDonald model holds.

![wavepacket](/images/dynamics.png)


Relaxation and electron interactions
------

 Real graphene layers relax, like a rubber sheet settling, away from poorly stacked regions — an effect usually absorbed into one fitted parameter. We compute it instead, balancing elastic energy against a stacking energy that penalizes mismatch between the layers, and carry the relaxed structure through to a moiré-scale model.  
 
 
Electron interactions
------

Adding Coulomb repulsion and restricting to the flat bands, we compute ground states in which each electron feels the averaged field of the others, and compare their energies in [this work](https://timkong98.github.io/publication/paper-5).

