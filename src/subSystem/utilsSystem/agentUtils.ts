/**
 * 获取用户浏览器类型
 * @todo 优化代码
 * @returns sgssapp / wechat / weibo / uc / sogou / xiaomi / baidu / 360 / 2345 / edge / ie11 / ie / firefox / safari / QQbrowser / QQ / chrome / opera / other
 */
function browser() {
    let u = navigator.userAgent;
    let bws = [{
        name: 'sgssapp',
        it: /sogousearch/i.test(u)
    }, {
        name: 'wechat',
        it: /MicroMessenger/i.test(u)
    }, {
        name: 'weibo',
        it: !!u.match(/Weibo/i)
    }, {
        name: 'uc',
        it: !!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1
    }, {
        name: 'sogou',
        it: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1
    }, {
        name: 'xiaomi',
        it: u.indexOf('MiuiBrowser') > -1
    }, {
        name: 'baidu',
        it: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1
    }, {
        name: '360',
        it: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1
    }, {
        name: '2345',
        it: u.indexOf('2345Explorer') > -1
    }, {
        name: 'edge',
        it: u.indexOf('Edg') > -1
    }, {
        name: 'ie11',
        it: u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1
    }, {
        name: 'ie',
        it: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1
    }, {
        name: 'firefox',
        it: u.indexOf('Firefox') > -1
    }, {
        name: 'safari',
        it: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1
    }, {
        name: 'QQbrowser',
        it: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1
    }, {
        name: 'QQ',
        it: u.indexOf('QQ') > -1
    }, {
        name: 'chrome',
        it: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1
    }, {
        name: 'opera',
        it: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1
    }]
    for (var i = 0; i < bws.length; i++) {
        if (bws[i].it) {
            return bws[i].name;
        }
    }
    return 'other';
};

/**
 * 获取用户操作系统类型
 * @link https://www.jianshu.com/p/f3a645939263
 * @todo 待测试；去除Ubuntu，添加linux；!!？
 * @returns Win2000 / WinXP / Win2003 / WinVista / Win7 / Win10 / MacOS / iOS / Android / Ubuntu / other
 */
function OS() {
    let u = navigator.userAgent;
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
        if (u.indexOf("Windows NT 5.0") > -1 || u.indexOf("Windows 2000") > -1) {
            return "Win2000";
        }
        if (u.indexOf("Windows NT 5.1") > -1 || u.indexOf("Windows XP") > -1) {
            return "WinXP";
        }
        if (u.indexOf("Windows NT 5.2") > -1 || u.indexOf("Windows 2003") > -1) {
            return "Win2003";
        }
        if (u.indexOf("Windows NT 6.0") > -1 || u.indexOf("Windows Vista") > -1) {
            return "WinVista";
        }
        if (u.indexOf("Windows NT 6.1") > -1 || u.indexOf("Windows 7") > -1) {
            return "Win7";
        }
        if (u.indexOf("Windows NT 10") > -1 || u.indexOf("Windows 10") > -1) {
            return "Win10";
        }
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        return "MacOS";
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
        return "iOS";
    } else if (u.match(/android/i)) {
        return "Android";
    } else if (u.match(/Ubuntu/i)) {
        return "Ubuntu";
    } else {
        return "other";
    }
};

/**
 * 获取客户端类型（手机/平板/电脑）
 * @returns Mobile | TabletPC | PC
 */
function agent() {
    let os = function() {
        let ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };	
    }();

    if (os.isAndroid || os.isPhone) {  // 手机
        return "Mobile";
    } else if (os.isTablet) {  // 平板
        return "TabletPC";
    } else if (os.isPc) {  // pc
        return "PC";
    }
}

/**
 * 获取屏幕分辨率
 * @returns ScreenResolution
 */
type ScreenResolution = {
    width: number,
    height: number
}
function screenResolution(): ScreenResolution {
    return {
        width: window.screen.width,
        height: window.screen.height
    }
}

export { browser, OS, agent, screenResolution };