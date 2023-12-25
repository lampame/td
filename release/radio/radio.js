(function () {
    'use strict';

    function stats() {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
          result = this.responseText;
        }
      });
      xhr.open("GET", "http://de1.api.radio-browser.info/json/stats");
      xhr.send();

      // Create an unordered list to display the data
      var list = document.createElement("ul");

      // Iterate over the properties of the result object
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          // Create a list item for each property
          var listItem = document.createElement("li");
          listItem.textContent = key + ": " + result[key];
          list.appendChild(listItem);
        }
      }

      // Append the list to the result div
      return list;
    }
    function station() {
      Lampa.Noty.show("Station");
    }
    var API = {
      stats: stats,
      station: station
    };

    function Component() {
      var last;
      var html = document.createElement("div");
      html.id = "me_radioPanel";
      this.create = function () {
        this.build();
        return this.render();
      };
      this.stats = function () {
        API.stats();
      };
      this.build = function () {
        var tdPanel = html.appendChild(Lampa.Template.js("me_radio_page"));
        tdPanel.innerHTML = "<div id='me_radioStatus'></div>";
        tdPanel.appendChild(API.stats());
        this.display();
        this.stats();
        Lampa.Layer.update(html);
        this.activity.loader(false);
      };
      this.display = function () {
        this.activity.toggle();
      };
      this.background = function () {
        Lampa.Background.immediately("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgBlZaLrsMgDENXxAf3/9XHFdXNZLm2YZHQymPk4CS0277v9+ffrut62nEcn/M8nzb69cxj6le1+75f/RqrZ9fatm3F9wwMR7yhawilNke4Gis/7j9srQbdaVFBnkcQ1WrfgmIIBcTrvgqqsKiTzvpOQbUnAykVW4VVqZXyyDllYFSKx9QaVrO7nGJIB63g+FAq/xhcHWBYdwCsmAtvFZUKE0MlVZWCT4idOlyhTp3K35R/6Nzlq0uBnsKWlEzgSh1VGJxv6rmpXMO7EK+XWUPnDFRWqitQFeY2UyZVryuWlI8ulLgGf19FooAUwC9gCWLcwzWPb7Wa60qdlZxjx6ooUuUqVQsK+y1VoAJyBeJAVsLJeYmg/RIXdG2kPhwYPBUQQyYF0XC8lwP3MTCrYAXB88556peCbUUZV7WccwkUQfCZC4PXdA5hKhSVhythZqjZM0J39w5m8BRadKAcrsIpNZsLIYdOqcZ9hExhZ1MH+QL+ciFzXzmYhZr/M6yUUwp2dp5U4naZDwAF5JRSefdScJZ3SkU0nl8xpaAy+7ml1EqvMXSs1HRrZ9bc3eZUSXmGa/mdyjbmqyX7A9RaYQa9IRJ0AAAAAElFTkSuQmCC");
      };
      this.start = function () {
        if (Lampa.Activity.active() && Lampa.Activity.active().activity !== this.activity) return;
        this.background();
        Lampa.Controller.add("content", {
          link: this,
          invisible: true,
          toggle: function toggle() {
            Lampa.Controller.collectionSet(html);
            Lampa.Controller.collectionFocus(last, html);
          },
          left: function left() {
            if (Navigator.canmove("left")) Navigator.move("left");else Lampa.Controller.toggle("menu");
          },
          right: function right() {
            Navigator.move("right");
          },
          up: function up() {
            if (Navigator.canmove("up")) Navigator.move("up");else Lampa.Controller.toggle("head");
          },
          down: function down() {
            Navigator.move("down");
          },
          back: function back() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle("content");
      };
      this.pause = function () {};
      this.stop = function () {};
      this.render = function () {
        return html;
      };
      this.destroy = function () {
        html.remove();
      };
    }

    Lampa.Platform.tv();
    //Updater.runner();

    /* init plugin */
    function startPlugin() {
      window.plugin_me_radio_ready = true;
      Lampa.Lang.add({
        me_radio: {
          ru: "World radio",
          en: "World radio",
          uk: "World radio"
        }
      });
      var manifest = {
        type: "music",
        version: "0.0.1",
        name: Lampa.Lang.translate("me_radio"),
        description: "",
        component: "me_radio"
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Template.add("me_radio_page", "<div class='me_radio_page'></div>");
      function add() {
        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n            <svg width=\"800\" height=\"800\" viewBox=\"0 0 800 800\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M66.6666 466.667C66.6666 340.96 66.6666 278.105 105.719 239.052C144.772 200 207.625 200 333.333 200H466.667C592.373 200 655.23 200 694.28 239.052C733.333 278.105 733.333 340.96 733.333 466.667C733.333 592.373 733.333 655.23 694.28 694.28C655.23 733.333 592.373 733.333 466.667 733.333H333.333C207.625 733.333 144.772 733.333 105.719 694.28C66.6666 655.23 66.6666 592.373 66.6666 466.667Z\" stroke=\"white\" stroke-width=\"50\"/>\n                <path d=\"M266.667 566.667C321.895 566.667 366.667 521.895 366.667 466.667C366.667 411.438 321.895 366.667 266.667 366.667C211.438 366.667 166.667 411.438 166.667 466.667C166.667 521.895 211.438 566.667 266.667 566.667Z\" stroke=\"white\" stroke-width=\"50\"/>\n                <path d=\"M450 366.667H633.333\" stroke=\"white\" stroke-width=\"50\" stroke-linecap=\"round\"/>\n                <path d=\"M450 466.667H633.333\" stroke=\"white\" stroke-width=\"50\" stroke-linecap=\"round\"/>\n                <path d=\"M450 566.667H633.333\" stroke=\"white\" stroke-width=\"50\" stroke-linecap=\"round\"/>\n                <path d=\"M216.667 200L500 66.6665\" stroke=\"white\" stroke-width=\"50\" stroke-linecap=\"round\"/>\n            </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
        button.on("hover:enter", function () {
          Lampa.Activity.push({
            url: "",
            title: manifest.name,
            component: manifest.component,
            page: 1
          });
        });
        $(".menu .menu__list").eq(0).append(button);
      }
      Lampa.Component.add(manifest.component, Component);
      if (window.appready) add();else {
        Lampa.Listener.follow("app", function (e) {
          if (e.type == "ready") add();
        });
      }
    }
    if (!window.plugin_me_radio_ready) startPlugin();

})();
