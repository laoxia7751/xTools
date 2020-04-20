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
 * 获取url参数
 * @param {string} name 参数名
 * @param {*} origin url地址
 */
export const getUrlParams = (name, origin = null) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
}

