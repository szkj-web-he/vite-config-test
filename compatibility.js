/**
 * @file survey page unit
 * @date 2022-11-09
 * @author Cunming Liu
 * @lastModify  2022-11-09
 */
/**
 * 兼容性业务逻辑  依照 npx browserslist --mobile-to-desktop "cover 97%"获取的浏览器列表来做兼容
 */
/**
 * 获取IE浏览器版本
 */
module.exports = function () {
    var getIeVersion = function (lowerUserAgent) {
        var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
        var match = rMsie.exec(lowerUserAgent);
        if (!match) {
            return '';
        }
        return match === null || match === void 0 ? void 0 : match[2];
    };
    /**
     * 获取opera浏览器版本
     */
    var getOperaVersion = function (lowerUserAgent) {
        var _a, _b;
        try {
            if (window['opera']) {
                return (_a = lowerUserAgent.match(/opera.([\d.]+)/)) === null || _a === void 0
                    ? void 0
                    : _a[1];
            } else if (lowerUserAgent.indexOf('opr') > 0) {
                return (_b = lowerUserAgent.match(/opr\/([\d.]+)/)) === null || _b === void 0
                    ? void 0
                    : _b[1];
            }
        } catch (e) {
            return '';
        }
    };
    //主要浏览器，ie ,chrome, firefox,safari,
    /**
     * 获取浏览器类型以及版本
     */
    var getPCBrowserInfo = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var lowerUserAgent = window.navigator.userAgent.toLowerCase();
        var browserType = '';
        var browserVersion = '';
        var otherBrowser = false;
        // 浏览器类型-IE
        if (lowerUserAgent.indexOf('msie') > 0 || lowerUserAgent.indexOf('trident') > 0) {
            browserType = 'ie';
            browserVersion = getIeVersion(lowerUserAgent);
        }
        // 欧朋
        else if (
            (window === null || window === void 0 ? void 0 : window['opera']) ||
            lowerUserAgent.indexOf('opr') > 0
        ) {
            browserType = 'opera';
            browserVersion =
                (_a = getOperaVersion(lowerUserAgent)) !== null && _a !== void 0 ? _a : '';
        }
        //samsung
        else if (lowerUserAgent.indexOf('samsungbrowser') > 0) {
            browserType = 'samsung';
            browserVersion =
                (_c =
                    (_b = lowerUserAgent.match(/samsungbrowser\/([\d.]+)/)) === null ||
                    _b === void 0
                        ? void 0
                        : _b[1]) !== null && _c !== void 0
                    ? _c
                    : '';
        }
        // 火狐
        else if (lowerUserAgent.indexOf('firefox') > 0) {
            browserType = 'firefox';
            browserVersion =
                (_e =
                    (_d = lowerUserAgent.match(/firefox\/([\d.]+)/)) === null || _d === void 0
                        ? void 0
                        : _d[1]) !== null && _e !== void 0
                    ? _e
                    : '';
        }
        // edge
        else if (lowerUserAgent.indexOf('edge') > 0 || lowerUserAgent.indexOf('edg') > 0) {
            browserType = 'edge';
            browserVersion =
                (_g =
                    (_f = lowerUserAgent.match(/edge?\/([\d.]+)/)) === null || _f === void 0
                        ? void 0
                        : _f[1]) !== null && _g !== void 0
                    ? _g
                    : '';
        }
        // 谷歌,其它包含chrome内核的浏览器,没有兼容信息,无法判断当前项目是否兼容，通过判断其中chrome是否大于69版本
        else if (lowerUserAgent.indexOf('chrome') > 0) {
            browserType = 'chrome';
            browserVersion =
                (_j =
                    (_h = lowerUserAgent.match(/chrome\/([\d.]+)/)) === null || _h === void 0
                        ? void 0
                        : _h[1]) !== null && _j !== void 0
                    ? _j
                    : '';
        }
        // 苹果
        else if (lowerUserAgent.indexOf('safari') > 0) {
            browserType = 'safari';
            browserVersion =
                (_l =
                    (_k = lowerUserAgent.match(/version\/([\d.]+)/)) === null || _k === void 0
                        ? void 0
                        : _k[1]) !== null && _l !== void 0
                    ? _l
                    : '';
        }
        //其它类型的浏览器
        else {
            otherBrowser = true;
        }
        return {
            browserType: browserType,
            browserVersion: browserVersion,
            otherBrowser: otherBrowser,
        };
    };
    var getMobileBrowserInfo = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var lowerUserAgent = window.navigator.userAgent.toLowerCase();
        var browserType = '';
        var browserVersion = '';
        var otherBrowser = false;
        // UC
        if (lowerUserAgent.indexOf('ubrowser') > 0) {
            browserType = 'uc';
            browserVersion =
                (_b =
                    (_a = lowerUserAgent.match(/ubrowser\/([\d.]+)/)) === null || _a === void 0
                        ? void 0
                        : _a[1]) !== null && _b !== void 0
                    ? _b
                    : '';
        }
        // QQ
        else if (lowerUserAgent.indexOf('qqbrowser') > 0) {
            browserType = 'qq';
            browserVersion =
                (_d =
                    (_c = lowerUserAgent.match(/qqbrowser\/([\d.]+)/)) === null || _c === void 0
                        ? void 0
                        : _c[1]) !== null && _d !== void 0
                    ? _d
                    : '';
        }
        // 火狐
        else if (lowerUserAgent.indexOf('firefox') > 0) {
            browserType = 'firefox';
            browserVersion =
                (_f =
                    (_e = lowerUserAgent.match(/firefox\/([\d.]+)/)) === null || _e === void 0
                        ? void 0
                        : _e[1]) !== null && _f !== void 0
                    ? _f
                    : '';
        }
        // 谷歌,其它包含chrome内核的浏览器,没有兼容信息,无法判断当前项目是否兼容，通过判断其中chrome是否大于69版本
        else if (lowerUserAgent.indexOf('chrome') > 0) {
            browserType = 'chrome';
            browserVersion =
                (_h =
                    (_g = lowerUserAgent.match(/chrome\/([\d.]+)/)) === null || _g === void 0
                        ? void 0
                        : _g[1]) !== null && _h !== void 0
                    ? _h
                    : '';
        }
        // 苹果
        else if (lowerUserAgent.indexOf('safari') > 0) {
            browserType = 'safari';
            browserVersion =
                (_l =
                    (_k = lowerUserAgent.match(/version\/([\d.]+)/)) === null || _k === void 0
                        ? void 0
                        : _k[1]) !== null && _l !== void 0
                    ? _l
                    : '';
        }
        //其它类型的浏览器
        else {
            otherBrowser = true;
        }
        return {
            browserType: browserType,
            browserVersion: browserVersion,
            otherBrowser: otherBrowser,
        };
    };
    /**
     * 判断移动端的浏览器兼容性
     */
    var determineMobileBrowserCompatibility = function () {
        //在移动端中，在兼容的browserslist中，取最低版本。
        var mobileBrowsers = {
            // chrome: 107, //该chrome 69 表示支持chrome 69以上的浏览器以及包含chrome 69以上版本的内核浏览器。
            chrome: 69,
            firefox: 106,
            qq: 13.1,
            uc: 13.4,
            safari: 9.3,
        };
        var browser = getMobileBrowserInfo();
        var dotIndex = browser.browserVersion.indexOf('.');
        var formatVersion = browser.browserVersion.slice(0, dotIndex + 2);
        if (browser.otherBrowser) {
            return true;
        }
        if (
            mobileBrowsers[browser.browserType] &&
            formatVersion >= mobileBrowsers[browser.browserType]
        ) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 判断pc端的浏览器兼容性
     */
    var determinePCBrowsersCompatibility = function () {
        //在pc端中，在兼容的browserslist中，取比最低版本高一个版本。
        var pcBrowsers = {
            chrome: 69,
            edge: 105,
            firefox: 102,
            ie: 12, //在项目中ie浏览器均不兼容，取ie12，ie最大版本为11，表明ie均不兼容
            safari: 14,
            samsung: 7.2,
            opera: 90,
        };
        var browser = getPCBrowserInfo();
        var dotIndex = browser.browserVersion.indexOf('.');
        var formatVersion = browser.browserVersion.slice(0, dotIndex + 2);
        if (browser.otherBrowser) {
            return true;
        }
        if (pcBrowsers[browser.browserType] && formatVersion >= pcBrowsers[browser.browserType]) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 判断是否为移动端
     */
    var isMobileFn = function () {
        var flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
        );
        return flag;
    };
    /**
     * 判断浏览器的兼容性
     */
    var determineBrowsersCompatibility = function () {
        //首先判断是pc端还是移动端
        var isMobile = isMobileFn();
        //然后判断浏览器类型以及版本
        if (isMobile) {
            return determineMobileBrowserCompatibility();
        } else {
            return determinePCBrowsersCompatibility();
        }
    };
    /**
     * 获取默认浏览器默认语言
     */
    var getDefaultLanguage = function () {
        var language = navigator.language === 'zh-CN' ? 'cn' : 'en';
        return language;
    };
    /**
     * 获取dom元素进行赋值。
     */
    var setDomValue = function (className, language) {
        var _a;
        var dom = document.querySelector('.' + className);
        if (!dom) {
            return;
        }
        dom.textContent =
            (_a = domValues === null || domValues === void 0 ? void 0 : domValues[className]) ===
                null || _a === void 0
                ? void 0
                : _a[language];
    };
    /**
     * dom textContent 列表
     */
    var domValues = {
        compatibilityBox_title: {
            en: 'The browser version is too low.',
            cn: '浏览器版本过低',
        },
        compatibilityBox_description1: {
            en: 'Your current browser version is too low to open the questionnaire.',
            cn: '您当前使用的浏览器版本过低，无法打开问卷，',
        },
        compatibilityBox_description4: {
            en: 'Please copy the link to ',
            cn: '请您复制链接到',
        },
        compatibilityBox_description2: {
            en: 'another browser',
            cn: '其它浏览器',
        },
        compatibilityBox_description3: {
            en: 'to open the questionnaire.',
            cn: '打开',
        },
        compatibilityBox_button: {
            en: 'Copylink',
            cn: '复制链接',
        },
    };
    var template =
        '      <div class="compatibilityBox_container">\n                <div class="compatibilityBox_subContainer">\n                    <div class="compatibilityBox_icon">\n                        <svg\n                            width="43"\n                            height="42"\n                            viewBox="0 0 43 42"\n                            fill="none"\n                            xmlns="http://www.w3.org/2000/svg"\n                        >\n                            <path\n                                fill-rule="evenodd"\n                                clip-rule="evenodd"\n                                d="M21.5 42C33.098 42 42.5 32.598 42.5 21C42.5 9.40202 33.098 0 21.5 0C9.90202 0 0.5 9.40202 0.5 21C0.5 32.598 9.90202 42 21.5 42ZM17.6277 10.0354C17.5925 9.57802 17.9542 9.1875 18.4129 9.1875H24.5871C25.0458 9.1875 25.4075 9.57802 25.3723 10.0354L24.4434 22.1104C24.4119 22.5207 24.0697 22.8375 23.6582 22.8375H19.3418C18.9303 22.8375 18.5881 22.5207 18.5566 22.1104L17.6277 10.0354ZM25.4375 28.8749C25.4375 31.0496 23.6746 32.8124 21.5 32.8124C19.3254 32.8124 17.5625 31.0496 17.5625 28.8749C17.5625 26.7003 19.3254 24.9374 21.5 24.9374C23.6746 24.9374 25.4375 26.7003 25.4375 28.8749Z"\n                                fill="#FF8F0F"\n                            />\n                        </svg>\n                    </div>\n                    <h1 class="compatibilityBox_title"></h1>\n                    <div class="compatibilityBox_description">\n                        <span class="compatibilityBox_description1"> </span>\n                    </div>\n                    <div class="compatibilityBox_descriptionSecond">\n                        <span class="compatibilityBox_description3">\n                            <span class="compatibilityBox_description4"> </span>\n                            <span class="compatibilityBox_description2"> </span>\n                            <span class="compatibilityBox_description3"> </span>\n                        </span>\n                    </div>\n                    <div class="compatibilityBox_buttonContainer">\n                        <button class="compatibilityBox_button" />\n                    </div>\n                </div>\n            </div>';
    var style =
        '.compatibilityBox_icon {\n  font-size: 4.2rem;\n  color: #ff8f0f;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.compatibilityBox_title {\n  font: 500 2rem/2.4rem "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica", "Arial", "Calibri", "Segoe UI", "Ping Fang SC", "Microsoft Yahei";\n  letter-spacing: 0.015rem;\n  color: #212121;\n  text-align: center;\n  margin-top: 2.4rem;\n}\n\n.compatibilityBox_description {\n  color: #bdbdbd;\n  font: 400 1.4rem/2rem "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica", "Arial", "Calibri", "Segoe UI", "Ping Fang SC", "Microsoft Yahei";\n  letter-spacing: 0.025rem;\n  margin-top: 1.2rem;\n  text-align: center;\n}\n\n.compatibilityBox_descriptionSecond {\n  color: #bdbdbd;\n  font: 400 1.4rem/2rem "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica", "Arial", "Calibri", "Segoe UI", "Ping Fang SC", "Microsoft Yahei";\n  letter-spacing: 0.025rem;\n  text-align: center;\n}\n\n.compatibilityBox_description2 {\n  color: #4d4d4d;\n}\n\n.compatibilityBox_buttonContainer {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.compatibilityBox_button {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background-color: #22a6b3;\n  border-radius: 0.6rem;\n  width: 8.7rem;\n  height: 3.2rem;\n  margin-top: 3.2rem;\n  color: #ffffff;\n  border: none;\n  outline: none;\n}\n\n.compatibilityBox_buttonContainer > button:active {\n  text-indent: 0.2rem;\n}\n\n.compatibilityBox_container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  height: 100vh;\n}\n\n.compatibilityBox_subContainer {\n  padding: 0 4rem;\n}';
    var insertStyle = function () {
        var styleDom = document.createElement('style');
        if (styleDom) {
            styleDom.innerHTML = style;
        }
        document.head.appendChild(styleDom);
    };
    var insertTemplate = function () {
        var isCompatibility = determineBrowsersCompatibility();
        window.isView = isCompatibility;
        if (!isCompatibility) {
            var loadFn = function () {
                //获取语言
                var language = getDefaultLanguage();
                var root = document.getElementById('root');
                if (root) {
                    root.innerHTML = template;
                    //对dom元素进行赋值
                    for (var key in domValues) {
                        if (Object.hasOwnProperty.call(domValues, key)) {
                            setDomValue(key, language);
                        }
                    }
                }
            };
            document.addEventListener('DOMContentLoaded', loadFn, { once: true });
        }
    };
    var handlerCopy = function () {
        var copyFn = function () {
            var button = document.querySelector('.compatibilityBox_button');
            if (!button) {
                return;
            }
            button.addEventListener('click', function () {
                const input = document.createElement('input');
                document.body.appendChild(input);
                input.setAttribute('value', location.href);
                input.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    console.log('copy success');
                } else {
                    console.log('copy failed');
                }
                document.body.removeChild(input);
            });
        };
        document.addEventListener('DOMContentLoaded', copyFn, { once: true });
    };
    /**
     * main 判断是否兼容，不兼容则展示提示，否则不提示
     */
    //插入样式
    insertStyle();
    //插入模板
    insertTemplate();
    //监听用户事件
    handlerCopy();
};
