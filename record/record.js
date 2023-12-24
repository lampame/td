(function () {
    'use strict';

    function Component() {
      document.createElement('div');
      this.create = function () {
        // Replace API calls with hardcoded fish text data
        this.data = {
          stations: [
          // Fish text for station data
          {
            title: "Lorem ipsum dolor sit amet station",
            tooltip: "Consectetur adipiscing elit. Nullam faucibus sapien eu neque sagittis, ut ullamcorper lectus condimentum.",
            stream: "lorem-ipsum-stream-url",
            bg_image_mobile: "lorem-ipsum-image-url"
          }, {
            title: "Sed do eiusmod tempor incididunt station",
            tooltip: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            stream: "sed-do-eiusmod-stream-url",
            bg_image_mobile: "sed-do-eiusmod-image-url"
          }
          // Add more fish text stations as needed
          ],
          genre: []
        };
        this.data.stations;
        this.build();
        return this.render();
      };

      // Rest of the function remains unchanged, using fish text data
      // ...
    }

    function startPlugin() {
      window.plugin_record_ready = true;
      Lampa.Lang.add({
        td_panel: {
          ru: 'TD Panel',
          en: 'TD Panel',
          uk: 'TD Panel'
        },
        radio_add_station: {
          ru: 'Введите адрес радиостанции',
          en: 'Enter the address of the radio station',
          uk: 'Введіть адресу радіостанції'
        },
        radio_load_error: {
          ru: 'Ошибка в загрузке потока',
          en: 'Error in stream loading',
          uk: 'Помилка завантаження потоку'
        }
      });
      var manifest = {
        type: 'other',
        version: '0.0.1',
        name: Lampa.Lang.translate('td_panel'),
        description: '',
        component: 'td'
      };
      Lampa.Manifest.plugins = manifest;
      Lampa.Template.add('radio_content', "\n        <div class=\"radio-content\">\n            <div class=\"radio-content__head\">\n                </div>\n            </div>\n            <div class=\"radio-content__body\">\n                <p> Hello world </p>\n            </div>\n        </div>\n    ");
      function add() {
        var button = $("<li class=\"menu__item selector\">\n            <div class=\"menu__ico\">\n                <svg width=\"38\" height=\"31\" viewBox=\"0 0 38 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"17.613\" width=\"3\" height=\"16.3327\" rx=\"1.5\" transform=\"rotate(63.4707 17.613 0)\" fill=\"currentColor\"/>\n                    <circle cx=\"13\" cy=\"19\" r=\"6\" fill=\"currentColor\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 11C0 8.79086 1.79083 7 4 7H34C36.2091 7 38 8.79086 38 11V27C38 29.2091 36.2092 31 34 31H4C1.79083 31 0 29.2091 0 27V11ZM21 19C21 23.4183 17.4183 27 13 27C8.58173 27 5 23.4183 5 19C5 14.5817 8.58173 11 13 11C17.4183 11 21 14.5817 21 19ZM30.5 18C31.8807 18 33 16.8807 33 15.5C33 14.1193 31.8807 13 30.5 13C29.1193 13 28 14.1193 28 15.5C28 16.8807 29.1193 18 30.5 18Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"menu__text\">".concat(manifest.name, "</div>\n        </li>"));
        button.on('hover:enter', function () {
          Lampa.Activity.push({
            url: '',
            title: manifest.name,
            component: 'td',
            page: 1
          });
        });
        $('.menu .menu__list').eq(0).append(button);
      }
      Lampa.Component.add('td', Component);
      if (window.appready) add();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') add();
        });
      }
    }
    if (!window.plugin_record_ready) startPlugin();

})();
