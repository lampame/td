"use strict";
Lampa.Platform.tv();
/* Some function */
function testConnect() {
  return "data";
}
/* start inject */
function add() {
  //Создание пункта меню
  Lampa.SettingsApi.addComponent({
    component: "torrentDownloader",
    name: "Torrent downloader", //Задаём название меню
    icon: '<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M150 250L350 50V250H150Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M350 50L150 250H350V50ZM400 50V300H356V435C356 446.67 360.636 457.861 368.887 466.113C377.139 474.364 388.33 479 400 479C412.195 477.526 423.422 471.614 431.537 462.393C439.652 453.171 444.089 441.284 444 429V300H513V560C500.798 557.619 489.218 552.75 478.981 545.696C468.744 538.642 460.07 529.554 453.5 519C439.162 528.333 422.669 533.832 405.598 534.97C388.527 536.108 371.45 532.847 356 525.5V650H286.5V300H150V750H650V50H400Z" fill="white"/> </svg>',
  });
  /* Menu */
  Lampa.Settings.listener.follow("open", function (e) {
    if (e.name == "main") {
      if (
        Lampa.Settings.main().render().find('[data-component="qBittorent"]')
          .length == 0
      ) {
        Lampa.SettingsApi.addComponent({
          component: "qBittorent",
          name: "qBittorent",
          icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
        });
      }
      Lampa.Settings.main().update();
      Lampa.Settings.main()
        .render()
        .find('[data-component="qBittorent"]')
        .addClass("hide");
    }
    if (e.name == "qBittorent") $(".settings__title").append(" qBittorent");
    /* transmission */
    if (e.name == "main") {
      if (
        Lampa.Settings.main().render().find('[data-component="transmission"]')
          .length == 0
      ) {
        Lampa.SettingsApi.addComponent({
          component: "transmission",
          name: "transmission",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><defs><linearGradient x1="34.012%" y1="0%" x2="76.373%" y2="76.805%" id="a"><stop stop-color="#72B4F5" offset="0%"/><stop stop-color="#356EBF" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><circle stroke="#DAEFFF" stroke-width="32" fill="url(#a)" cx="512" cy="512" r="496"/><path d="M712.898 332.399q66.657 0 103.38 45.671 37.03 45.364 37.03 128.684t-37.34 129.61q-37.03 45.98-103.07 45.98-33.02 0-60.484-12.035-27.156-12.344-45.672-37.649h-3.703l-10.8 43.512h-36.724V196h51.227v116.65q0 39.191-2.469 70.359h2.47q35.796-50.61 106.155-50.61zm-7.406 42.894q-52.46 0-75.605 30.242-23.145 29.934-23.145 101.219t23.762 102.145q23.761 30.55 76.222 30.55 47.215 0 70.36-34.254 23.144-34.562 23.144-99.058 0-66.04-23.144-98.442-23.145-32.402-71.594-32.402z" fill="#fff"/><path d="M317.273 639.45q51.227 0 74.68-27.466 23.453-27.464 24.996-92.578v-11.418q0-70.976-24.07-102.144-24.07-31.168-76.223-31.168-45.055 0-69.125 35.18-23.762 34.87-23.762 98.75 0 63.879 23.454 97.515 23.761 33.328 70.05 33.328zm-7.715 42.894q-65.421 0-102.144-45.98-36.723-45.981-36.723-128.376 0-83.011 37.032-129.609 37.03-46.598 103.07-46.598 69.433 0 106.773 52.461h2.778l7.406-46.289h40.426V828h-51.227V683.27q0-30.86 3.395-52.461h-4.012q-35.488 51.535-106.774 51.535z" fill="#c8e8ff"/></g></svg>',
        });
      }
      Lampa.Settings.main().update();
      Lampa.Settings.main()
        .render()
        .find('[data-component="transmission"]')
        .addClass("hide");
    }
    if (e.name == "transmission") $(".settings__title").append(" transmission");
  });
  /* qBittorent */
  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "td_qBittorent",
      type: "trigger", //доступно select,input,trigger,title,static
      default: false,
    },
    field: {
      name: `[Beta] qBittorent`,
      description: "",
    },
    onChange: function (value) {
      if (value == "true") Lampa.Storage.set("td_qBittorent", true);
      else Lampa.Storage.set("td_qBittorent", false);
      Lampa.Settings.update();
    },
  });
  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "qBittorent",
      type: "static", //доступно select,input,trigger,title,static
      default: true,
    },
    field: {
      name: "qBittorent",
      description: "Настройка сервера",
    },
    onRender: function (item) {
      if (Lampa.Storage.field("td_qBittorent") === true) {
        item.show();
        $(".settings-param__name", item).before(
          '<div class="settings-param__status"></div>'
        );
      } else item.hide();
      item.on("hover:enter", function () {
        Lampa.Settings.create("qBittorent");
        Lampa.Controller.enabled().controller.back = function () {
          Lampa.Settings.create("torrentDownloader");
        };
      });
    },
  });
  /* Client setting */
  Lampa.SettingsApi.addParam({
    component: "qBittorent",
    param: {
      name: "qBittorent_url",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("qBittorentUrl")}`,
    },
    field: {
      name: `Adress`,
    },
    onChange: function (item) {
      Lampa.Storage.set("qBittorentUrl", item);
    },
  });
  Lampa.SettingsApi.addParam({
    component: "qBittorent",
    param: {
      name: "qBittorent_port",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("qBittorentPort")}`,
    },
    field: {
      name: `Port`,
    },
    onChange: function (item) {
      Lampa.Storage.set("qBittorentPort", item);
    },
  });
  /* auth */
  Lampa.SettingsApi.addParam({
    component: "qBittorent",
    param: {
      name: "qBittorent_user",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("qBittorentUser")}`,
    },
    field: {
      name: `User`,
    },
    onChange: function (item) {
      Lampa.Storage.set("qBittorentUser", item);
    },
  });
  Lampa.SettingsApi.addParam({
    component: "qBittorent",
    param: {
      name: "qBittorent_password",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("qBittorentPass")}`,
    },
    field: {
      name: `Password`,
    },
    onChange: function (item) {
      Lampa.Storage.set("qBittorentPass", item);
    },
  });
  /* transmission */
  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "td_transmission",
      type: "trigger", //доступно select,input,trigger,title,static
      default: false,
    },
    field: {
      name: `Transmission`,
      description: "",
    },
    onChange: function (value) {
      if (value == "true") Lampa.Storage.set("td_transmission", true);
      else Lampa.Storage.set("td_transmission", false);
      Lampa.Settings.update();
    },
  });
  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "transmission",
      type: "static", //доступно select,input,trigger,title,static
      default: true,
    },
    field: {
      name: "transmission",
      description: "Настройка сервера",
    },
    onRender: function (item) {
      if (Lampa.Storage.field("td_transmission") === true) {
        item.show();
        $(".settings-param__name", item).before(
          '<div class="settings-param__status"></div>'
        );
      } else item.hide();
      item.on("hover:enter", function () {
        Lampa.Settings.create("transmission");
        Lampa.Controller.enabled().controller.back = function () {
          Lampa.Settings.create("torrentDownloader");
        };
      });
    },
  });
  /* Client setting */
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_url",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("transmissionUrl")}`,
    },
    field: {
      name: `Adress`,
    },
    onChange: function (item) {
      Lampa.Storage.set("transmissionUrl", item);
    },
  });
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_port",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("transmissionPort")}`,
    },
    field: {
      name: `Port`,
    },
    onChange: function (item) {
      Lampa.Storage.set("transmissionPort", item);
    },
  });
  /* auth */
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_user",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("transmissionUser")}`,
    },
    field: {
      name: `User`,
    },
    onChange: function (item) {
      Lampa.Storage.set("transmissionUser", item);
    },
  });
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_password",
      type: "input", //доступно select,input,trigger,title,static
      values: `${Lampa.Storage.get("transmissionPass")}`,
    },
    field: {
      name: `Password`,
    },
    onChange: function (item) {
      Lampa.Storage.set("transmissionPass", item);
    },
  });
}
/* Если всё готово */
if (window.appready) add();
else {
  Lampa.Listener.follow("app", function (e) {
    if (e.type == "ready") {
      add();
    }
  });
}
/* qBittorent */
Lampa.Listener.follow("torrent", function (e) {
  if (e.type === "onlong") {
    // Assuming 'e.element' contains the torrent data
    //let addQbittorrentItem = false;
    let selectedTorrent = e.element;

    const originalSelectShow = Lampa.Select.show;

    // Override Select.show with custom functionality
    Lampa.Select.show = function (options) {
      // Add the qBittorrent menu item
      if (Lampa.Storage.field("td_qBittorent") === true) {
        options.items.push({
          title: `qBittorrent`,
          qb: true,
          onSelect: function (a) {
            if (a.qb) {
              if (selectedTorrent) {
                if (!selectedTorrent.MagnetUri) {
                  Lampa.Parser.marnet(
                    selectedTorrent,
                    () => {
                      Lampa.Noty.show("Magnet loaded");
                    },
                    (error) => {
                      console.error("Error loading magnet:", error);
                      Lampa.Noty.show("Error loading magnet:", error);
                    }
                  );
                }
                if (selectedTorrent.MagnetUri) {
                  // Authentication request
                  var authXhr = new XMLHttpRequest();
                  authXhr.open(
                    "GET",
                    `${Lampa.Storage.get("qBittorentUrl")}:${Lampa.Storage.get(
                      "qBittorentPort"
                    )}/api/v2/auth/login?username=${Lampa.Storage.get(
                      "qBittorentUser"
                    )}&password=${Lampa.Storage.get("qBittorentPass")}`,
                    true
                  );
                  authXhr.onreadystatechange = function () {
                    if (authXhr.readyState === 4) {
                      // Add torrent request
                      var addXhr = new XMLHttpRequest();
                      addXhr.open(
                        "POST",
                        `${Lampa.Storage.get(
                          "qBittorentUrl"
                        )}:${Lampa.Storage.get(
                          "qBittorentPort"
                        )}/api/v2/torrents/add`,
                        true
                      );
                      addXhr.setRequestHeader(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                      );
                      addXhr.onreadystatechange = function () {
                        if (addXhr.readyState === 4) {
                          // Get torrent list to find the hash of the last added torrent
                          var listXhr = new XMLHttpRequest();
                          listXhr.open(
                            "GET",
                            `${Lampa.Storage.get(
                              "qBittorentUrl"
                            )}:${Lampa.Storage.get(
                              "qBittorentPort"
                            )}/api/v2/torrents/info?sort=added_on&reverse=true`,
                            true
                          );
                          listXhr.onreadystatechange = function () {
                            Lampa.Noty.show(
                              "Bad" + JSON.parse(listXhr.responseText)
                            );
                            if (listXhr.readyState === 4) {
                              var torrents = JSON.parse(listXhr.responseText);
                              var lastAddedTorrent = torrents[0].hash; // Assuming the first one is the last added

                              // Set first/last piece priority
                              var firstXhr = new XMLHttpRequest();
                              firstXhr.open(
                                "GET",
                                `${Lampa.Storage.get(
                                  "qBittorentUrl"
                                )}:${Lampa.Storage.get(
                                  "qBittorentPort"
                                )}/api/v2/torrents/toggleFirstLastPiecePrio?hashes=${lastAddedTorrent}`,
                                true
                              );
                              firstXhr.onreadystatechange = function () {
                                if (firstXhr.readyState === 4) {
                                  // Toggle sequential download
                                  var toggleXhr = new XMLHttpRequest();
                                  toggleXhr.open(
                                    "GET",
                                    `${Lampa.Storage.get(
                                      "qBittorentUrl"
                                    )}:${Lampa.Storage.get(
                                      "qBittorentPort"
                                    )}/api/v2/torrents/toggleSequentialDownload?hashes=${lastAddedTorrent}`,
                                    true
                                  );
                                  toggleXhr.onreadystatechange = function () {
                                    if (toggleXhr.readyState === 4) {
                                      Lampa.Noty.show(
                                        "Torrent is being downloaded in qBittorrent"
                                      );
                                    }
                                  };
                                  toggleXhr.send();
                                }
                              };
                              firstXhr.send();
                            }
                          };
                          listXhr.send();
                        }
                      };
                      var data =
                        "urls=" + encodeURIComponent(selectedTorrent.MagnetUri);
                      addXhr.send(data);
                    } else {
                      Lampa.Noty.show("Authentication failed");
                    }
                  };
                  authXhr.send();
                }

                setTimeout(() => {
                  Lampa.Select.close();
                }, 10);
              } else {
                Lampa.Noty.show("Magnet link not found");
              }
            }
          },
        });
      }
      /* Transmission BTN */
      if (Lampa.Storage.field("td_transmission") === true) {
        options.items.push({
          title: `Transmission`,
          onSelect: function (a) {
              if (selectedTorrent) {
                if (!selectedTorrent.MagnetUri) {
                  Lampa.Parser.marnet(
                    selectedTorrent,
                    () => {
                      Lampa.Noty.show("Magnet loaded");
                    },
                    (error) => {
                      console.error("Error loading magnet:", error);
                      Lampa.Noty.show("Error loading magnet:", error);
                    }
                  );
                }
                if (selectedTorrent.MagnetUri) {
                  // WARNING: For GET requests, body is set to null by browsers.
                  var authXhr = new XMLHttpRequest();
                  authXhr.withCredentials = false;

                  authXhr.addEventListener("readystatechange", function() {
                    if(authXhr.readyState === 4 & authXhr.status === 409) {
                      var addXhr = new XMLHttpRequest();
                      console.log(authXhr.getResponseHeader('X-Transmission-Session-Id'));
                      console.log(`Status ${authXhr.status} - and magnet ${selectedTorrent.MagnetUri.split("&")[0]}`);
                      //Try add torrent
                      var data = JSON.stringify({
                        "method": "torrent-add",
                        "arguments": {
                          "paused": true,
                          "filename": selectedTorrent.MagnetUri.split("&")[0]
                        }
                      });
                      addXhr.open("POST", `http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`);
                      addXhr.setRequestHeader("X-Transmission-Session-Id", this.getResponseHeader('X-Transmission-Session-Id'));
                      addXhr.setRequestHeader("Content-Type", "application/json");
                      addXhr.setRequestHeader("Authorization", `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`);

                      addXhr.send(data);
                      addXhr.addEventListener("readystatechange", function() {
                        if(addXhr.readyState === 4 & addXhr.status === 200) {
                          Lampa.Noty.show("Torrent add");
                        } else {
                          console.log(addXhr);
                        }
                      });
                    }
                  });

                  authXhr.open("POST", `http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`);
                  authXhr.setRequestHeader("Authorization", `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`);

                  authXhr.send();
                }
                setTimeout(() => {
                  Lampa.Select.close();
                }, 10);
              } else {
                Lampa.Noty.show("Magnet link not found");
              }
          },
        });
      }
      originalSelectShow.call(this, options);
    };
  }
});
