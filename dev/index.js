//Import actual bridge
import QB from './torrents/qb'

//Menu
function devTD() {
    "use strict";
    Lampa.Platform.tv();
    function add() {
        function updateT() {
            //var element = $(".view--torrent");
            if (Lampa.Storage.field("BUTTONS_fix") == true) {
                //if(element.length > 0) {
                $(".view--torrent", Lampa.Activity.active().activity.render())
                    .empty()
                    .append(
                        "<svg viewBox='0 0 847 847' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd'><circle cx='423' cy='423' r='398' fill='#3498db' class='fill-1fc255'></circle><path d='M642 423 467 322 292 221v404l175-101z' fill='#fff7f7' stroke='#fff7f7' stroke-width='42.33' stroke-linejoin='round' class='fill-fff7f7 stroke-fff7f7'></path></svg><span>Torent</span>"
                    );
                //}
            }
        } /* End updateT */
        //Создание пункта меню
        Lampa.SettingsApi.addComponent({
            component: "gwb_internal_torrent",
            name: "Internal Torrent", //Задаём название меню
            icon: '<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M527.579429 186.660571a119.954286 119.954286 0 1 1-67.949715 0V47.542857a33.938286 33.938286 0 0 1 67.949715 0v139.190857z m281.380571 604.598858a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 1 1-67.949714 0v-139.190857z m-698.441143 0a119.954286 119.954286 0 1 1 67.949714 0v139.190857a33.938286 33.938286 0 0 1-67.949714 0v-139.190857zM144.457143 13.531429c18.797714 0 34.011429 15.213714 34.011428 33.938285v410.038857a33.938286 33.938286 0 0 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 33.938286-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m698.514286-722.139428c18.724571 0 33.938286 15.213714 33.938285 33.938285v410.038857a33.938286 33.938286 0 1 1-67.949714 0V47.542857c0-18.724571 15.213714-33.938286 34.011429-33.938286z m0 722.139428a60.269714 60.269714 0 1 0 0-120.466286 60.269714 60.269714 0 0 0 0 120.466286z m-349.403429 228.717714a33.938286 33.938286 0 0 1-33.938286-33.938285V520.411429a33.938286 33.938286 0 0 1 67.949715 0v410.038857a33.938286 33.938286 0 0 1-34.011429 33.938285z m0-722.139428a60.269714 60.269714 0 1 0 0 120.539428 60.269714 60.269714 0 0 0 0-120.539428z" fill="#ffffff"/></g></svg>',
        });
        /* qBittorent v1 */
        Lampa.SettingsApi.addParam({
            component: "gwb_internal_torrent",
            param: {
                name: "qBittorent",
                type: "static", //доступно select,input,trigger,title,static
                placeholder: "Подключить qBittorent",
                values: "",
                default: "",
            },
            field: {
                name: Lampa.Lang.translate("title_parent_contr"),
                description: Lampa.Lang.translate("placeholder_password"),
            },
            onRender: function (item) {
                function pass() {
                    Lampa.Input.edit(
                        {
                            name: "qBittorent URL",
                            value: "" + Lampa.Storage.get("gwb_qBittorent") + "",
                            free: true,
                            nosave: true,
                        },
                        function (t) {
                            Lampa.Storage.set("gwb_qBittorent", t);
                            Lampa.Settings.update();
                        }
                    );
                }
                item.on("hover:enter", function () {
                    if (Lampa.Storage.get("gwb_qBittorent"))
                        Lampa.Input.edit(
                            {
                                value: Lampa.Storage.get("gwb_qBittorent"),
                                title: "Введите старый пароль",
                                free: true,
                                nosave: true,
                            },
                            function (t) {
                                if (t == Lampa.Storage.get("gwb_qBittorent")) pass();
                                else Lampa.Noty.show("Неверный пароль");
                            }
                        );
                    else pass();
                });
                if (Lampa.Storage.get("gwb_qBittorent"))
                    item.find(".settings-param__descr").text("Изменить пароль");
                else
                    item
                        .find(".settings-param__descr")
                        .text(Lampa.Lang.translate("placeholder_password"));
            },
            onChange: function (value) {
                if (value)
                    $("body").find(".settings-param__descr").text("Изменить пароль");
                else
                    $("body")
                        .find(".settings-param__descr")
                        .text(Lampa.Lang.translate("placeholder_password"));
            },
        });
        /* Sample */
        Lampa.SettingsApi.addParam({
            component: "gwb_internal_torrent",
            param: {
                name: "KeyboardSwitchOff",
                type: "select", //доступно select,input,trigger,title,static
                values: {
                    //значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
                    SwitchOff_None: "Не отключать",
                    SwitchOff_UA: "Українська",
                    SwitchOff_RU: "Русский",
                    SwitchOff_EN: "English",
                },
                default: "SwitchOff_None",
            },
            field: {
                name: "Неиспользуемая клавиатура", //Название подпункта меню
                description: "Выберите язык для отключения", //Комментарий к подпункту
            },
            onChange: function (value) {
                //Действия при изменении подпункта
                if (Lampa.Storage.field("KeyboardSwitchOff") == "SwitchOff_UA") {
                    Lampa.Storage.set("keyboard_default_lang", "default");
                    var elementUA = $(
                        '.selectbox-item.selector > div:contains("Українська")'
                    );
                    if (elementUA.length > 0) elementUA.parent("div").hide();
                }
                if (Lampa.Storage.field("KeyboardSwitchOff") == "SwitchOff_RU") {
                    Lampa.Storage.set("keyboard_default_lang", "uk");
                    var elementRU = $(
                        '.selectbox-item.selector > div:contains("Русский")'
                    );
                    if (elementRU.length > 0) elementRU.parent("div").hide();
                }
                if (
                    (Lampa.Storage.field("KeyboardSwitchOff") == "SwitchOff_EN") &
                    (Lampa.Storage.field("language") == "uk")
                ) {
                    Lampa.Storage.set("keyboard_default_lang", "uk");
                    var elementEN = $(
                        '.selectbox-item.selector > div:contains("English")'
                    );
                    if (elementEN.length > 0) elementEN.parent("div").hide();
                }
                if (
                    (Lampa.Storage.field("KeyboardSwitchOff") == "SwitchOff_EN") &
                    (Lampa.Storage.field("language") == "ru")
                ) {
                    Lampa.Storage.set("keyboard_default_lang", "default");
                    var elementEN = $(
                        '.selectbox-item.selector > div:contains("English")'
                    );
                    if (elementEN.length > 0) elementEN.parent("div").hide();
                }
            },
        });
        /*End Отключение неиспользуемой раскладки */
        /* qBittorent v2 */
        Lampa.SettingsApi.addParam({
            component: 'gwb_internal_torrent',
            param: {
                name: 'filmix_status',
                type: 'title', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: '<b style="color:#fff">' + Lampa.Lang.translate('title_status') + '</b>',
                description: ' '
            },
            onRender: function (item) {
                $('.settings-param__descr', item).before('<div class="settings-param__status"></div>');
                //Filmix.showStatus(item);
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'gwb_internal_torrent',
            param: {
                name: 'filmix_token',
                type: 'input', //доступно select,input,trigger,title,static
                values: '',
                placeholder: Lampa.Lang.translate('filmix_param_placeholder'),
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_param_add_title'),
                description: Lampa.Lang.translate('filmix_param_add_descr')
            },
            onChange: function (value) {
                if (value) {
                    Filmix.checkPro(value, true);
                    Filmix.token = value;
                } else {
                    Lampa.Storage.set("filmix_status", {});
                    Filmix.token = value;
                    Filmix.showStatus();
                }
            }
        });
        Lampa.SettingsApi.addParam({
            component: 'gwb_internal_torrent',
            param: {
                name: 'filmix_add',
                type: 'static', //доступно select,input,trigger,title,static
                default: ''
            },
            field: {
                name: Lampa.Lang.translate('filmix_params_add_device') + ' Filmix',
                description: ''
            },
            onRender: function (item) {
                item.on('hover:enter', function () {
                    Filmix.add_new();
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
            }
        });
    }
}
export default devTD