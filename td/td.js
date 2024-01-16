(function () {
  'use strict';

  function qBittorrentClient(selectedTorrent) {
    if (!selectedTorrent) {
      return;
    }
    var protocol = Lampa.Storage.get("qBittorentProtocol") || "http://";
    var url = Lampa.Storage.get("qBittorentUrl");
    //const port = Lampa.Storage.get("qBittorentPort");
    var user = Lampa.Storage.get("qBittorentUser");
    var pass = Lampa.Storage.get("qBittorentPass");
    var sd = Lampa.Storage.get("qBittorentSequentialDownload");
    var flpp = Lampa.Storage.get("qBittorentfirstLastPiecePrio");

    // Authentication request
    var authXhr = new XMLHttpRequest();
    authXhr.open("POST", "".concat(protocol).concat(url, "/api/v2/auth/login?username=").concat(user, "&password=").concat(pass), true);
    authXhr.onreadystatechange = function () {
      if (authXhr.readyState === 4) {
        if (authXhr.status !== 200) {
          Lampa.Noty.show(Lampa.Lang.translate('tdAuthError'));
          return;
        }

        // Add torrent request
        var addXhr = new XMLHttpRequest();
        addXhr.open("POST", "".concat(protocol).concat(url, "/api/v2/torrents/add"), true);
        addXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        addXhr.onreadystatechange = function () {
          if (addXhr.readyState === 4) {
            if (addXhr.status !== 200) {
              console.log("TD", addXhr);
              Lampa.Noty.show(Lampa.Lang.translate('tdAddError'));
              return;
            }
            if (addXhr.response === "Fails.") {
              console.log("TD", addXhr);
              Lampa.Noty.show(Lampa.Lang.translate('tdExist'));
              return;
            }
            console.log("TD", addXhr.status);
            Lampa.Noty.show(Lampa.Lang.translate('tdAdded'));
          }
        };

        //const data = "urls=" + encodeURIComponent(selectedTorrent);
        var categoryDesc = selectedTorrent.CategoryDesc;
        var categoryParam = categoryDesc ? Lampa.Storage.get("qBittorent".concat(categoryDesc)) : '';
        var data = "urls=".concat(encodeURIComponent(selectedTorrent.MagnetUri), "&sequentialDownload=").concat(sd ? "true" : "false", "&firstLastPiecePrio=").concat(flpp ? "true" : "false", "&category=").concat(categoryParam);
        addXhr.send(data);
      }
    };
    authXhr.send();
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }
  function getStatus$2() {
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
    statusXhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", "/api/v2/auth/login?username=").concat(Lampa.Storage.get("qBittorentUser") || "1", "&password=").concat(Lampa.Storage.get("qBittorentPass") || "1"));
    statusXhr.send();
  }
  function qPanels$2() {
    var protocol = Lampa.Storage.get("qBittorentProtocol") || "http://";
    var url = Lampa.Storage.get("qBittorentUrl");
    var user = Lampa.Storage.get("qBittorentUser");
    var pass = Lampa.Storage.get("qBittorentPass");
    function action(action, item) {
      var authXhr = new XMLHttpRequest();
      authXhr.open("POST", "".concat(protocol).concat(url, "/api/v2/auth/login?username=").concat(user, "&password=").concat(pass), true);
      authXhr.onreadystatechange = function () {
        if (authXhr.readyState === 4) {
          if (authXhr.status !== 200) {
            console.log("TD", authXhr);
            Lampa.Noty.show(Lampa.Lang.translate('tdAuthError'));
            return;
          }
          if (authXhr.status === 200) {
            var data = "hashes=".concat(item.hash);
            var _xhr = new XMLHttpRequest();
            _xhr.withCredentials = false;
            _xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4 && this.status === 200) {
                console.log("TD", this.responseText);
                Lampa.Noty.show(Lampa.Lang.translate('tdAction') + item.name + " " + action);
              } else {
                console.log("TD", this);
                Lampa.Noty.show(Lampa.Lang.translate('tdError') + this.status);
              }
            });
            _xhr.open("POST", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", "/api/v2/torrents/").concat(action, "?hashes=").concat(item.hash));
            _xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            _xhr.send(data);
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
      //const headerCells = ["Название", "Состояние", "Прогресс", "Размер", "Скачано", "Отдано"];
      var headerCells = [Lampa.Lang.translate('tdPanelName'), Lampa.Lang.translate('tdPanelAction'), Lampa.Lang.translate('tdPanelProgress'), Lampa.Lang.translate('tdPanelSize'), Lampa.Lang.translate('tdPanelDownloaded'), Lampa.Lang.translate('tdPanelUploaded')];
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
          nameCell.id = "tName";
          nameCell.textContent = item.name;
          var stateCell = row.insertCell();
          if (item.state === "pausedDL") {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate('tdPanelPaused');
            stateCell.on("hover:enter", function () {
              action("resume", item);
            });
          } else if (item.state === "downloading") {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate('tdPanelDownloading');
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
        emptyCell.textContent = Lampa.Lang.translate('tdPanelDataError');
      }
      var footer = document.createElement("div");
      footer.classList.add("simple-button", "selector", "tdReload");
      footer.textContent = Lampa.Lang.translate('tdPanelReload');
      footer.on("hover:enter", function () {
        //TODO: Ребут без лампы
        Lampa.Activity.replace({
          url: "",
          title: "Torrent downloader",
          component: "td",
          page: 1
        });
        Lampa.Noty.show(Lampa.Lang.translate('tdPanelReloaded'));
      });
      // Вставить созданную таблицу в родительский элемент
      if ($("#tdStatus").children().length > 0) {
        $("#tdStatus").empty();
      }
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
      error.innerHTML = "<div id='Error'><h2>".concat(Lampa.Lang.translate('tdPanelDataError'), "</h2></div>");
      tdPanel.appendChild(error);
    }
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        return tabels(JSON.parse(this.responseText));
      } else if (this.readyState === 4 && this.status !== 200) {
        return error();
      }
    });
    xhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", "/api/v2/torrents/info?limit=10"));
    //xhr.open("GET", "".concat(Lampa.Storage.get("qBittorentProtocol") || "http://").concat(Lampa.Storage.get("qBittorentUrl") || "127.0.0.1", ":").concat(parseInt(Lampa.Storage.get("qBittorentPort") || "9999"), "/api/v2/torrents/info?limit=10"));
    xhr.send();
  }
  var qBittorent = {
    qBittorrentClient: qBittorrentClient,
    getStatus: getStatus$2,
    qPanels: qPanels$2
  };

  function transmissionClient(selectedTorrent) {
    if (selectedTorrent && Lampa.Storage.get("transmissionKey")) {
      var data = JSON.stringify({
        method: "torrent-add",
        arguments: {
          paused: Lampa.Storage.get("transmissionAutostart"),
          filename: selectedTorrent.MagnetUri
        }
      });
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
          Lampa.Noty.show(Lampa.Lang.translate('tdAdded'));
          console.log("TD", this.responseText);
        } else if (addXhr.status !== 200) {
          console.log("TD", addXhr);
          Lampa.Noty.show(Lampa.Lang.translate('tdError') + addXhr.status);
        }
      });
      xhr.open("POST", "".concat(Lampa.Storage.get("transmissionKeenetic") === true ? "https://corsproxy.io/?" : "").concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
      xhr.setRequestHeader("X-Transmission-Session-Id", Lampa.Storage.get("transmissionKey"));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
      xhr.send(data);
    } else if (!Lampa.Storage.get("transmissionKey")) {
      Lampa.Noty.show(Lampa.Lang.translate('tdAuthError') + !Lampa.Storage.get("transmissionKey") + " ".concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    }
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }
  function getStatus$1() {
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
    xhr.open("POST", "".concat(Lampa.Storage.get("transmissionKeenetic") === true ? "https://corsproxy.io/?" : "").concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
    xhr.send();
  }
  function qPanels$1() {
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
          Lampa.Noty.show(Lampa.Lang.translate('tdAction') + item.name + " " + action);
        } else {
          console.log("TD", this.status.text);
          Lampa.Noty.show(Lampa.Lang.translate('tdError') + this.status);
        }
      });
      xhr.open("POST", "".concat(Lampa.Storage.get("transmissionKeenetic") === true ? "https://corsproxy.io/?" : "").concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
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
      //const headerCells = ["Название", "Состояние", "Прогресс", "Размер", "Скачано", "Отдано"];
      var headerCells = [Lampa.Lang.translate('tdPanelName'), Lampa.Lang.translate('tdPanelAction'), Lampa.Lang.translate('tdPanelProgress'), Lampa.Lang.translate('tdPanelSize'), Lampa.Lang.translate('tdPanelDownloaded'), Lampa.Lang.translate('tdPanelUploaded')];
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
          nameCell.id = "tName";
          nameCell.textContent = item.name;
          var stateCell = row.insertCell();
          if (item.status === 0) {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate('tdPanelPaused');
            stateCell.on("hover:enter", function () {
              action("torrent-start", item.id);
            });
          } else if (item.status === 4) {
            stateCell.classList.add("simple-button", "selector", "tdAction");
            stateCell.textContent = Lampa.Lang.translate('tdPanelDownloading');
            stateCell.on("hover:enter", function () {
              action("torrent-stop", item.id);
            });
          }
          var progressCell = row.insertCell();
          progressCell.id = "percent";
          progressCell.textContent = formatPercent(item.percentDone);
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
        emptyCell.textContent = Lampa.Lang.translate('tdPanelDataError');
      }
      var footer = document.createElement("div");
      footer.classList.add("simple-button", "selector", "tdReload");
      footer.textContent = Lampa.Lang.translate('tdPanelReload');
      footer.on("hover:enter", function () {
        //TODO: Ребут без лампы
        Lampa.Activity.replace({
          url: "",
          title: "Torrent downloader",
          component: "td",
          page: 1
        });
        Lampa.Noty.show(Lampa.Lang.translate('tdPanelReloaded'));
      });
      // Вставить созданную таблицу в родительский элемент
      if ($("#tdStatus").children().length > 0) {
        $("#tdStatus").empty();
      }
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
      error.innerHTML = "<div id='Error'><h2>".concat(Lampa.Lang.translate('tdPanelDataError'), "</h2></div>");
      tdPanel.appendChild(error);
    }

    /* Get data */
    var data = JSON.stringify({
      "method": "torrent-get",
      "arguments": {
        "fields": ["status", "totalSize", "percentDone", "name", "uploadedEver", "downloadedEver", "id"]
      }
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("TD", JSON.parse(this.responseText).arguments.torrents);
        return tabels(JSON.parse(this.responseText).arguments.torrents);
      } else if (this.readyState === 4 && this.status !== 200) {
        return error();
      }
    });
    xhr.open("POST", "".concat(Lampa.Storage.get("transmissionKeenetic") === true ? "https://corsproxy.io/?" : "").concat(Lampa.Storage.get("transmissionProtocol") || "http://").concat(Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001").concat(Lampa.Storage.get("transmissionPath") || "/transmission/rpc"));
    xhr.setRequestHeader("X-Transmission-Session-Id", Lampa.Storage.get("transmissionKey"));
    xhr.setRequestHeader("Authorization", "Basic ".concat(btoa(Lampa.Storage.get("transmissionUser") + ":" + Lampa.Storage.get("transmissionPass"))));
    xhr.send(data);
  }
  var transmission = {
    transmissionClient: transmissionClient,
    getStatus: getStatus$1,
    qPanels: qPanels$1
  };

  function aria2Client(selectedTorrent) {
    if (!selectedTorrent) {
      return;
    }
    // WARNING: For POST requests, body is set to null by browsers.
    var data = JSON.stringify({
      "jsonrpc": "2.0",
      "id": "qwer",
      "method": "aria2.addUri",
      "params": [[selectedTorrent.MagnetUri]]
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (xhr.status !== 200) {
          Lampa.Noty.show(Lampa.Lang.translate('tdAddError'));
          return;
        }
        Lampa.Noty.show(Lampa.Lang.translate('tdAdded'));
        console.log("TD", this);
      }
    });
    xhr.open("POST", "".concat(Lampa.Storage.get("aria2Protocol") || "http://").concat(Lampa.Storage.get("aria2Url") || "127.0.0.1:9001").concat(Lampa.Storage.get("aria2Path") || "/jsonrpc"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    setTimeout(function () {
      Lampa.Select.close();
    }, 10);
  }
  function qPanels() {
    function tabels(data) {
      // Function implementation
      response = data.response;
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
          nameCell.id = "tName";
          nameCell.textContent = item.bittorrent.info.name;
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
        Lampa.Noty.show(Lampa.Lang.translate('tdPanelReloaded'));
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
    // WARNING: For POST requests, body is set to null by browsers.
    var data = JSON.stringify({
      "jsonrpc": "2.0",
      "id": "qwer",
      "method": "aria2.tellWaiting",
      "params": [0, 10]
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log("TD", this.responseText);
        return tabels(JSON.parse(this.responseText));
      } else if (this.readyState === 4 && this.status != 200) {
        return error();
      }
    });
    xhr.open("POST", "".concat(Lampa.Storage.get("aria2Protocol") || "http://").concat(Lampa.Storage.get("aria2Url") || "127.0.0.1:9001").concat(Lampa.Storage.get("aria2Path") || "/jsonrpc"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }
  function getStatus() {
    var statusXhr = new XMLHttpRequest();
    statusXhr.withCredentials = false;
    var data = JSON.stringify({
      "jsonrpc": "2.0",
      "id": "qwer",
      "method": "aria2.getVersion"
    });
    statusXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          console.log("TD", "Status " + this.status);
          $('#aria2Status').removeClass('active error wait').addClass('active');
          $("#aria2StatusBtn").text(function (i, text) {
            return "🟢 " + text;
          });
        } else if (this.status === undefined) {
          console.log("TD", "Status - undefined");
          $('#aria2Status').removeClass('active error wait').addClass('error');
          $("#aria2StatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        } else {
          console.log("TD", "Status " + this.status);
          $('#aria2Status').removeClass('active error wait').addClass('error');
          $("#aria2StatusBtn").text(function (i, text) {
            return "🔴 " + text;
          });
        }
      }
    });
    statusXhr.open("POST", "".concat(Lampa.Storage.get("aria2Protocol") || "http://").concat(Lampa.Storage.get("aria2Url") || "127.0.0.1:9001").concat(Lampa.Storage.get("aria2Path") || "/jsonrpc"));
    statusXhr.setRequestHeader("Content-Type", "application/json");
    statusXhr.send(data);
  }
  var pAria2 = {
    aria2Client: aria2Client,
    qPanels: qPanels,
    getStatus: getStatus
  };

  function downloader() {
    function send2qBittorrent(selectedTorrent) {
      qBittorent.qBittorrentClient(selectedTorrent);
    }
    function send2aria2(selectedTorrent) {
      pAria2.aria2Client(selectedTorrent);
    }
    function send2transmission(selectedTorrent) {
      transmission.transmissionClient(selectedTorrent);
    }
    Lampa.Listener.follow('torrent', function (e) {
      if (e.type === 'onlong') {
        var selectedTorrent = e.element;
        var onSelectApp = function onSelectApp(a) {
          if (!selectedTorrent.MagnetUri) {
            Lampa.Parser.marnet(selectedTorrent, function () {
              a.send2app(selectedTorrent);
            }, function (error) {
              console.log('TD', "Error loading magnet:", error);
              console.log("TD", "Проверяем что нам отдает парсер", selectedTorrent);
              Lampa.Noty.show(Lampa.Lang.translate('tdMagnetError'), error);
            });
          } else {
            a.send2app(selectedTorrent);
          }
        };
        if (Lampa.Storage.field("tdClient") === 'qBittorent') {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
          e.menu.push({
            title: '<p id="qBittorentgetStatusBtn">qBittorrent</p>',
            send2app: send2qBittorrent,
            onSelect: onSelectApp
          });
        }
        if (Lampa.Storage.field("tdClient") === 'transmission') {
          typeof Lampa.Storage.get("transmissionUrl") !== 'undefined' && typeof Lampa.Storage.get("transmissionUser") !== 'undefined' && typeof Lampa.Storage.get("transmissionPass") !== 'undefined' && transmission.getStatus();
          e.menu.push({
            title: '<p id="transmissionStatusBtn">transmission</p>',
            send2app: send2transmission,
            onSelect: onSelectApp
          });
        }
        if (Lampa.Storage.field("tdClient") === 'aria2') {
          typeof Lampa.Storage.get("aria2Url") !== 'undefined' && pAria2.getStatus();
          e.menu.push({
            title: '<p id="aria2StatusBtn">aria2</p>',
            send2app: send2aria2,
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
    var last,
      scroll;
    var html = document.createElement("div");
    html.id = "tdPanel";
    this.create = function () {
      this.build();
      return this.render();
    };
    this.build = function () {
      var _this = this;
      scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      scroll.onEnd = function () {
        _this.next();
      };
      var tdPanel = html.appendChild(Lampa.Template.js("td_panel_page"));
      tdPanel.innerHTML = "<div id='tdStatus'></div>";
      html.find('.td_panel').append(scroll.render(true));
      scroll.minus(html.find('#tdPanel'));
      /*
      if (Lampa.Storage.field("td_qBittorent") === true && Lampa.Storage.field("td_transmission") === false && Lampa.Storage.field("td_aria2") === false) {
          qBittorent.qPanels();
      } else if (Lampa.Storage.field("td_transmission") === true && Lampa.Storage.field("td_qBittorent") === false  && Lampa.Storage.field("td_aria2") === false) {
          transmission.qPanels();
      } else if (Lampa.Storage.field("td_aria2") === true && Lampa.Storage.field("td_qBittorent") === false && Lampa.Storage.field("td_transmission") === false) {
           //pAria2.qPanels();
           tdPanel.innerHTML = "<div id='Error'><h2>We apologize, Aria2 is not supported yet :(</h2></div>";
      } else if (Lampa.Storage.field("td_transmission") === true && Lampa.Storage.field("td_qBittorent") === true && Lampa.Storage.field("td_aria2") === true) {
          tdPanel.innerHTML = `<div id='Error'><h2>Alert!</h2><br /><p class='more-clients'>${Lampa.Lang.translate('tdInfoDesc')}</p></div>`;
      }else {
          tdPanel.innerHTML = `<div id='Error'><h2>${Lampa.Lang.translate('tdPanelCOff')}</h2></div>`;
      } */
      var tdClient = Lampa.Storage.get('tdClient');
      var clients = {
        'qBittorent': qBittorent,
        'transmission': transmission,
        'aria2': pAria2
      };
      if (tdClient && clients[tdClient]) {
        clients[tdClient].qPanels();
      } else {
        tdPanel.innerHTML = "<div id='Error'><h2>".concat(Lampa.Lang.translate('tdPanelCOff'), "</h2></div>");
      }
      this.display();
      Lampa.Layer.update(html);
      this.activity.loader(false);
    };
    this.display = function () {
      scroll.clear();
      scroll.reset();
      Lampa.Layer.visible(scroll.render(true));
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
      if (scroll) scroll.destroy();
      html.remove();
    };
  }

  function setMenu() {
    //Создание пункта меню
    Lampa.SettingsApi.addComponent({
      component: "torrentDownloader",
      name: 'Torrent downloader',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"></path></svg>'
    });
    /* Menu */
    Lampa.Settings.listener.follow("open", function (e) {
      /* Client selector */
      if (e.name === "torrentDownloader") {
        if (Lampa.Settings.main().render().find('[data-component="tdSelect"]').length === 0) {
          Lampa.SettingsApi.addComponent({
            component: "tdSelect",
            name: "tdSelect"
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="tdSelect"]').addClass("hide");
      }
      /* Legact */
      if (e.name === "main") {
        if (Lampa.Settings.main().render().find('[data-component="qBittorent"]').length === 0) {
          Lampa.SettingsApi.addComponent({
            component: "qBittorent",
            name: Lampa.Lang.translate('qBittorent')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="qBittorent"]').addClass("hide");
      }
      if (e.name === "qBittorent") {
        if (Lampa.Settings.main().render().find('[data-component="qBittorentTweak"]').length === 0) {
          Lampa.SettingsApi.addComponent({
            component: "qBittorentTweak",
            name: Lampa.Lang.translate('tweak')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="qBittorentTweak"]').addClass("hide");
      }
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="transmission"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "transmission",
            name: Lampa.Lang.translate('transmission')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="transmission"]').addClass("hide");
      }
      if (e.name == "transmission") {
        if (Lampa.Settings.main().render().find('[data-component="transmissionTweak"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "transmissionTweak",
            name: Lampa.Lang.translate('tweak')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="transmissionTweak"]').addClass("hide");
      }
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="aria2"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "aria2",
            name: Lampa.Lang.translate('aria2')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="aria2"]').addClass("hide");
      }
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
      if (e.name == "main") {
        if (Lampa.Settings.main().render().find('[data-component="tdInfo"]').length == 0) {
          Lampa.SettingsApi.addComponent({
            component: "tdInfo",
            name: Lampa.Lang.translate('tdInfo')
          });
        }
        Lampa.Settings.main().update();
        Lampa.Settings.main().render().find('[data-component="tdInfo"]').addClass("hide");
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
    var PLUGIN_COMPONENT = "tdInfo";
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdDependencies",
        type: PARAM_TYPE.TITLE,
        "default": true
      },
      field: {
        name: "<p style=\"color:".concat(Lampa.Storage.get("parser_use") === true ? "green" : "red", "\">").concat(Lampa.Lang.translate('tdDependencies'), "</p>"),
        description: Lampa.Lang.translate('tdDependenciesDesc')
      }
    });
    /* Selector */
    Lampa.SettingsApi.addParam({
      component: 'torrentDownloader',
      param: {
        name: 'tdSelect',
        type: 'select',
        "default": 'no_client',
        values: {
          no_client: 'None',
          qBittorent: Lampa.Lang.translate('qBittorent'),
          transmission: Lampa.Lang.translate('transmission'),
          aria2: Lampa.Lang.translate('aria2')
        }
      },
      field: {
        name: Lampa.Lang.translate('tdSelect')
      },
      onChange: function onChange(value) {
        console.log("TDDev", value);
        Lampa.Storage.set('tdClient', value);
        Lampa.Settings.update();
      }
    });
    /* Synalogy */
    //synalogy.config();
    /* qBittorent */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "qBittorent",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('qBittorent'),
        description: Lampa.Lang.translate('tdConfig')
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("tdClient") === "qBittorent") {
          typeof Lampa.Storage.get("qBittorentUrl") !== 'undefined' && typeof Lampa.Storage.get("qBittorentUser") !== 'undefined' && typeof Lampa.Storage.get("qBittorentPass") !== 'undefined' && qBittorent.getStatus();
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
        name: Lampa.Lang.translate('tdConfig')
        //description: `Контроль адреса - ${Lampa.Storage.get("qBittorentProtocol") || "http://"}${Lampa.Storage.get("qBittorentUrl") || "127.0.0.1:9090"}`,
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
        name: Lampa.Lang.translate('clientSSL'),
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
        name: Lampa.Lang.translate('clientAddress')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentUrl", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorent",
      param: {
        name: "qBittorentUser",
        type: "input",
        //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: Lampa.Lang.translate('clientUser')
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
        name: Lampa.Lang.translate('clientPassword')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentPass", item);
        Lampa.Settings.update();
      }
    });
    /* Try add sub menu */
    Lampa.SettingsApi.addParam({
      component: 'qBittorent',
      param: {
        type: 'button',
        name: "qBittorentTweak"
      },
      field: {
        name: Lampa.Lang.translate('tweak')
      },
      onRender: function onRender(item) {
        item.show();
        var paramNameElement = $(".settings-param__name", item);
        paramNameElement.before('<div class="settings-param__status"></div>');
        item.on("hover:enter", function () {
          Lampa.Settings.create("qBittorentTweak");
          var enabledController = Lampa.Controller.enabled();
          enabledController.controller.back = function () {
            Lampa.Settings.create("qBittorent");
          };
        });
      }
    });
    /* End */
    Lampa.SettingsApi.addParam({
      component: "qBittorentTweak",
      param: {
        name: "qBittorentSequentialDownload",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: Lampa.Lang.translate('qBittorentSD'),
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("qBittorentSequentialDownload", true);else Lampa.Storage.set("qBittorentSequentialDownload", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorentTweak",
      param: {
        name: "qBittorentfirstLastPiecePrio",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: Lampa.Lang.translate('qBittorentPDFLP'),
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("qBittorentfirstLastPiecePrio", true);else Lampa.Storage.set("qBittorentfirstLastPiecePrio", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorentTweak",
      param: {
        name: "qBittorentMovies",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: Lampa.Lang.translate('qBittorentCM')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentMovies", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "qBittorentTweak",
      param: {
        name: "qBittorentTV",
        type: "input",
        //доступно select,input,trigger,title,static
        //values: `${Lampa.Storage.get("qBittorentPass")}`,
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: Lampa.Lang.translate('qBittorentCS')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("qBittorentTV", item);
        Lampa.Settings.update();
      }
    });
    /* Transmission */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "transmission",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('transmission'),
        description: Lampa.Lang.translate('tdConfig')
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("tdClient") === "transmission") {
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
        name: Lampa.Lang.translate('tdConfig')
        //description: `Контроль адреса - ${Lampa.Storage.get("transmissionProtocol") || "http://"}${Lampa.Storage.get("transmissionUrl") || "127.0.0.1:9001"}${Lampa.Storage.get("transmissionPath") || "/transmission/rpc"}`,
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
        name: Lampa.Lang.translate('clientSSL'),
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
        name: Lampa.Lang.translate('clientAddress')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionUrl", item);
        Lampa.Settings.update();
      }
    });
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
        name: Lampa.Lang.translate('clientUser')
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
        name: Lampa.Lang.translate('clientPassword')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPass", item);
        Lampa.Settings.update();
      }
    });
    /* Try add sub menu */
    Lampa.SettingsApi.addParam({
      component: 'transmission',
      param: {
        type: 'button',
        name: "transmissionTweak"
      },
      field: {
        name: Lampa.Lang.translate('tweak')
      },
      onRender: function onRender(item) {
        item.show();
        var paramNameElement = $(".settings-param__name", item);
        paramNameElement.before('<div class="settings-param__status"></div>');
        item.on("hover:enter", function () {
          Lampa.Settings.create("transmissionTweak");
          var enabledController = Lampa.Controller.enabled();
          enabledController.controller.back = function () {
            Lampa.Settings.create("transmission");
          };
        });
      }
    });
    /* End */
    Lampa.SettingsApi.addParam({
      component: "transmissionTweak",
      param: {
        name: "transmissionAutostart",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('transmissionAutostop'),
        description: Lampa.Lang.translate('transmissionAutostopDescription')
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionAutostart", true);else Lampa.Storage.set("transmissionAutostart", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmissionTweak",
      param: {
        name: "transmissionKeenetic",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: Lampa.Lang.translate('transmissionKeenetic'),
        description: Lampa.Lang.translate('transmissionKeeneticDescription')
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("transmissionKeenetic", true);else Lampa.Storage.set("transmissionKeenetic", false);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "transmissionTweak",
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
        name: Lampa.Lang.translate('transmissionRPCRoute'),
        description: Lampa.Lang.translate('transmissionRPCRouteDescription')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("transmissionPath", item);
        Lampa.Settings.update();
      }
    });

    /* Aria 2 */
    Lampa.SettingsApi.addParam({
      component: "torrentDownloader",
      param: {
        name: "aria2",
        type: "static",
        //доступно select,input,trigger,title,static
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('aria2'),
        description: Lampa.Lang.translate('tdConfig')
      },
      onRender: function onRender(item) {
        if (Lampa.Storage.field("tdClient") === "aria2") {
          typeof Lampa.Storage.get("aria2Url") !== 'undefined' && pAria2.getStatus();
          item.show();
          $(".settings-param__name", item).before('<div id="aria2Status" class="settings-param__status wait"></div>');
        } else item.hide();
        item.on("hover:enter", function () {
          Lampa.Settings.create("aria2");
          Lampa.Controller.enabled().controller.back = function () {
            Lampa.Settings.create("torrentDownloader");
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: "aria2",
      param: {
        name: "aria2Head",
        type: "static"
      },
      field: {
        name: Lampa.Lang.translate('tdConfig')
        //description: `Контроль адреса - ${Lampa.Storage.get("aria2Protocol") || "http://"}${Lampa.Storage.get("aria2Url") || "127.0.0.1:9001"}${Lampa.Storage.get("aria2Path") || "/rpc"}`,
      }
    });
    Lampa.SettingsApi.addParam({
      component: "aria2",
      param: {
        name: "aria2SSL",
        type: "trigger",
        //доступно select,input,trigger,title,static
        "default": false
      },
      field: {
        name: Lampa.Lang.translate('clientSSL'),
        description: ""
      },
      onChange: function onChange(value) {
        if (value == "true") Lampa.Storage.set("aria2Protocol", "https://");else Lampa.Storage.set("aria2Protocol", "http://");
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "aria2",
      param: {
        name: "aria2Url",
        type: "input",
        //доступно select,input,trigger,title,static
        placeholder: '',
        values: '',
        "default": ''
      },
      field: {
        name: Lampa.Lang.translate('clientAddress')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("aria2Url", item);
        Lampa.Settings.update();
      }
    });
    Lampa.SettingsApi.addParam({
      component: "aria2",
      param: {
        name: "aria2Path",
        type: "input",
        //доступно select,input,trigger,title,static
        placeholder: '/jsonrpc',
        values: '/jsonrpc',
        "default": '/jsonrpc'
      },
      field: {
        name: Lampa.Lang.translate('aria2RPCRoute'),
        description: Lampa.Lang.translate('aria2RPCRouteDescription')
      },
      onChange: function onChange(item) {
        Lampa.Storage.set("aria2Path", item);
        Lampa.Settings.update();
      }
    });
    /* Info block */
    Lampa.SettingsApi.addParam({
      component: COMPONENT_NAME,
      param: {
        name: "tdInfo",
        type: PARAM_TYPE.STATIC,
        "default": true
      },
      field: {
        name: Lampa.Lang.translate('tdInfo')
      },
      onRender: function onRender(item) {
        item.show();
        var paramNameElement = $(".settings-param__name", item);
        paramNameElement.before('<div class="settings-param__status"></div>');
        item.on("hover:enter", function () {
          Lampa.Settings.create("tdInfo");
          var enabledController = Lampa.Controller.enabled();
          enabledController.controller.back = function () {
            Lampa.Settings.create(COMPONENT_NAME);
          };
        });
      }
    });
    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<img src=\"https://cdn.glitch.global/d9956867-398e-4a85-9c42-31911adc9981/groupLTD.jpg?v=1702216657917\" alt=\"GroupLTD\" width=\"100%\" height=\"auto\">",
        description: Lampa.Lang.translate('tdInfoGr')
      }
    });
    Lampa.SettingsApi.addParam({
      component: PLUGIN_COMPONENT,
      param: {
        name: "group",
        type: "static"
      },
      field: {
        name: "<b>Info</b>",
        description: Lampa.Lang.translate('tdInfoDesc')
      }
    });
  }
  var Menu = {
    setMenu: setMenu
  };

  function value() {
    /* Panel */
    Lampa.Lang.add({
      /* Main */
      tdDependencies: {
        ru: "Парсер",
        en: "Parser",
        uk: "Парсер",
        zh: "解析器" // Chinese translation
      },
      tdDependenciesDesc: {
        ru: "Для корректной работы должен быть активирован парсер",
        en: "Parser must be activated to work correctly",
        uk: "Для коректної роботи має бути активований парсер",
        zh: "必须激活解析器才能正确运行" // Chinese translation
      },
      /* Panel */
      tdPanel: {
        ru: "Torrent Panel",
        en: "Torrent Panel",
        uk: "Torrent Panel",
        zh: "下载" // Chinese translation
      },
      tdPanelReload: {
        ru: "Перезагрузить Лампу",
        en: "Reload Lampa",
        uk: "Перезавантажити Лампу",
        zh: "重新加载Lampa" // Chinese translation
      },
      tdPanelMClient: {
        ru: "Включено 2 или больше торрент клиента, я пока не такой крутой! Выключи кого-то",
        en: "2 or more torrent clients enabled, I'm not that cool yet! Turn someone off",
        uk: "Увімкнено 2 або більше торрент-клієнтів, я поки що не такий крутий! Вимкни когось",
        zh: "您已启用2个或多个种子下载客户端，我还没那么酷！请关闭某个。" // Chinese translation
      },
      tdPanelCOff: {
        ru: "Торрент клиенты не подключены",
        en: "Torrent clients are not connected",
        uk: "Торрент клієнти не підключені",
        zh: "未连接种子客户端" // Chinese translation
      },
      tdPanelDataError: {
        ru: "Данные не найдены",
        en: "Data not found",
        uk: "Дані не знайдено",
        zh: "未找到数据" // Chinese translation
      },
      tdPanelName: {
        ru: "Название",
        en: "Name",
        uk: "Назва",
        zh: "名称" // Chinese translation
      },
      tdPanelAction: {
        ru: "Действие",
        en: "Action",
        uk: "Дія",
        zh: "操作" // Chinese translation
      },
      tdPanelProgress: {
        ru: "Прогресс",
        en: "Progress",
        uk: "Прогрес",
        zh: "进度" // Chinese translation
      },
      tdPanelSize: {
        ru: "Размер",
        en: "Size",
        uk: "Розмір",
        zh: "大小" // Chinese translation
      },
      tdPanelDownloaded: {
        ru: "Скачано",
        en: "Downloaded",
        uk: "Викачано",
        zh: "已下载" // Chinese translation
      },
      tdPanelUploaded: {
        ru: "Выгружено",
        en: "Uploaded",
        uk: "Вивантажено",
        zh: "已上传" // Chinese translation
      },
      /* Action */
      tdPanelPaused: {
        ru: "Восстановить",
        en: "Resume",
        uk: "Поновити",
        zh: "恢复" // Chinese translation
      },
      tdPanelDownloading: {
        ru: "Остановить",
        en: "Pause",
        uk: "Зупининти",
        zh: "暂停" // Chinese translation
      },
      /* Menu */
      tdName: {
        ru: "Torrent downloader",
        en: "Torrent downloader",
        uk: "Torrent downloader",
        zh: "种子下载器" // Chinese translation
      },
      tdSelect: {
        ru: "Выбор клиента",
        en: "Select client",
        uk: "Обраты клієнта",
        zh: "选择客户端" // Chinese translation
      },
      tdInfo: {
        ru: "О плагине",
        en: "About plugin",
        uk: "Про розширення",
        zh: "关于插件" // Chinese translation
      },
      tdInfoGr: {
        ru: "Группа плагина Torrent downloader",
        en: "Torrent downloader plugin group",
        uk: "Група плагіна Torrent downloader",
        zh: "种子下载插件电报组" // Chinese translation
      },
      tdInfoDesc: {
        ru: "Плагин служит для загрузки торрентов средствами Torrent клиентов. Вызывается через контекстное меню на выбранной раздаче<br>Обязательные зависимости - Активированный парсер для торрентов. Torrserver НЕ ТРЕБУЕТСЯ<br>Пожелания по клиентам принимаются в чате плагина",
        en: "The plugin is used to download torrents by means of Torrent clients.<br>Called through the context menu on the selected distribution<br>Required dependencies - Activated parser for torrents. Torrserver is NOT REQUIRED<br>Requests for clients are accepted in the plugin chat room",
        uk: "Плагін служить для завантаження торрентів до Torrent клієнтів.<br>Викликається через контекстне меню на обраній роздачі.<br>Обов'язкові залежності - Активований парсер для торрентів. Torrserver НЕ ПОТРІБЕН<br>Побажання щодо клієнтів приймаються в чаті плагіна",
        zh: "该插件用于通过Torrent客户端下载种子<br>通过所选内容的菜单调用<br>必备依赖项 - 激活的Torrent解析器。不需要 Torrserver<br>插件聊天室接受客户端请求" // Chinese translation
      },
      tweak: {
        ru: "Tweak",
        en: "Tweak",
        uk: "Tweak",
        zh: "高级设置" // Chinese translation
      },
      tdConfig: {
        ru: "Настройки клиента",
        en: "Client settings",
        uk: "Налаштування клієнта",
        zh: "客户端设置" // Chinese translation
      },
      /* qBittorent */
      qBittorent: {
        ru: "qBittorent",
        en: "qBittorent",
        uk: "qBittorent",
        zh: "qBittorent" // Chinese translation
      },
      qBittorentSD: {
        ru: "Последовательная загрузка",
        en: "Sequential Download",
        uk: "Послідовне завантаження",
        zh: "顺序下载" // Chinese translation
      },
      qBittorentPDFLP: {
        ru: "Приоритет загрузки первой и последней части",
        en: "Prioritize download first last piece",
        uk: "Пріоритетність завантаження першого останнього фрагмента",
        zh: "优先下载最后一块" // Chinese translation
      },
      qBittorentCM: {
        ru: "Категория для Фильмов",
        en: "Category for Movie",
        uk: "Категорія для Фільмів",
        zh: "电影分类名" // Chinese translation
      },
      qBittorentCS: {
        ru: "Категория для Сериалов",
        en: "Category for TVShow",
        uk: "Категорія для Серіалів",
        zh: "电视剧集分类名" // Chinese translation
      },
      /* Transmission */
      transmission: {
        ru: "Transmission",
        en: "Transmission",
        uk: "Transmission",
        zh: "Transmission" // Chinese translation
      },
      transmissionAutostop: {
        ru: "Автостоп",
        en: "Autostop",
        uk: "Автостоп",
        zh: "自动停止" // Chinese translation
      },
      transmissionAutostopDescription: {
        ru: "Все торренты добавляются на паузе",
        en: "All torrent will be add on pause",
        uk: "Всі торренти додаються на паузі",
        zh: "所有种子都将暂停添加" // Chinese translation
      },
      transmissionKeenetic: {
        ru: "Keenetic tweak",
        en: "Keenetic tweak",
        uk: "Keenetic tweak",
        zh: "Keenetic优化" // Chinese translation
      },
      transmissionKeeneticDescription: {
        ru: "Может помочь с подключением к Keenetic",
        en: "Can help with the Keenetic connection",
        uk: "Може допомогти з підключенням до Keenetic",
        zh: "可以帮助建立 Keenetic 连接" // Chinese translation
      },
      transmissionRPCRoute: {
        ru: "RPC Path",
        en: "RPC Path",
        uk: "RPC Path",
        zh: "RPC 路径" // Chinese translation
      },
      transmissionRPCRouteDescription: {
        ru: "Изменение пути API. Не трогать без необходимости",
        en: "Change api route. Do not change without need",
        uk: "Змінити маршрут API. Не чіпати без нагальної потреби",
        zh: "更改API路径。如无必要，请勿更改" // Chinese translation
      },
      /* Arai2 */
      aria2: {
        ru: "Aria2",
        en: "Aria2",
        uk: "Aria2",
        zh: "Aria2" // Chinese translation
      },
      aria2RPCRoute: {
        ru: "RPC Path",
        en: "RPC Path",
        uk: "RPC Path",
        zh: "RPC 路径" // Chinese translation
      },
      aria2RPCRouteDescription: {
        ru: "Изменение пути API. Не трогать без необходимости",
        en: "Change api route. Do not change without need",
        uk: "Змінити маршрут API. Не чіпати без нагальної потреби",
        zh: "更改API路径。如无必要，请勿更改" // Chinese translation
      },
      /* Config */
      clientSSL: {
        ru: "Использовать https?",
        en: "Use https?",
        uk: "Вікористовувати https?",
        zh: "使用 https？" // Chinese translation
      },
      clientAddress: {
        ru: "Адрес и порт клиента",
        en: "Client address and port",
        uk: "Адреса та порт клієнту",
        zh: "客户端地址和端口" // Chinese translation
      },
      clientUser: {
        ru: "Имя пользователя",
        en: "Username",
        uk: "Ім'я користувача",
        zh: "用户名" // Chinese translation
      },
      clientPassword: {
        ru: "Пароль пользователя",
        en: "Password",
        uk: "Пароль користувача",
        zh: "密码" // Chinese translation
      },
      /* Notification */
      tdPanelReloaded: {
        ru: "Перезагрузить Лампу",
        en: "Reload Lampa",
        uk: "Перезавантажити Лампу",
        zh: "重新加载Lampa" // Chinese translation
      },
      tdMagnetError: {
        ru: "Ошибка с Magnet ссылкой",
        en: "Error loading magnet:",
        uk: "Помилка із Magnet посиланням",
        zh: "加载磁力时出错:" // Chinese translation
      },
      tdAdded: {
        ru: "Торрент загружается",
        en: "Torrent is being downloaded",
        uk: "Торрент завантажується",
        zh: "正在下载种子" // Chinese translation
      },
      tdAddError: {
        ru: "Ошибка добавления торрента",
        en: "Failed to add torrent",
        uk: "Помилка додавання торренту",
        zh: "添加种子失败" // Chinese translation
      },
      tdExist: {
        ru: "Торрент уже в списке",
        en: "Torrent already exists",
        uk: "Торрент вже у списку",
        zh: "种子已经存在" // Chinese translation
      },
      tdAction: {
        ru: "Торрент ",
        en: "Torrent ",
        uk: "Торрент ",
        zh: "种子 " // Chinese translation
      },
      tdAuthError: {
        ru: "Ошибка авторизации ",
        en: "Authentication failed ",
        uk: "Помилка авторизації ",
        zh: "验证失败 " // Chinese translation
      },
      tdError: {
        ru: "Ошибка ",
        en: "Error ",
        uk: "Помылка ",
        zh: "错误 " // Chinese translation
      }
      /* Notification Table */
    });
  }
  var Lang = {
    value: value
  };

  Lampa.Platform.tv();

  /* Add client */
  Client.downloader();

  /* init plugin */
  function startPlugin() {
    window.plugin_td_ready = true;
    /* Add Lang */
    Lang.value();
    var manifest = {
      type: "other",
      version: "0.0.1",
      name: "Torrent downloader",
      description: Lampa.Lang.translate("tdInfoDesc"),
      component: "td"
    };
    Lampa.Manifest.plugins = manifest;
    Lampa.Template.add("td_panel_page", "<div class='td_panel'></div>");
    Lampa.Template.add('tdStyle', "\n        <style>\n            @charset 'UTF-8';#error h2{width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.more-clients{text-align:center}div#tdStatus{margin:1% 5% 0 5%}#tdStatus table{width:100%;border-collapse:collapse}.simple-button.selector.tdAction{font-size:16px}#tdStatus table th,#tdStatus table td{padding:10px;text-align:left;border:1px solid #000}#tdStatus table td#tName{max-width:20%}#tdStatus table th{background-color:#fff;color:#000}.simple-button.selector.tdReload{margin:2% auto;width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.simple-button.selector.tdAction{margin:2% auto;width:90%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}#percent{position:relative;padding:0}#percent::before{content:'';position:absolute;top:0;left:0;height:100%;background-color:#4caf50;-webkit-transition:width .5s ease-in-out;-o-transition:width .5s ease-in-out;transition:width .5s ease-in-out}#percent::after{content:attr(data-percent);position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:14px;color:#fff}\n        </style>\n    ");
    function add() {
      Menu.setMenu();
      var button = $('<li class="menu__item selector">\n            <div class="menu__ico">\n                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 23.501953 4.125 C 12.485953 4.125 3.5019531 13.11 3.5019531 24.125 C 3.5019531 32.932677 9.2467538 40.435277 17.179688 43.091797 L 17.146484 42.996094 L 7 16 L 15 14 C 17.573 20.519 20.825516 32.721688 27.728516 30.929688 C 35.781516 28.948688 28.615 16.981172 27 12.076172 L 34 11 C 38.025862 19.563024 39.693648 25.901226 43.175781 27.089844 C 43.191423 27.095188 43.235077 27.103922 43.275391 27.113281 C 43.422576 26.137952 43.501953 25.140294 43.501953 24.125 C 43.501953 13.11 34.517953 4.125 23.501953 4.125 z M 34.904297 29.314453 C 34.250297 34.648453 28.811359 37.069578 21.943359 35.517578 L 26.316406 43.763672 L 26.392578 43.914062 C 33.176993 42.923925 38.872645 38.505764 41.660156 32.484375 C 41.603665 32.485465 41.546284 32.486418 41.529297 32.486328 C 38.928405 32.472567 36.607552 31.572967 34.904297 29.314453 z"></path></svg>\n            </div>\n            <div class="menu__text">'.concat(Lampa.Lang.translate("tdPanel"), "</div>\n        </li>"));
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
