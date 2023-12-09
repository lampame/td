"use strict";
Lampa.Platform.tv();
function add() {
    //Создание пункта меню
    Lampa.SettingsApi.addComponent({
        component: "torrentDownloader",
        name: "Internal Torrent", //Задаём название меню
        icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M527.579429 186.660571a119.954286 119.954286 0 1 1-67.949715 0V47.542857a33.938286 33.938286 0 0 1 67.949715 0v139.190857z m281.380571 604.598858a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 1 1-67.949714 0v-139.190857z m-698.441143 0a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 0 1-67.949714 0v-139.190857zM144.457143 13.531429c18.797714 0 34.011429 15.213714 34.011428 33.938285v410.038857a33.938286 33.938286 0 0 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 33.938286-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m698.514286-722.139428c18.724571 0 33.938286 15.213714 33.938285 33.938285v410.038857a33.938286 33.938286 0 1 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 34.011429-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m-349.403429 228.717714a33.938286 33.938286 0 0 1-33.938286-33.938285V520.411429a33.938286 33.938286 0 0 1 67.949715 0v410.038857a33.938286 33.938286 0 0 1-34.011429 33.938285z m0-722.139428a60.269714 60.269714 0 1 0 0 120.539428 60.269714 60.269714 0 0 0 0-120.539428z" fill="#ffffff"/></g></svg>',
    });

    /* config */
    //ForkTV
			Lampa.SettingsApi.addParam({
				component: 'torrentDownloader',
				param: {
					name: 'td_qBittorent',
					type: 'trigger', //доступно select,input,trigger,title,static
					default: false
				},
				field: {
					name: 'qBittorent',
					description: ''
				},
				onChange: function (value) {
                    if (Lampa.Storage.field('td_qBittorent') !== true ) {
                        Lampa.Storage.set('td_qBittorent', true);
                        Lampa.Settings.update();
                    } else {
                        Lampa.Storage.set('td_qBittorent', false);
                        Lampa.Settings.update();
                    }
					
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'torrentDownloader',
				param: {
					name: 'qBittorent',
					type: 'static', //доступно select,input,trigger,title,static
					default: true
				},
				field: {
					name: 'qBittorent',
					description: 'Настройка сервера'
				},
				onRender: function (item) {
					if (Lampa.Storage.field('td_qBittorent') === true ) {
						item.show();
						$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
						//ForkTV.check_forktv(item, true);
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Settings.create('qBittorent');
						Lampa.Controller.enabled().controller.back = function(){
							Lampa.Settings.create('torrentDownloader');
						}
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'qBittorent',
				param: {
					name: 'qBittorent_url',
					type: 'static' //доступно select,input,trigger,title,static
				},
				field: {
					name:'ForkTV.url',
					description: Lampa.Lang.translate('filmix_nodevice')
				},
				onRender: function (item) {
					$('.settings-param__name', item).before('<div class="settings-param__status"></div>');
					//ForkTV.check_forktv(item);
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'qBittorent',
				param: {
					name: 'qBittorent_add',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Storage.get('qBittorent_cat') ? Lampa.Lang.translate('title_fork_edit_cats') : Lampa.Lang.translate('title_fork_add_cats'),
					description: ''
				},
				onRender: function (item) {
					if (Lampa.Storage.get('qBittorent_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						//ForkTV.check_forktv(item);
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'qBittorent',
				param: {
					name: 'qBittorent_clear',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_clear'),
					description: Lampa.Lang.translate('title_fork_clear_descr')
				},
				onRender: function (item) {
					if (Lampa.Storage.get('qBittorent_auth')) {
						item.show();
					} else item.hide();
					item.on('hover:enter', function () {
						Lampa.Storage.set('qBittorent_cat', '');
						Lampa.Noty.show(Lampa.Lang.translate('title_fork_clear_noty'));
					});
				}
			});
			Lampa.SettingsApi.addParam({
				component: 'qBittorent',
				param: {
					name: 'qBittorent_clearMac',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: Lampa.Lang.translate('title_fork_reload_code'),
					description: ' '
				},
				onRender: function (item) {
					item.on('hover:enter', function () {
						//ForkTV.updMac(item);
					});
				}
			});

}
/* Если всё готово */
if (window.appready) add();
else {
    Lampa.Listener.follow("app", function (e) {
        if (e.type == "ready") {
            add();
            //weatherWidget()
            /* ШАБЛОНЫ */
        }
    });
}
/* qBittorent */
Lampa.Listener.follow("torrent", function (e) {
    if (e.type === "onlong") {
        // Assuming 'e.element' contains the torrent data
        let addQbittorrentItem = false;
        let selectedTorrent = e.element;

        const originalSelectShow = Lampa.Select.show;

        // Override Select.show with custom functionality
        Lampa.Select.show = function (options) {
            // Add the qBittorrent menu item
            if (!addQbittorrentItem) {
                addQbittorrentItem = true;
                options.items.push({
                    title: "qBittorrent",
                    qb: true,
                    onSelect: function (a) {
                        if (a.qb) {
                            if (selectedTorrent) {
                                if (!selectedTorrent.MagnetUri) {
                                    Lampa.Parser.marnet(
                                        selectedTorrent,
                                        () => {
                                            console.log("Magnet loaded");
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
                                        `${Lampa.Storage.get("gwb_qBittorent")}/api/v2/auth/login?username=USERNAME&password=PASSWORD`,
                                        true
                                    );
                                    authXhr.onreadystatechange = function () {
                                        if (authXhr.readyState === 4) {
                                            // Add torrent request
                                            var addXhr = new XMLHttpRequest();
                                            addXhr.open(
                                                "POST",
                                                `${Lampa.Storage.get("gwb_qBittorent")}/api/v2/torrents/add`,
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
                                                        `${Lampa.Storage.get("gwb_qBittorent")}/api/v2/torrents/info?sort=added_on&reverse=true`,
                                                        true
                                                    );
                                                    listXhr.onreadystatechange = function () {
                                                        if (listXhr.readyState === 4) {
                                                            var torrents = JSON.parse(listXhr.responseText);
                                                            var lastAddedTorrent = torrents[0].hash; // Assuming the first one is the last added

                                                            // Set first/last piece priority
                                                            var firstXhr = new XMLHttpRequest();
                                                            firstXhr.open(
                                                                "GET",
                                                                `${Lampa.Storage.get("gwb_qBittorent")}/api/v2/torrents/toggleFirstLastPiecePrio?hashes=${lastAddedTorrent}`,
                                                                true
                                                            );
                                                            firstXhr.onreadystatechange = function () {
                                                                if (firstXhr.readyState === 4) {
                                                                    // Toggle sequential download
                                                                    var toggleXhr = new XMLHttpRequest();
                                                                    toggleXhr.open(
                                                                        "GET",
                                                                        `${Lampa.Storage.get("gwb_qBittorent")}/api/v2/torrents/toggleSequentialDownload?hashes=${lastAddedTorrent}`,
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
                                                "urls=" +
                                                encodeURIComponent(selectedTorrent.MagnetUri);
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
                                alert("Magnet link not found");
                            }
                        }
                    },
                });
            }
            originalSelectShow.call(this, options);
        };
    }
});