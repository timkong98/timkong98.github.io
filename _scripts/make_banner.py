"""Render images/banner.jpg and images/banner.webp: the moire pattern of two
honeycomb (graphene) lattices twisted against each other.

    python3 _scripts/make_banner.py

Needs numpy and Pillow; the .webp copy also needs `cwebp` on the PATH. Tweak
THETA for a coarser or finer moire (the period scales like 1/THETA), or the
colours below to change the palette. Jekyll ignores this directory because its
name starts with an underscore.
"""
import os
import shutil
import subprocess

import numpy as np
from PIL import Image, ImageDraw

W, H = 2880, 640           # rendered size; saved downscaled to 2400 wide
D = 13                     # carbon-carbon spacing, px
THETA = 3.8                # twist angle, degrees
R_DOT = 3.7                # atom radius, px
CENTER = (0.62, 0.5)       # twist centre, as a fraction of W and H
GROUND = ((98, 8, 16), (128, 0, 0))            # gradient, left -> right
LAYERS = (((255, 255, 255), 0.42), ((255, 196, 178), 0.38))
SUPERSAMPLE = 3

OUT = os.path.join(os.path.dirname(__file__), "..", "images")


def layer_mask(angle):
    s = SUPERSAMPLE
    mask = Image.new("L", (W * s, H * s), 0)
    draw = ImageDraw.Draw(mask)
    a1 = D * np.array([1.5, np.sqrt(3) / 2])
    a2 = D * np.array([1.5, -np.sqrt(3) / 2])
    reach = np.hypot(W, H)
    n = int(reach / (D * 1.5)) + 3
    i, j = np.meshgrid(np.arange(-n, n + 1), np.arange(-n, n + 1))
    pts = i.reshape(-1, 1) * a1 + j.reshape(-1, 1) * a2
    pts = np.concatenate([pts, pts + [D, 0]])          # A and B sublattices
    pts = pts[np.hypot(pts[:, 0], pts[:, 1]) < reach * 0.8]
    rot = np.array([[np.cos(angle), -np.sin(angle)],
                    [np.sin(angle), np.cos(angle)]])
    pts = pts @ rot.T + [W * CENTER[0], H * CENTER[1]]
    keep = ((pts[:, 0] > -D) & (pts[:, 0] < W + D) &
            (pts[:, 1] > -D) & (pts[:, 1] < H + D))
    r = R_DOT * s
    for x, y in pts[keep] * s:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=255)
    mask = mask.resize((W, H), Image.LANCZOS)
    return np.asarray(mask, dtype=np.float32) / 255.0


def main():
    theta = np.deg2rad(THETA)
    x = np.linspace(0, 1, W)[None, :]
    y = np.linspace(0, 1, H)[:, None]
    t = np.clip(0.75 * x + 0.25 * y, 0, 1)[..., None]
    img = (1 - t) * np.array(GROUND[0], np.float32) + t * np.array(GROUND[1], np.float32)
    for (colour, alpha), angle in zip(LAYERS, (-theta / 2, theta / 2)):
        k = (layer_mask(angle) * alpha)[..., None]
        img = (1 - k) * img + k * np.array(colour, np.float32)

    im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    im = im.resize((2400, round(2400 * H / W)), Image.LANCZOS)
    jpg = os.path.join(OUT, "banner.jpg")
    im.save(jpg, quality=72, subsampling=0, optimize=True, progressive=True)
    print("wrote", jpg)

    if shutil.which("cwebp"):
        png = os.path.join(OUT, "banner.tmp.png")
        im.save(png)
        webp = os.path.join(OUT, "banner.webp")
        subprocess.run(["cwebp", "-q", "72", "-quiet", png, "-o", webp], check=True)
        os.remove(png)
        print("wrote", webp)


if __name__ == "__main__":
    main()
