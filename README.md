# timkong98.github.io

Personal academic website of Tianyu Kong, served by GitHub Pages at <https://timkong98.github.io>. Built with Jekyll on the [AcademicPages](https://github.com/academicpages/academicpages.github.io) template (itself derived from [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/); see `LICENSE`).

## Where things live

- `_config.yml`: site settings and the sidebar profile (`author:`)
- `_data/navigation.yml`: links in the top bar
- `_pages/`: About (home page), Research, Publications, Talks, Teaching, CV
- `_publications/`: one Markdown file per paper
- `_data/talks.yml`, `_data/teaching.yml`: talks, posters and courses
- `files/`: CV and poster PDFs; `images/`: figures, banner, profile photo and favicons
- `_sass/_custom.scss`: the site's own styles, layered over the theme
- `_scripts/make_banner.py`: regenerates `images/banner.jpg` and `banner.webp`

## Run locally

```bash
bundle install
bundle exec jekyll serve --livereload
```

`assets/js/main.min.js` is built from `assets/js/plugins/` and `assets/js/_main.js` with `npm run build:js`.
