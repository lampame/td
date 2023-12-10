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
        icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M527.579429 186.660571a119.954286 119.954286 0 1 1-67.949715 0V47.542857a33.938286 33.938286 0 0 1 67.949715 0v139.190857z m281.380571 604.598858a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 1 1-67.949714 0v-139.190857z m-698.441143 0a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 0 1-67.949714 0v-139.190857zM144.457143 13.531429c18.797714 0 34.011429 15.213714 34.011428 33.938285v410.038857a33.938286 33.938286 0 0 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 33.938286-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m698.514286-722.139428c18.724571 0 33.938286 15.213714 33.938285 33.938285v410.038857a33.938286 33.938286 0 1 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 34.011429-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m-349.403429 228.717714a33.938286 33.938286 0 0 1-33.938286-33.938285V520.411429a33.938286 33.938286 0 0 1 67.949715 0v410.038857a33.938286 33.938286 0 0 1-34.011429 33.938285z m0-722.139428a60.269714 60.269714 0 1 0 0 120.539428 60.269714 60.269714 0 0 0 0-120.539428z" fill="#ffffff"/></g></svg>',
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
                    icon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke="#ffffff" stroke-width="2" class="stroke-000000"><path d="M4.4 2h15.2A2.4 2.4 0 0 1 22 4.4v15.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 19.6V4.4A2.4 2.4 0 0 1 4.4 2Z"></path><path d="M12 20.902V9.502c-.026-2.733 1.507-3.867 4.6-3.4M9 13.5h6"></path></g></svg>',
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
            Lampa.Storage.set("qBittorentUrl", item)
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
            Lampa.Storage.set("qBittorentPort", item)
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
            Lampa.Storage.set("qBittorentUser", item)
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
            Lampa.Storage.set("qBittorentPass", item)
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
            Lampa.Storage.set("transmissionUrl", item)
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
            Lampa.Storage.set("transmissionPort", item)
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
            Lampa.Storage.set("transmissionUser", item)
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
            Lampa.Storage.set("transmissionPass", item)
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
                                        `${Lampa.Storage.get(
                                            "qBittorentUrl"
                                        )}:${Lampa.Storage.get("qBittorentPort")}/api/v2/auth/login?username=${Lampa.Storage.get("qBittorentUser")}&password=${Lampa.Storage.get("qBittorentPass")}`,
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
                                                )}:${Lampa.Storage.get("qBittorentPort")}/api/v2/torrents/add`,
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
                                                        )}:${Lampa.Storage.get("qBittorentPort")}/api/v2/torrents/info?sort=added_on&reverse=true`,
                                                        true
                                                    );
                                                    listXhr.onreadystatechange = function () {
                                                        Lampa.Noty.show("Bad" + JSON.parse(listXhr.responseText));
                                                        if (listXhr.readyState === 4) {

                                                            var torrents = JSON.parse(listXhr.responseText);
                                                            var lastAddedTorrent = torrents[0].hash; // Assuming the first one is the last added

                                                            // Set first/last piece priority
                                                            var firstXhr = new XMLHttpRequest();
                                                            firstXhr.open(
                                                                "GET",
                                                                `${Lampa.Storage.get(
                                                                    "qBittorentUrl"
                                                                )}:${Lampa.Storage.get("qBittorentPort")}/api/v2/torrents/toggleFirstLastPiecePrio?hashes=${lastAddedTorrent}`,
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
                                                                        )}:${Lampa.Storage.get("qBittorentPort")}/api/v2/torrents/toggleSequentialDownload?hashes=${lastAddedTorrent}`,
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
                                    // Аутентификационный запрос
                                    fetch(`http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`, {
                                        method: "GET",
                                        headers: {
                                            "Authorization": `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`,
                                            //"X-Transmission-Session-Id": response.headers.get('X-Transmission-Session-Id'),
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            //method: "session-get"
                                        })
                                    })
                                        .then(response => {
                                            console.log(JSON.stringify(response.status));
                                            if (response.status) {
                                                // Параметры для добавления торрента
                                                const addBody = {
                                                    method: "torrent-add",
                                                    arguments: {
                                                        paused: false,
                                                        filename: selectedTorrent.MagnetUri
                                                    }
                                                };

                                                // Запрос на добавление торрента
                                                return fetch(`http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Authorization": `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`,
                                                        "X-Transmission-Session-Id": response.headers.get('X-Transmission-Session-Id'),
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(addBody)
                                                });
                                            } else {
                                                throw new Error("Ошибка аутентификации");
                                            }
                                        })
                                        .then(response => {
                                            if (response.ok) {
                                                // Запрос на получение списка торрентов, чтобы найти хэш последнего добавленного торрента
                                                return fetch(`http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Authorization": `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`,
                                                        "X-Transmission-Session-Id": response.headers.get('X-Transmission-Session-Id'),
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({
                                                        method: "torrent-get",
                                                        arguments: {
                                                            fields: ["id"],
                                                            ids: "recently-active"
                                                        }
                                                    })
                                                });
                                            } else {
                                                throw new Error("Ошибка добавления торрента");
                                            }
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            const torrents = data.arguments.torrents;
                                            const lastAddedTorrent = torrents[torrents.length - 1].id;

                                            // Установка приоритета первого/последнего куска
                                            const firstBody = {
                                                method: "torrent-set",
                                                arguments: {
                                                    ids: [lastAddedTorrent],
                                                    priority_high: [0],
                                                    priority_low: [torrents[torrents.length - 1].totalSize / torrents[torrents.length - 1].pieceSize - 1]
                                                }
                                            };

                                            // Запрос на установку приоритета
                                            return fetch(`http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`, {
                                                method: "POST",
                                                headers: {
                                                    "Authorization": `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`,
                                                    "X-Transmission-Session-Id": response.headers.get('X-Transmission-Session-Id'),
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(firstBody)
                                            });
                                        })
                                        .then(response => {
                                            if (response.ok) {
                                                // Включение последовательной загрузки
                                                const toggleBody = {
                                                    method: "torrent-set",
                                                    arguments: {
                                                        ids: [lastAddedTorrent],
                                                        "download-sequential": true
                                                    }
                                                };

                                                // Запрос на включение последовательной загрузки
                                                return fetch(`http://${Lampa.Storage.get("transmissionUrl")}:${Lampa.Storage.get("transmissionPort")}/transmission/rpc`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Authorization": `Basic ${btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))}`,
                                                        "X-Transmission-Session-Id": response.headers.get('X-Transmission-Session-Id'),
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(toggleBody)
                                                });
                                            } else {
                                                throw new Error("Ошибка установки приоритета");
                                            }
                                        })
                                        .then(response => {
                                            if (response.ok) {
                                                Lampa.Noty.show("Торрент загружается в Transmission");
                                            } else {
                                                throw new Error("Ошибка включения последовательной загрузки");
                                            }
                                        })
                                        .catch(error => {
                                            console.error(error);
                                            Lampa.Noty.show("Произошла ошибка");
                                        });
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
            originalSelectShow.call(this, options);
        };
    }
});
