---
title: "Teaching"
permalink: /teaching/
author_profile: true
---

{%- comment -%}
  Courses live in _data/teaching.yml; add new ones there. Terms are made to
  wrap only at " – " or ", " so "Winter 2020" never splits across lines in the
  narrow term column.
{%- endcomment -%}
{% for school in site.data.teaching %}
<h2 class="section-head">{{ school.institution }}</h2>

<ol class="courses">
{% for c in school.courses %}
  <li class="course{% if c.role == 'Instructor' %} course--lead{% endif %}">
    <div class="course__term">{{ c.term | replace: ' ', '&nbsp;' | replace: '&nbsp;–&nbsp;', ' – ' | replace: ',&nbsp;', ', ' }}</div>
    <div class="course__body">
      <h3 class="course__title">{{ c.title }}</h3>
      <p class="course__meta"><span class="course__code">{{ c.code }}</span><span class="course__role">{{ c.role }}</span></p>
      {% if c.url %}<p class="course__links"><a class="pub__link" href="{{ c.url }}">Course website</a></p>{% endif %}
    </div>
  </li>
{% endfor %}
</ol>
{% endfor %}
