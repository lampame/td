"use strict";
Lampa.Platform.tv();
/* Some function */

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
    console.log(e);
    if (e.name == "main") {
      if (
        Lampa.Settings.main().render().find('[data-component="qBittorent"]')
          .length == 0
      ) {
        Lampa.SettingsApi.addComponent({
          component: "qBittorent",
          name: "qBittorent",
        });
      }
      Lampa.Settings.main().update();
      Lampa.Settings.main()
        .render()
        .find('[data-component="qBittorent"]')
        .addClass("hide");
    }
    //if (e.name == "qBittorent") $(".settings__title").append(" qBittorent");
    /* transmission */
    if (e.name == "main") {
      if (
        Lampa.Settings.main().render().find('[data-component="transmission"]')
          .length == 0
      ) {
        Lampa.SettingsApi.addComponent({
          component: "transmission",
          name: "transmission",
        });
      }
      Lampa.Settings.main().update();
      Lampa.Settings.main()
        .render()
        .find('[data-component="transmission"]')
        .addClass("hide");
    }
    //if (e.name == "transmission") $(".settings__title").append(" transmission");
    /* info */
    if (e.name == "main") {
      if (
        Lampa.Settings.main().render().find('[data-component="td_info"]')
          .length == 0
      ) {
        Lampa.SettingsApi.addComponent({
          component: "td_info",
          name: "td_info",
        });
      }
      Lampa.Settings.main().update();
      Lampa.Settings.main()
        .render()
        .find('[data-component="td_info"]')
        .addClass("hide");
    }
    //if (e.name == "td_info") $(".settings__title").html("О плагине"); //$(".settings__title").append("");
  });

  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "tdInfo",
      type: "static", //доступно select,input,trigger,title,static
      default: true,
    },
    field: {
      name: "О плагине",
      description: "Информация",
    },
    onRender: function (item) {
      item.show();
      $(".settings-param__name", item).before(
        '<div class="settings-param__status"></div>'
      );
      item.on("hover:enter", function () {
        Lampa.Settings.create("td_info");
        Lampa.Controller.enabled().controller.back = function () {
          Lampa.Settings.create("torrentDownloader");
        };
      });
    },
  });
  Lampa.SettingsApi.addParam({
    component: "td_info",
    param: {
      name: "group",
      type: "static",
    },
    field: {
      name: '<img src="https://cdn.glitch.global/d9956867-398e-4a85-9c42-31911adc9981/groupLTD.jpg?v=1702216657917" alt="GroupLTD" width="100%" height="auto">',
      description: "Группа плагина Torrent downloader",
    },
  });
  Lampa.SettingsApi.addParam({
    component: "td_info",
    param: {
      name: "group",
      type: "static",
    },
    field: {
      name: "<b>Описание</b>",
      description:
        "Плагин служит для загрузки торрентов средствами Torrent клиентов. Вызывается через контекстное меню на выбранной раздаче</ br> Обязательные зависимости - Активированный парсер для торрентов. Torrserver НЕ ТРЕБУЕТСЯ</ br> Пожелания по клиентам принимаются в чате плагина",
    },
  });
  /* qBittorent */
  Lampa.SettingsApi.addParam({
    component: "torrentDownloader",
    param: {
      name: "td_qBittorent",
      type: "trigger", //доступно select,input,trigger,title,static
      default: false,
      //icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
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
      name: "qBittorentHead",
      type: "static",
    },
    field: {
      name: 'Настройка qBittorent',
      //description: "Настройка qBittorent",
    },
  });
  Lampa.SettingsApi.addParam({
    component: "qBittorent",
    param: {
      name: "qBittorent_ssl",
      type: "trigger", //доступно select,input,trigger,title,static
      default: false,
      //icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
    },
    field: {
      name: `Use HTTPS`,
      description: "",
    },
    onChange: function (value) {
      if (value == "true") Lampa.Storage.set("qBittorentProtocol", "https://");
      else Lampa.Storage.set("qBittorentProtocol", "http://");
      Lampa.Settings.update();
    },
  });
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
  /* Transmission */
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
      name: "transmissionHead",
      type: "static",
    },
    field: {
      name: 'Настройка Transmission',
      //description: "Настройка Transmission",
    },
  });
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_ssl",
      type: "trigger", //доступно select,input,trigger,title,static
      default: false,
      //icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
    },
    field: {
      name: `Use HTTPS`,
      description: "",
    },
    onChange: function (value) {
      if (value == "true") Lampa.Storage.set("transmissionProtocol", "https://");
      else Lampa.Storage.set("transmissionProtocol", "http://");
      Lampa.Settings.update();
    },
  });
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
  Lampa.SettingsApi.addParam({
    component: "transmission",
    param: {
      name: "transmission_autostart",
      type: "trigger", //доступно select,input,trigger,title,static
      default: true,
      //icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
    },
    field: {
      name: `Autostop`,
      description: "Все торренты добавляются на паузе",
    },
    onChange: function (value) {
      if (value == "true") Lampa.Storage.set("transmissionAutostart", true);
      else Lampa.Storage.set("transmissionAutostart", false);
      Lampa.Settings.update();
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
    let selectedTorrent = e.element;
    let addQbittorrentItem = false;
    let addTransmissionItem = false;
    const originalSelectShow = Lampa.Select.show;
    // Override Select.show with custom functionality    
    Lampa.Select.show = function (options) {
      // Add the qBittorrent menu item
      if (Lampa.Storage.field("td_qBittorent") === true && !addQbittorrentItem) {
        addQbittorrentItem = true;
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
                    `${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get("qBittorentUrl")}:${Lampa.Storage.get(
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
                        `${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get(
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
                            `${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get(
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
                                `${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get(
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
                                    `${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get(
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
      if (Lampa.Storage.field("td_transmission") === true && !addTransmissionItem) {
        addTransmissionItem = true;
        //splice(0, 0, transmission)
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

                  authXhr.addEventListener("readystatechange", function () {
                    if ((authXhr.readyState === 4) & (authXhr.status === 409)) {
                      var addXhr = new XMLHttpRequest();
                      console.log("Login with status " + authXhr.status);
                      Lampa.Noty.show("Login with status " + authXhr.status);
                      //Try add torrent
                      var data = JSON.stringify({
                        method: "torrent-add",
                        arguments: {
                          paused: Lampa.Storage.get("transmissionAutostart"),
                          filename: selectedTorrent.MagnetUri.split("&")[0],
                        },
                      });
                      addXhr.open(
                        "POST",
                        `${Lampa.Storage.get("transmissionProtocol") || "http://"}${Lampa.Storage.get(
                          "transmissionUrl"
                        )}:${Lampa.Storage.get(
                          "transmissionPort"
                        )}/transmission/rpc`
                      );
                      addXhr.setRequestHeader(
                        "X-Transmission-Session-Id",
                        this.getResponseHeader("X-Transmission-Session-Id")
                      );
                      addXhr.setRequestHeader(
                        "Content-Type",
                        "application/json"
                      );
                      addXhr.setRequestHeader(
                        "Authorization",
                        `Basic ${btoa(
                          Lampa.Storage.get("transmissionUser") +
                            ":" +
                            Lampa.Storage.get("transmissionPass")
                        )}`
                      );

                      addXhr.send(data);
                      addXhr.addEventListener("readystatechange", function () {
                        if (
                          addXhr.readyState === 4 & addXhr.status === 200
                        ) {
                          Lampa.Noty.show("Torrent add success");
                        } else if (addXhr.status != 200) {
                          console.log(addXhr);
                          Lampa.Noty.show("Something wrong " + addXhr.status);
                        }
                      });
                    }
                  });

                  authXhr.open(
                    "POST",
                    `${Lampa.Storage.get("transmissionProtocol") || "http://"}${Lampa.Storage.get(
                      "transmissionUrl"
                    )}:${Lampa.Storage.get(
                      "transmissionPort"
                    )}/transmission/rpc`
                  );
                  authXhr.setRequestHeader(
                    "Authorization",
                    `Basic ${btoa(
                      Lampa.Storage.get("transmissionUser") +
                        ":" +
                        Lampa.Storage.get("transmissionPass")
                    )}`
                  );

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
