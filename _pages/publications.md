---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

{% if site.author.googlescholar %}
  <p class="page__lead">Also on <a href="{{ site.author.googlescholar }}">Google Scholar</a>.</p>
{% endif %}

<div class="pub-list">
{% for post in site.publications reversed %}
  {% include archive-single-publication.html %}
{% endfor %}
</div>
