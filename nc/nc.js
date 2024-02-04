(function () {
    'use strict';

    var main = function main() {
      var NEW_ITEM_ATTR = 'data-action="concert"';
      var NEW_ITEM_SELECTOR = "[".concat(NEW_ITEM_ATTR, "]");
      var NEW_ITEM_TEXT = "Концерты";
      var NEW_ITEM_SOURCES = ["tmdb", "cub"];
      var ITEM_TV_SELECTOR = '[data-action="tv"]';
      var ITEM_ANIME_SELECTOR = '[data-action="anime"]';
      var ITEM_MOVE_TIMEOUT = 2000;
      var moveItemAfter = function moveItemAfter(item, after) {
        return setTimeout(function () {
          return $(item).insertAfter($(after));
        }, ITEM_MOVE_TIMEOUT);
      };
      var field = $( /* html */"\n          <li class=\"menu__item selector\" ".concat(NEW_ITEM_ATTR, ">\n             <div class=\"menu__ico\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><title>Music Concert</title><g id=\"Music_Concert\" data-name=\"Music Concert\"><path d=\"M30,9V6.672A2.013,2.013,0,0,0,28.546,4.74a46.312,46.312,0,0,0-25.092,0A2.013,2.013,0,0,0,2,6.672V9a2,2,0,0,0,2,2V22a2,2,0,0,0-2,2v1a2,2,0,0,0,2,2H8a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2h4a2,2,0,0,0,2-2V24a2,2,0,0,0-2-2V11A2,2,0,0,0,30,9ZM4,6.665a44.107,44.107,0,0,1,24,0,.018.018,0,0,1,0,.01V9H4ZM26,18H24V15h2Zm-4,4H17V16.535l1.055-.7a1,1,0,1,0-1.11-1.664l-3,2A1,1,0,0,0,15,17.858V22H10V11H22ZM6,15H8v3H6Zm2-4v2H6V11ZM6,20H8v2H6ZM4,25V24H8v1Zm18,2H10V24H22Zm6-2H24V24h4Zm-4-3V20h2v2Zm2-9H24V11h2Z\" id=\"id_101\" style=\"fill: rgb(255, 255, 255);\"></path></g></svg>\n             </div>\n             <div class=\"menu__text\">").concat(NEW_ITEM_TEXT, "</div>\n          </li>\n        "));
      field.on("hover:enter", function () {
        var _Lampa$Activity$activ = Lampa.Activity.active(),
          currentSource = _Lampa$Activity$activ.source;
        var source = NEW_ITEM_SOURCES.includes(currentSource) ? currentSource : NEW_ITEM_SOURCES[0];
        Lampa.Activity.push({
          url: "discover/movie",
          title: "".concat(NEW_ITEM_TEXT, " - ").concat(source.toUpperCase()),
          component: "category_full",
          genres: 10402,
          id: 10402,
          keywords: "156205-concert-film",
          source: source,
          card_type: true,
          page: 1
        });
      });
      Lampa.Menu.render().find(ITEM_TV_SELECTOR).after(field);
      moveItemAfter(NEW_ITEM_SELECTOR, ITEM_TV_SELECTOR);
      moveItemAfter(ITEM_ANIME_SELECTOR, NEW_ITEM_SELECTOR);
    };
    if (window.appready) {
      main();
    } else {
      Lampa.Listener.follow("app", function (event) {
        if (event.type === "ready") {
          main();
        }
      });
    }

})();
