(function () {
  'use strict';

  function qBittorrentClient(selectedTorrent) {
    if (!selectedTorrent) {
      return;
    }
    var protocol = Lampa.Storage.get("qBittorentProtocol") || "http://";
    var url = Lampa.Storage.get("qBittorentUrl");
    var port = Lampa.Storage.get("qBittorentPort");
    var user = Lampa.Storage.get("qBittorentUser");
    var pass = Lampa.Storage.get("qBittorentPass");

    // Authentication request
    var authXhr = new XMLHttpRequest();
    authXhr.open("POST", "".concat(protocol).concat(url, ":").concat(port, "/api/v2/auth/login?username=").concat(user, "&password=").concat(pass), true);
    authXhr.onreadystatechange = function () {
      if (authXhr.readyState === 4) {
        if (authXhr.status !== 200) {
          Lampa.Noty.show("Authentication failed");
          return;
        }

        // Add torrent request
        var addXhr = new XMLHttpRequest();
        addXhr.open("POST", "".concat(protocol).concat(url, ":").concat(port, "/api/v2/torrents/add"), true);
        addXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        addXhr.onreadystatechange = function () {
          if (addXhr.readyState === 4) {
            if (addXhr.status !== 200) {
              Lampa.Noty.show("Failed to add torrent");
              return;
            }
            if (addXhr.response === "Fails.") {
              Lampa.Noty.show("Torrent already exists");
              return;
            }
            Lampa.Noty.show("Torrent is being downloaded in qBittorrent");
          }
        };
        var data = "urls=" + encodeURIComponent(selectedTorrent);
        addXhr.send(data);
      }
    };
    authXhr.send();
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }


  function getStatus$1() {
    var statusXhr = new XMLHttpRequest();
    statusXhr.withCredentials = false;
    statusXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          console.log("TD", "Status " + this.status);
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('active');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🟢 " + text;
          });
        } else if (this.status === undefined) {
          console.log("TD", "Status - undefined");
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('error');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        } else {
          console.log("TD", "Status " + this.status);
          $('#qBittorentgetStatus').removeClass('active error wait').addClass('error');
          $("#qBittorentgetStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        }
      }
    });
    statusXhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(parseInt(Lampa.Storage.get("qBittorentPort") || "9999"), "/api/v2/auth/login?username=").concat(Lampa.Storage.get("qBittorentUser") || "1", "&password=").concat(Lampa.Storage.get("qBittorentPass") || "1"));
    statusXhr.send();
  }
  function qPanels$1() {
    var protocol = Lampa.Storage.get("qBittorentProtocol") || "http://";
    var url = Lampa.Storage.get("qBittorentUrl");
    var port = Lampa.Storage.get("qBittorentPort");
    var user = Lampa.Storage.get("qBittorentUser");
    var pass = Lampa.Storage.get("qBittorentPass");
    function action(action, item) {
      var authXhr = new XMLHttpRequest();
      authXhr.open("POST", "".concat(protocol).concat(url, ":").concat(port, "/api/v2/auth/login?username=").concat(user, "&password=").concat(pass), true);
      authXhr.onreadystatechange = function () {
        if (authXhr.readyState === 4) {
          if (authXhr.status !== 200) {
            Lampa.Noty.show("Authentication failed");
            return;
          }
          if (authXhr.status === 200) {
            var data = "hashes=".concat(item.hash);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                Lampa.Noty.show("Torrent " + item.name + " " + action);
              } else {
                console.log("TD", this.status.text);
                Lampa.Noty.show("Error " + this.status);
              }
            });
            xhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(parseInt(Lampa.Storage.get("qBittorentPort") || "9999"), "/api/v2/torrents/").concat(action, "?hashes=").concat(item.hash));
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
          }
        }
      };
      authXhr.send();
    }
    function tabels(response) {
      // Function implementation
      // Получить элемент, в который нужно вставить таблицу
      var parentElement = document.getElementById("tdStatus");
      // Создать таблицу
      var table = document.createElement("table");
      table.id = "tdStatus table";
      // Создать заголовок таблицы
      var headerRow = table.insertRow();
      var headerCells = ["Название", "Состояние", "Прогресс", "Размер", "Скачано", "Отдано"];
      headerCells.forEach(function (headerCell) {
        var th = document.createElement("th");
        th.id = "header";
        th.textContent = headerCell;
        headerRow.appendChild(th);
      });

      // Добавить строки с данными из переменной response
      if (response && response.length > 0) {
        response.forEach(function (item) {
          var row = table.insertRow();
          row.id = "td_panel row";
          // Создать ячейки для каждой строки
          var nameCell = row.insertCell();
          nameCell.textContent = item.name;
          var stateCell = row.insertCell();
          if (item.state === "pausedDL") {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate(item.state);
            stateCell.on("hover:enter", function () {
              action("resume", item);
            });
          } else if (item.state === "downloading") {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate(item.state);
            stateCell.on("hover:enter", function () {
              action("pause", item);
            });
          }
          var progressCell = row.insertCell();
          progressCell.id = "percent";
          progressCell.textContent = formatPercent(item.progress);
          var sizeCell = row.insertCell();
          sizeCell.textContent = formatBytes(item.size);
          var downloadedCell = row.insertCell();
          downloadedCell.textContent = formatBytes(item.downloaded);
          var uploadedCell = row.insertCell();
          uploadedCell.textContent = formatBytes(item.uploaded);
        });
      } else {
        // Если ответ пустой, добавить строку с сообщением
        var emptyRow = table.insertRow();
        var emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = headerCells.length;
        emptyCell.textContent = "Данные не найдены";
      }
      var footer = document.createElement("div");
      footer.classList.add("simple-button", "selector", "tdReload");
      footer.textContent = "Reload Lampa";
      footer.on("hover:enter", function () {
        location.reload();
        Lampa.Noty.show("Table reload");
      });
      // Вставить созданную таблицу в родительский элемент
      parentElement.appendChild(table);
      parentElement.appendChild(footer);
      function formatPercent(percent) {
        // Округлить процент до двух знаков после запятой
        percent = percent * 100;
        percent = Number(percent.toFixed(2));

        // Добавить процентный знак
        percent = percent + "%";
        return percent;
      }
      function formatBytes(bytes) {
        if (bytes >= 1073741824) {
          return (bytes / 1073741824).toFixed(2) + " GB";
        } else if (bytes >= 1048576) {
          return (bytes / 1048576).toFixed(2) + " MB";
        } else if (bytes >= 1024) {
          return (bytes / 1024).toFixed(2) + " KB";
        } else {
          return bytes + " B";
        }
      }
    }
    function error() {
      var tdPanel = document.getElementById("tdStatus");
      var error = document.createElement("div");
      error.innerHTML = "<div id='Error'><h2>Data not found</h2></div>";
      tdPanel.appendChild(error);
    }
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        //console.log(JSON.parse(this.responseText));
        return tabels(JSON.parse(this.responseText));
      } else if (this.readyState === 4 && this.status != 200) {
        return error();
      }
    });
    xhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(parseInt(Lampa.Storage.get("qBittorentPort") || "9999"), "/api/v2/torrents/info?limit=10"));
    xhr.send();
  }
  var qBittorent = {
    qBittorrentClient: qBittorrentClient,
    getStatus: getStatus$1,
    qPanels: qPanels$1
  };

  function transmissionClient(selectedTorrent) {
    if (selectedTorrent && Lampa.Storage.get("transmissionKey")) {
      var data = JSON.stringify({
        method: "torrent-add",
        arguments: {
          paused: Lampa.Storage.get("transmissionAutostart"),
          filename: selectedTorrent
        }
      });
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          Lampa.Noty.show("Torrent add success");
          console.log(this.responseText);
        } else if (addXhr.status != 200) {
          Lampa.Noty.show("Something wrong with add torrent " + addXhr.status);
        }
      });
      xhr.open("POST", "".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
      xhr.setRequestHeader("X-Transmission-Session-Id", Lampa.Storage.get("transmissionKey"));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
      xhr.send(data);
    } else if (!Lampa.Storage.get("transmissionKey")) {
      Lampa.Noty.show("Bad login " + !Lampa.Storage.get("transmissionKey") + " ".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    }
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }
  function getStatus() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log('TD', this.getAllResponseHeaders());
        console.log('TD', this.status);
        console.log('TD', this);
        if (this.status === 200 || this.status === 409) {
          Lampa.Storage.set("transmissionKey", xhr.getResponseHeader("X-Transmission-Session-Id"));
          $("#transmissionStatus").removeClass("active error wait").addClass("active");
          $("#transmissionStatusBtn").text(function (i, text) {
            return "🟢 " + text;
          });
        } else if (this.status === undefined) {
          $("#transmissionStatus").removeClass("active error wait").addClass("error");
          $("#transmissionStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        } else {
          $("#transmissionStatus").removeClass("active error wait").addClass("error");
          $("#transmissionStatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        }
      }
    });
    xhr.open("POST", "".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
    xhr.send();
  }
  function qPanels() {
    Lampa.Storage.get("transmissionProtocol") || "http://";
    Lampa.Storage.get("transmissionUrl");
    Lampa.Storage.get("transmissionPort");
    Lampa.Storage.get("transmissionUser");
    Lampa.Storage.get("transmissionPass");
    function action(action, item) {
      var data = JSON.stringify({
        "method": action,
        "arguments": {
          "ids": item
        }
      });
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log(this.responseText);
          Lampa.Noty.show("Torrent " + item.name + " " + action);
        } else {
          console.log("TD", this.status.text);
          Lampa.Noty.show("Error " + this.status);
        }
      });
      xhr.open("POST", "".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
      xhr.setRequestHeader("X-Transmission-Session-Id", Lampa.Storage.get("transmissionKey"));
      xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
      xhr.send(data);
    }
    function tabels(response) {
      // Function implementation
      // Получить элемент, в который нужно вставить таблицу
      var parentElement = document.getElementById("tdStatus");
      // Создать таблицу
      var table = document.createElement("table");
      table.id = "tdStatus table";
      // Создать заголовок таблицы
      var headerRow = table.insertRow();
      var headerCells = ["Название", "Состояние", "Прогресс", "Размер", "Скачано", "Отдано"];
      headerCells.forEach(function (headerCell) {
        var th = document.createElement("th");
        th.id = "header";
        th.textContent = headerCell;
        headerRow.appendChild(th);
      });

      // Добавить строки с данными из переменной response
      if (response && response.length > 0) {
        response.forEach(function (item) {
          var row = table.insertRow();
          row.id = "td_panel row";
          // Создать ячейки для каждой строки
          var nameCell = row.insertCell();
          nameCell.textContent = item.name;
          var stateCell = row.insertCell();
          if (item.status === 0) {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate("pausedDL");
            stateCell.on("hover:enter", function () {
              action("torrent-start", item.id);
            });
          } else if (item.status === 4) {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate("downloading");
            stateCell.on("hover:enter", function () {
              action("torrent-stop", item.id);
            });
          }
          var progressCell = row.insertCell();
          progressCell.id = "percent";
          progressCell.textContent = formatPercent(item.percentComplete);
          var sizeCell = row.insertCell();
          sizeCell.textContent = formatBytes(item.totalSize);
          var downloadedCell = row.insertCell();
          downloadedCell.textContent = formatBytes(item.downloadedEver);
          var uploadedCell = row.insertCell();
          uploadedCell.textContent = formatBytes(item.uploadedEver);
        });
      } else {
        // Если ответ пустой, добавить строку с сообщением
        var emptyRow = table.insertRow();
        var emptyCell = emptyRow.insertCell();
        emptyCell.colSpan = headerCells.length;
        emptyCell.textContent = "Данные не найдены";
      }
      var footer = document.createElement("div");
      footer.classList.add("simple-button", "selector", "tdReload");
      footer.textContent = "Reload Lampa";
      footer.on("hover:enter", function () {
        location.reload();
        Lampa.Noty.show("Table reload");
      });
      // Вставить созданную таблицу в родительский элемент
      parentElement.appendChild(table);
      parentElement.appendChild(footer);
      function formatPercent(percent) {
        // Округлить процент до двух знаков после запятой
        percent = percent * 100;
        percent = Number(percent.toFixed(2));

        // Добавить процентный знак
        percent = percent + "%";
        return percent;
      }
      function formatBytes(bytes) {
        if (bytes >= 1073741824) {
          return (bytes / 1073741824).toFixed(2) + " GB";
        } else if (bytes >= 1048576) {
          return (bytes / 1048576).toFixed(2) + " MB";
        } else if (bytes >= 1024) {
          return (bytes / 1024).toFixed(2) + " KB";
        } else {
          return bytes + " B";
        }
      }
    }
    function error() {
      var tdPanel = document.getElementById("tdStatus");
      var error = document.createElement("div");
      error.innerHTML = "<div id='Error'><h2>Data not found</h2></div>";
      tdPanel.appendChild(error);
    }

    /* Get data */
    var data = JSON.stringify({
      "method": "torrent-get",
      "arguments": {
        "fields": ["status", "totalSize", "percentComplete", "name", "uploadedEver", "downloadedEver", "id"]
      }
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        return tabels(JSON.parse(this.responseText).arguments.torrents);
      } else if (this.readyState === 4 && this.status != 200) {
        return error();
      }
    });
    xhr.open("POST", "".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    xhr.setRequestHeader("X-Transmission-Session-Id", Lampa.Storage.get("transmissionKey"));
    xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
    xhr.send(data);
  }
  var transmission = {
    transmissionClient: transmissionClient,
    getStatus: getStatus,
    qPanels: qPanels
  };

  function downloader() {
    function send2qBittorrent(magnetUri) {
      //Lampa.Noty.show("Send to qBittorrent start");
      qBittorent.qBittorrentClient(magnetUri);
    }
    function send2transmission(magnetUri) {
      //Lampa.Noty.show("Send to transmission start");
      transmission.transmissionClient(magnetUri);
    }
    Lampa.Listener.follow('torrent', function (e) {
      if (e.type === 'onlong') {
        var selectedTorrent = e.element;
        var onSelectApp = function onSelectApp(a) {
          if (!selectedTorrent.MagnetUri) {
            Lampa.Parser.marnet(selectedTorrent, function () {
              a.send2app(selectedTorrent.MagnetUri);
            }, function (error) {
              console.error('tmenu', "Error loading magnet:", error);
              Lampa.Noty.show("Error loading magnet:", error);
            });
          } else {
            a.send2app(selectedTorrent.MagnetUri);
          }
        };
        if (Lampa.Storage.field("td_qBittorent") === true) {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPort") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
          e.menu.push({
            title: '<p id="qBittorentgetStatusBtn">qBittorrent</p>',
            send2app: send2qBittorrent,
            onSelect: onSelectApp
          });
        }
        if (Lampa.Storage.field("td_transmission") === true) {
          typeof Lampa.Storage.get("transmissionUrl") !== 'undefined' && typeof Lampa.Storage.get("transmissionPort") !== 'undefined' && typeof Lampa.Storage.get("transmissionUser") !== 'undefined' && typeof Lampa.Storage.get("transmissionPass") !== 'undefined' && transmission.getStatus();
          e.menu.push({
            title: '<p id="transmissionStatusBtn">transmission</p>',
            send2app: send2transmission,
            onSelect: onSelectApp
          });
        }
      }
    });
  }
  var Client = {
    downloader: downloader
  };

  function Panels() {
    var last;
    var html = document.createElement("div");
    html.id = "tdPanel";
    this.create = function () {
      this.build();
      return this.render();
    };
    this.build = function () {
      var tdPanel = html.appendChild(Lampa.Template.js("td_panel_page"));
      tdPanel.innerHTML = "<div id='tdStatus'></div>";
      if (Lampa.Storage.field("td_qBittorent") === true && Lampa.Storage.field("td_transmission") === false) {
        qBittorent.qPanels();
      } else if (Lampa.Storage.field("td_transmission") === true && Lampa.Storage.field("td_qBittorent") === false) {
        transmission.qPanels();
      } else if (Lampa.Storage.field("td_transmission") === true && Lampa.Storage.field("td_qBittorent") === true) {
        tdPanel.innerHTML = "<div id='Error'><h2>Воу воу</h2><br /><p class='more-clients'>Включено 2 и больше торрент клиента, я пока не такой крутой! Выключи кого-то</p></div>";
      } else {
        tdPanel.innerHTML = "<div id='Error'><h2>Client not found</h2></div>";
      }
      this.display();
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

  function setMenu() {
    //Создание пункта меню
    Lampa.SettingsApi.addComponent({
      component: "torrentDownloader",
      name: "Torrent downloader",
      //Задаём название меню
      icon: '<svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M150 250L350 50V250H150Z" fill="white"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M350 50L150 250H350V50ZM400 50V300H356V435C356 446.67 360.636 457.861 368.887 466.113C377.139 474.364 388.33 479 400 479C412.195 477.526 423.422 471.614 431.537 462.393C439.652 453.171 444.089 441.284 444 429V300H513V560C500.798 557.619 489.218 552.75 478.981 545.696C468.744 538.642 460.07 529.554 453.5 519C439.162 528.333 422.669 533.832 405.598 534.97C388.527 536.108 371.45 532.847 356 525.5V650H286.5V300H150V750H650V50H400Z" fill="white"/> </svg>'
    });
    /* Menu */
    Lampa.Settings.listener.follow("open", function (e) {
      /* qBitt */
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="qBittorent"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "qBittorent",
            name: "qBittorent"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="qBittorent"]').addClass("hide");
      }
      /* Transmission */
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="transmission"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "transmission",
            name: "transmission"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="transmission"]').addClass("hide");
      }
      /* Synalogy */
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="synalogy"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "synalogy",
            name: "synalogy"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="synalogy"]').addClass("hide");
      }
      /* Info */
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="td_info"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "td_info",
            name: "td_info"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="td_info"]').addClass("hide");
      }
      /* Legace END */
    });
    var COMPONENT_NAME = "torrentDownloader";
    var PARAM_TYPE = {
      SELECT: "select",
      INPUT: "input",
      TRIGGER: "trigger",
      TITLE: "title",
      STATIC: "static"
    };
    var PLUGIN_COMPONENT = "td_info";
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdDependencies",
        type: PARAM_TYPE.TITLE,
        "default": true
      },
      field: {
        name: "\u041F\u0430\u0440\u0441\u0435\u0440 - ".concat(Lampa.Storage.get("parser_use") ? "🟢" : "🔴"),
        description: "Для корректной работы должен быть активирован парсер"
      }
    });
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdInfo",
        type: PARAM_TYPE.STATIC,
        "default": true
      },
      field: {
        name: "О плагине",
        description: "Информация"
      },
      onRender: function onRender(item) {
        item.show();
        var paramNameElement = $(".settings-param__name", item);
        paramNameElement.before('<div class="settings-param__status"></div>');
        item.on("hover:enter", function () {
          Lampa.Settings.create("td_info");
          var enabledController = Lampa.Controller.enabled();
          enabledController.controller.back = function () {
            Lampa.Settings.create(COMPONENT_NAME);
          };
        });
      }
    });
    /* Info block */

    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<img src=\"https://cdn.glitch.global/d9956867-398e-4a85-9c42-31911adc9981/groupLTD.jpg?v=1702216657917\" alt=\"GroupLTD\" width=\"100%\" height=\"auto\">",
        description: "Группа плагина Torrent downloader"
      }
    });
    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<b>Описание</b>",
        description: "\u041F\u043B\u0430\u0433\u0438\u043D \u0441\u043B\u0443\u0436\u0438\u0442 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430\u043C\u0438 Torrent \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432. \u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0435 \u043C\u0435\u043D\u044E \u043D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0440\u0430\u0437\u0434\u0430\u0447\u0435<br>\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 - \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043F\u0430\u0440\u0441\u0435\u0440 \u0434\u043B\u044F \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432. Torrserver \u041D\u0415 \u0422\u0420\u0415\u0411\u0423\u0415\u0422\u0421\u042F<br>\u041F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u043F\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u044E\u0442\u0441\u044F \u0432 \u0447\u0430\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430"
      }
    });
    /* Synalogy */
    //synalogy.config();
    /* qBittorent */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "td_qBittorent",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "qBittorent",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("td_qBittorent", true);else Lampa.Storage.set("td_qBittorent", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "qBittorent",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "qBittorent",
        description: "Настройка сервера"
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("td_qBittorent") === true) {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPort") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
          //qBittorent.getStatus();
          item.show();
          $(".settings-param__name", item).before('<div id="qBittorentgetStatus" class="settings-param__status wait"></div>');
        } else item.hide();
        item.on("hover:enter", function () {
          Lampa.Settings.create("qBittorent");
          Lampa.Controller.enabled().controller.back = function () {
            Lampa.Settings.create("torrentDownloader");
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentHead",
        type: "static"
      },
      field: {
        name: 'Настройка qBittorent',
        description: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0430\u0434\u0440\u0435\u0441\u0430 - ".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(Lampa.Storage.get("qBittorentPort") || "9090")
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentSSL",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Use HTTPS",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("qBittorentProtocol", "https://");else Lampa.Storage.set("qBittorentProtocol", "http://");
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentUrl",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentUrl") || ""}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Adress"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentUrl", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentPort",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPort")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Port"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentPort", parseInt(item.replace(/[^0-9]/g, "")));
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentUser",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentUser")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "User"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentUser", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentPass",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Password"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentPass", item);
        Lampa.Settings.update();
      }
    });

    /* Transmission */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "td_transmission",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Transmission",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("td_transmission", true);else Lampa.Storage.set("td_transmission", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "transmission",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "transmission",
        description: "Настройка сервера"
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("td_transmission") === true) {
          typeof Lampa.Storage.get("transmissionUrl") !== 'undefined' && typeof Lampa.Storage.get("transmissionUser") !== 'undefined' && typeof Lampa.Storage.get("transmissionPass") !== 'undefined' && transmission.getStatus();
          item.show();
          $(".settings-param__name", item).before('<div id="transmissionStatus" class="settings-param__status wait"></div>');
        } else item.hide();
        item.on("hover:enter", function () {
          Lampa.Settings.create("transmission");
          Lampa.Controller.enabled().controller.back = function () {
            Lampa.Settings.create("torrentDownloader");
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionHead",
        type: "static"
      },
      field: {
        name: 'Настройка Transmission',
        description: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0430\u0434\u0440\u0435\u0441\u0430 - ".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc")
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionSSL",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: "Use HTTPS",
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionProtocol", "https://");else Lampa.Storage.set("transmissionProtocol", "http://");
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionUrl",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUrl")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Adress:Port"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionUrl", item);
        Lampa.Settings.update();
      }
    });
    /*
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPort",
        type: "input", //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        default: ''
      },
      field: {
        name: `Port`,
      },
      onChange: function (item) {
        
        Lampa.Storage.set("transmissionPort", parseInt(item.replace(/[^0-9]/g, "")));
        Lampa.Settings.update();
     }
     ,
    });
    */
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionUser",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUser")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "User"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionUser", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPass",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: "Password"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPass", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionAutostart",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: "Autostop",
        description: "Все торренты добавляются на паузе"
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionAutostart", true);else Lampa.Storage.set("transmissionAutostart", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmission",
      param: {
        name: "transmissionPath",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("transmissionUrl")}`,
        placeholder: '/transmission/rpc',
        values: '/transmission/rpc',
        "default": '/transmission/rpc'
      },
      field: {
        name: "RPC Path",
        description: "Изменение пути API. Не трогать без необходимости"
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPath", item);
        Lampa.Settings.update();
      }
    });
  }
  var Menu = {
    setMenu: setMenu
  };

  Lampa.Platform.tv();

  /* Add client */
  Client.downloader();

  /* init plugin */
  function startPlugin() {
    window.plugin_td_ready = true;
    Lampa.Lang.add({
      td_panel: {
        ru: "TD Panel",
        en: "TD Panel",
        uk: "TD Panel"
      },
      pausedDL: {
        ru: "Resume",
        en: "Resume",
        uk: "Resume"
      },
      downloading: {
        ru: "Pause",
        en: "Pause",
        uk: "Pause"
      }
    });
    var manifest = {
      type: "other",
      version: "0.0.1",
      name: Lampa.Lang.translate("td_panel"),
      description: "",
      component: "td"
    };
    Lampa.Manifest.plugins = manifest;
    Lampa.Template.add("td_panel_page", "<div class='td_panel'></div>");
    Lampa.Template.add('tdStyle', "\n        <style>\n            @charset 'UTF-8';#error h2{width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.more-clients{text-align:center}#tdStatus table{width:100%;border-collapse:collapse;margin-top:1%;margin-left:1%}#tdStatus table th,#tdStatus table td{padding:10px;text-align:left;border:1px solid #000}#tdStatus table th{background-color:#fff;color:#000}.simple-button.selector.tdReload{margin:2% auto;width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.simple-button.selector.tdAction{margin:2% auto;width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}@media screen and (max-width:600px){#tdStatus table{width:100%}#tdStatus table th,#tdStatus table td{display:block;width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}}#percent{position:relative;padding:0}#percent::before{content:'';position:absolute;top:0;left:0;height:100%;background-color:#4caf50;-webkit-transition:width .5s ease-in-out;-o-transition:width .5s ease-in-out;transition:width .5s ease-in-out}#percent::after{content:attr(data-percent);position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:14px;color:#fff}\n        </style>\n    ");
    function add() {
      Menu.setMenu();
      var button = $('<li class="menu__item selector">\n            <div class="menu__ico">\n                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"></path></svg>\n            </div>\n            <div class="menu__text">'.concat(manifest.name, "</div>\n        </li>"));
      button.on("hover:enter", function () {
        Lampa.Activity.push({
          url: "",
          title: manifest.name,
          component: manifest.component,
          page: 1
        });
      });
      $(".menu .menu__list").eq(0).append(button);
      $('body').append(Lampa.Template.get('tdStyle', {}, true));
    }
    Lampa.Component.add(manifest.component, Panels);
    if (window.appready) add();else {
      Lampa.Listener.follow("app", function (e) {
        if (e.type == "ready") add();
      });
    }
  }
  if (!window.plugin_td_ready) startPlugin();

})();
