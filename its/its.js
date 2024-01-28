(function () {
    'use strict';

    Lampa.Platform.tv();
    function add() {
      Lampa.Listener.follow('torrent_file', function (data) {
        if (data.type === 'onlong') {
          console.log("Infuse saver", encodeURIComponent(data.element.url));
          data.menu.push({
            title: "<div class\"infuseSaver\"><svg class=\"infuseSaverLogo\" viewBox=\"0 0 85 85\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path opacity=\"0.937\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M50.5 19.5C45.4453 22.2488 42.7786 26.5821 42.5 32.5C37.6434 28.9084 32.6434 25.575 27.5 22.5C27.4226 21.2502 26.756 20.4169 25.5 20C19.7659 18.3702 15.7659 20.2035 13.5 25.5C13.1667 25.5 12.8333 25.5 12.5 25.5C11.357 10.9033 18.0237 4.73664 32.5 7C38.7408 10.9426 44.7408 15.1092 50.5 19.5Z\" fill=\"#FE6700\"/>\n                <path opacity=\"0.982\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M50.5 19.5C51.7095 19.9321 52.7095 20.5987 53.5 21.5C49.5358 24.4701 46.2025 28.1367 43.5 32.5C43.1667 32.5 42.8333 32.5 42.5 32.5C42.7786 26.5821 45.4453 22.2488 50.5 19.5Z\" fill=\"#FB5800\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M53.5 21.5C55.3885 22.604 57.0552 23.9373 58.5 25.5C53.8042 27.8653 50.4709 31.532 48.5 36.5C46.246 35.8763 44.5794 34.543 43.5 32.5C46.2025 28.1367 49.5358 24.4701 53.5 21.5Z\" fill=\"#F64400\"/>\n                <path opacity=\"0.991\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.5 22.5C27.5 24.5 27.5 26.5 27.5 28.5C22.8333 28.5 18.1667 28.5 13.5 28.5C13.5 27.5 13.5 26.5 13.5 25.5C15.7659 20.2035 19.7659 18.3702 25.5 20C26.756 20.4169 27.4226 21.2502 27.5 22.5Z\" fill=\"#EC1B00\"/>\n                <path opacity=\"0.937\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M58.5 25.5C63.0115 27.4975 66.8449 30.4975 70 34.5C73.0759 42.3939 71.5759 49.2272 65.5 55C61.6784 57.3301 58.0117 59.8301 54.5 62.5C53.2812 59.2737 51.6146 56.2737 49.5 53.5C48.7174 51.7118 47.3841 50.7118 45.5 50.5C48.5203 47.4838 51.8536 44.8171 55.5 42.5C58.5179 41.6466 60.3512 39.6466 61 36.5C62.0536 32.3445 61.2202 28.6779 58.5 25.5Z\" fill=\"#FE6800\"/>\n                <path opacity=\"0.977\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.5 25.5C12.8333 25.5 13.1667 25.5 13.5 25.5C13.5 26.5 13.5 27.5 13.5 28.5C18.1667 28.5 22.8333 28.5 27.5 28.5C27.5 30.8333 27.5 33.1667 27.5 35.5C22.5 35.5 17.5 35.5 12.5 35.5C12.5 32.1667 12.5 28.8333 12.5 25.5Z\" fill=\"#F33700\"/>\n                <path opacity=\"0.977\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.5 35.5C17.5 35.5 22.5 35.5 27.5 35.5C27.5 37.5 27.5 39.5 27.5 41.5C22.5 41.5 17.5 41.5 12.5 41.5C12.5 39.5 12.5 37.5 12.5 35.5Z\" fill=\"#FA5200\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M58.5 25.5C61.2202 28.6779 62.0536 32.3445 61 36.5C60.3512 39.6466 58.5179 41.6466 55.5 42.5C53.1667 40.5 50.8333 38.5 48.5 36.5C50.4709 31.532 53.8042 27.8653 58.5 25.5Z\" fill=\"#EC1E00\"/>\n                <path opacity=\"0.944\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.5 41.5C17.5 41.5 22.5 41.5 27.5 41.5C27.6658 46.1785 27.4992 50.8452 27 55.5C22.2391 60.8119 17.5724 60.8119 13 55.5C12.5008 50.8452 12.3342 46.1785 12.5 41.5Z\" fill=\"#FE6600\"/>\n                <path opacity=\"0.984\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M45.5 50.5C47.3841 50.7118 48.7174 51.7118 49.5 53.5C51.6146 56.2737 53.2812 59.2737 54.5 62.5C52.3428 64.4121 50.0094 66.0787 47.5 67.5C45.5873 63.7375 43.4206 60.0709 41 56.5C40.3292 55.7476 39.4959 55.4142 38.5 55.5C40.2964 53.1 42.6298 51.4333 45.5 50.5Z\" fill=\"#FF7700\"/>\n                <path opacity=\"0.986\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M38.5 55.5C39.4959 55.4142 40.3292 55.7476 41 56.5C43.4206 60.0709 45.5873 63.7375 47.5 67.5C46.3951 68.6005 45.0618 69.2671 43.5 69.5C40.8082 65.4297 38.1415 61.4297 35.5 57.5C35.9731 56.0937 36.9731 55.427 38.5 55.5Z\" fill=\"#FE7F00\"/>\n                <path opacity=\"0.997\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M35.5 57.5C38.1415 61.4297 40.8082 65.4297 43.5 69.5C41.7036 71.9 39.3702 73.5667 36.5 74.5C33.3119 70.7735 30.6452 66.7735 28.5 62.5C30.5496 60.4525 32.883 58.7859 35.5 57.5Z\" fill=\"#FE8900\"/>\n                <path opacity=\"0.993\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M28.5 62.5C30.6452 66.7735 33.3119 70.7735 36.5 74.5C32.9607 79.3727 28.294 80.7061 22.5 78.5C19.1831 75.2595 18.6831 71.5929 21 67.5C23.3996 65.5854 25.8996 63.9188 28.5 62.5Z\" fill=\"#FE9500\"/>\n                </svg>Save to Infuse</div>",
            onSelect: function onSelect(a) {
              //x-success=some-app://x-callback-url/playbackDidFinish&x-error=some-app://x-callback-url/playbackDidFail&
              window.location.href = "infuse://x-callback-url/save?url=".concat(encodeURIComponent(data.element.url));
            }
          }, {
            title: "<div class\"infuseSaver\"><svg class=\"infuseSaverLogo\" xmlns=\"http://www.w3.org/2000/svg\"\n                aria-label=\"VLC\" role=\"img\"\n                viewBox=\"0 0 512 512\">\n                <rect\n                width=\"512\" height=\"512\"\n                rx=\"15%\"\n                fill=\"#ffffff\"/>\n                <g fill=\"#f7901e\">\n                <path d=\"M437 400l-36-94c-3-10-13-16-23-16H134c-10 0-20 6-23 16l-36 94c-2 3-2 7-2 11 0 16 13 29 29 29h308a29 29 0 0 0 27-40z\"/>\n                <path d=\"M299 109l-15-51c-3-11-13-18-24-18h-8c-11 0-21 7-24 18l-15 51a307 307 0 0 0 86 0zM256 183c-24 0-46-2-64-6l-19 65c20 8 49 13 83 13s63-5 83-13l-20-65c-17 4-39 6-63 6z\"/>\n                </g>\n                <g fill=\"#f2f2f2\">\n                <path d=\"M319 177l-20-68a307 307 0 0 1-86 0l-21 68c18 4 40 6 64 6s46-2 63-6z\"/>\n                <path d=\"M173 242l-18 62c19 14 55 23 101 23s82-9 101-23l-18-62c-20 8-49 13-83 13s-63-5-83-13z\"/>\n                </g>\n                </svg>Save to VLC</div>",
            onSelect: function onSelect(a) {
              window.location.href = "vlc://".concat(encodeURIComponent(data.element.url));
            }
          });
        }
      });
    }
    function startPlugin() {
      window.plugin_its_ready = true;
      Lampa.Manifest.plugins = {
        type: "other",
        version: "0.0.1",
        name: "Infuse saver",
        description: "Add save button for torrent",
        component: "its"
      };
      Lampa.Template.add('infuseSaver', "\n        <style>\n            .infuseSaver{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.infuseSaverLogo{width:24px;height:24px;margin-right:2%}\n        </style>\n    ");
      $('body').append(Lampa.Template.get('infuseSaver', {}, true));
      if (window.appready) add();else {
        Lampa.Listener.follow("app", function (e) {
          if (e.type === "ready") add();
        });
      }
    }
    if (!window.plugin_its_ready) startPlugin();

})();
