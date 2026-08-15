---
title: "Talks and Presentations"
permalink: /talks/
author_profile: true
---

<h2 class="section-head" id="talks">Invited and Contributed Talks</h2>

<ol class="timeline">
{% for t in site.data.talks.talks %}
  <li class="timeline__item">
    <div class="timeline__date">{{ t.date }}</div>
    <div class="timeline__body">
      <h3 class="timeline__title">{{ t.title }}{% if t.upcoming %} <span class="pill pill--soft">upcoming</span>{% endif %}</h3>
      <p class="timeline__venue">{{ t.venue }}{% if t.location %} &middot; <span class="timeline__place">{{ t.location }}</span>{% endif %}</p>
      {% if t.url %}<p class="timeline__links"><a href="{{ t.url }}">Slides</a></p>{% endif %}
    </div>
  </li>
{% endfor %}
</ol>

<h2 class="section-head" id="posters">Poster Presentations</h2>

<ol class="timeline">
{% for p in site.data.talks.posters %}
  <li class="timeline__item">
    <div class="timeline__date">{{ p.date }}</div>
    <div class="timeline__body">
      <h3 class="timeline__title">{{ p.title }}{% if p.upcoming %} <span class="pill pill--soft">upcoming</span>{% endif %}</h3>
      <p class="timeline__venue">{{ p.venue }}{% if p.location %} &middot; <span class="timeline__place">{{ p.location }}</span>{% endif %}</p>
      {% if p.url %}<p class="timeline__links"><a href="{{ p.url }}">Poster (PDF)</a></p>{% endif %}
    </div>
  </li>
{% endfor %}
</ol>
