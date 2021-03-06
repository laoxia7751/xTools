/**
 * name:老夏开发工具库
 * version: 0.0.1
 * date: 2020-4-20
 */

//  缓存相关
/**
 * 本地缓存设置
 * @param {string} name 缓存名称
 * @param {*} data 缓存数据
 * @param {number} cacheTime 缓存时间(ms)
 */
export const setStorage = (name, data, cacheTime = '') => {
    if(!name) return;
    const storage = {
        createdTime: new Date().getTime(),
        cacheTime,
        data
    }

    window.localStorage.setItem(name, JSON.stringify(storage))
}

/**
 * 获取本地缓存数据
 * 未设置缓存时间或者在缓存时间内则返回数据
 * 过期返回undefined
 * @param {string} name 缓存字段名称
 */
export const getStorage = name => {
    if(!name) return;
    const storage = JSON.parse(window.localStorage.getItem(name));
    if(!storage) return;
    if(storage.cacheTime && new Date.getTime() - storage.createdTime > storage.cacheTime) {
        clearStorage(name);
        return;
    }
    return storage.data;
}

/**
 * 清除缓存
 * @param {string} name key
 */
export const clearStorage = name => {
    if(!name) return;
    window.localStorage.removeItem(name)
}

/**
 * 获取指定cookie
 * @param {string} name key
 */
export const getCookie = (name) => {
    var arr,reg=new RegExp("(^| )*"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null
    }
}

/**
 * 设置cookie
 * @param {string} name key
 * @param {*} value cookie值
 * @param {number} Hours 有效时间
 */
export const setCookie = (name, value, Hours) => {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = utc + 3600000 * offset;
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie =
      name +
      "=" +
      escape(value) +
      ";path=/;expires=" +
      exp.toGMTString() +
      ";domain=360doc.com;";
}
  


/**
 * 获取url参数
 * @param {string} name 参数名
 * @param {*} origin url地址
 */
export const getUrlParam = (name, origin = null) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
}

/**
 * 将json对象拼接成url参数
 * @param {Object} obj JSON对象
 */
export const fnParams2Url = obj=> {
    let aUrl = []
    let fnAdd = function(key, value) {
      return key + '=' + value
    }
    for (var k in obj) {
      aUrl.push(fnAdd(k, obj[k]))
    }
    return encodeURIComponent(aUrl.join('&'))
}


/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};


/**
 * 滚动到指定元素区域 
 * smoothScroll('#fooBar')
 * @param {element} element 元素id
 */
export const smoothScroll = element => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
}

/**
 * 获取页面的scrollTop
 */
export const getPageScrollTop = () => {
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

/**
 * 获取可视区域高度
 */
export const getPageViewHeight = () => {
    var d = document,
        a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
    return a.clientHeight;
}



/**
 * 文件转base64
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(file, format = ['jpg', 'jpeg', 'png', 'gif'], size = 20 * 1024 * 1024, formatMsg = '文件格式不正确', sizeMsg = '文件大小超出限制') {
    return new Promise((resolve, reject) => {
        // 格式过滤
        let suffix = file.type.split('/')[1].toLowerCase();
        let inFormat = false;
        for (let i = 0; i < format.length; i++) {
            if (suffix === format[i]) {
                inFormat = true;
                break;
            }
        }
        if (!inFormat) {
            reject(formatMsg);
        }
        // 大小过滤
        if (file.size > size) {
            reject(sizeMsg);
        }
        // 转base64字符串
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            let res = fileReader.result;
            resolve({base64String: res, suffix: suffix});
            reject('异常文件，请重新选择');
        }
    })
}

/**
 * 获取windows版本
 * @param { string } osVersion 
 */
export function OutOsName(osVersion) {
    if(!osVersion){
        return
    }
    let str = osVersion.substr(0, 3);
    if (str === "5.0") {
        return "Win 2000"
    } else if (str === "5.1") {
        return "Win XP"
    } else if (str === "5.2") {
        return "Win XP64"
    } else if (str === "6.0") {
        return "Win Vista"
    } else if (str === "6.1") {
        return "Win 7"
    } else if (str === "6.2") {
        return "Win 8"
    } else if (str === "6.3") {
        return "Win 8.1"
    } else if (str === "10.") {
        return "Win 10"
    } else {
        return "Win"
    }
}


/**
 * 获取手机系统
 *  0: ios
 *  1: android
 *  2: 其它
 */
export function getOSType() {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 0;
    }
    if (isAndroid) {
        return 1;
    }
    return 2;
}


/**
 * 函数防抖
 * @param { function } func
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
export function debounce(func,wait,immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}

/**
 * 函数节流
 * @param { function } func 函数
 * @param { number } wait 延迟执行毫秒数
 * @param { number } type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait ,type) {
    let previous, timeout;
    if(type===1){
        previous = 0;
    }else if(type===2){
        timeout = null;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }

    }
}


/**
 * 数据类型判断
 * @param {*} target 
 */
export function type(target) {
    let ret = typeof(target);
    let template = {
        "[object Array]": "array",
        "[object Object]":"object",
        "[object Number]":"number - object",
        "[object Boolean]":"boolean - object",
        "[object String]":'string-object'
    };

    if(target === null) {
        return 'null';
    }else if(ret == "object"){
        let str = Object.prototype.toString.call(target);
        return template[str];
    }else{
        return ret;
    }
}


/**
 * 去除字符串前后空格
 * @param { string } str 待处理字符串
 * @param  { number } type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 */
export function trim(str, type = 1) {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
        case 1:
            return str.replace(/\s/g, "");
        case 2:
            return str.replace(/(^\s)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s)/g, "");
        case 4:
            return str.replace(/(\s$)/g, "");
        default:
            return str;
    }
}

/**
 * 判断是pc还是移动端
 */
export const detectDeviceType = () => { 
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'; 
};

/**
 * 延迟执行
 * sleep(1000).then(() => {})
 * @param {ms} time 延迟时间
 */
export const sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
};

/**
 * 日期时间格式化
 * dateFormat("YYYY-mm-dd HH:MM", date)
 * @param {string} fmt 格式字符串
 * @param {string} d 日期时间
 */
export const dateFormat = (fmt, d) => {
    let ret,
        date = new Date(d.replace('-','/'));
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}