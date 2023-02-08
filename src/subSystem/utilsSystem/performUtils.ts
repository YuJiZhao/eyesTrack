import { browser } from "./agentUtils";
import config from "../../config";

let perform = performance as any;

/**
 * 获取当前内存占用大小（noMemoryBrowser不支持）
 * @unit B
 */
function heapSize() {
    return config.noMemoryBrowser.includes(browser())
        ? -1
        : perform.memory.usedJSHeapSize;
}

/**
 * 获取当前内存占用率（noMemoryBrowser不支持）
 */
function heapRatio() {
    return config.noMemoryBrowser.includes(browser())
        ? -1
        : heapSize() / perform.memory.totalJSHeapSize;
}

/**
 * 进入当前页面经历了多少次重定向
 */
function redirectCount() {
    return perform.navigation.redirectCount;
}

/**
 * 页面打开的方式
 * @returns 0：正常进入（非刷新、非重定向），1：刷新进入，2：通过浏览器的前进、后退按钮进入，255：其他方式进入
 */
function pageOpenWay() {
    return perform.navigation.type;
}

/**
 * DNS查询耗时
 * @unit ms
 */
function DNSTime() {
    return perform.timing.domainLookupEnd - perform.timing.domainLookupStart;
}

/**
 * TCP链接耗时
 * @unit ms
 */
function tcpConnectTime() {
    return perform.timing.connectEnd - perform.timing.connectStart;
}

/**
 * 解析dom树耗时
 * @unit ms
 */
function DOMTime() {
    return asyncTime("domComplete", "domInteractive");
}

/**
 * 白屏时间
 * @unit ms
 */
function whiteScreenTime() {
    return asyncTime("responseStart", "navigationStart");
}

/**
 * DOM ready时间
 * @unit ms
 */
function DOMReadyTime() {
    return asyncTime("domContentLoadedEventEnd", "navigationStart");
}

/**
 * onload 时间
 * @unit ms
 */
function onLoadTime() {
    return asyncTime("loadEventEnd", "navigationStart");
}

/**
 * 首屏时间
 * @todo 对于无资源文件页面，会报错
 * @unit ms
 */
function firstScreenTime() {
    return perform.getEntriesByName("first-contentful-paint")[0].startTime - perform.timing.navigationStart;
}

/**
 * 辅助函数——等待时间数据
 * @param wait 
 * @param target 
 * @returns Promise
 */
function asyncTime(wait: string, target: string): Promise<number> {
    return new Promise(resolve => {
        let clear = setInterval(() => {
            if(perform.timing[wait]) {
                clearInterval(clear);
                resolve(perform.timing[wait] - perform.timing[target]);
            }
        })
    });
}

export {
    heapSize, heapRatio, redirectCount, pageOpenWay, DNSTime, tcpConnectTime,
    DOMTime, whiteScreenTime, DOMReadyTime, onLoadTime, firstScreenTime
};