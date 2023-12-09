function QB() {
  Lampa.Listener.follow("torrent", function (e) {
    if (e.type === "onlong") {
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
  })
}

export default QB