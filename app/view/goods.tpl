<!DOCTYPE html>
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" type="text/css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="/goods/{{ item.goodsId }}">{{ item.goodsName }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>