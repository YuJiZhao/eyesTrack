import { AnyObjectType } from "../context/typeContext";

// 缺乏文件上传功能封装
// @link: https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest

// GET请求
type GetType = {
    url: string;  // 请求地址
    header?: AnyObjectType;  // 请求头
    params?: AnyObjectType;  // 请求参数
    timeout?: number;  // 超时时间，默认为1000, TODO: 默认值抽离
    ontimeout: (e: ProgressEvent<EventTarget>) => void; // 超时回调函数
}
function get(config: GetType) {
    let xhr = new XMLHttpRequest();
    // 请求参数组装
    if(config.params) {
        config.url += spliceUrlParam(config.params);
    }

    xhr.open("GET", config.url, true);
    
    // 设置请求头
    if(config.header) {
        Object.keys(config.header).forEach(v => {
            xhr.setRequestHeader(v, config.header![v]);
        })
    }
    // 设置超时时间
    xhr.timeout = config.timeout || 1000;
    // 设置超时回调
    xhr.ontimeout = e => config.ontimeout(e);
    
    xhr.send();
    xhr.onreadystatechange = function (){
        /*
         0：请求未初始化
         1：服务器连接已建立
         2：请求已接收
         3：请求已完成，且响应已就绪
         */
        if (xhr.readyState === 4){
            // 判断是否请求成功
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 340){
                // 5.处理返回的结果
                alert(xhr.responseText);
            } else{
                console.log("请求失败");
            }
        }
    }
}

// POST请求
function post() {

}

// PUT请求
function put() {

}

// DELETE请求
function del() {

}

// 整合
export default () => {

}


/**
 ********************************************************************************
 *                                    辅助函数
 ******************************************************************************** 
 */

function spliceUrlParam(params: AnyObjectType) {
    let paramUrl = "?";
    Object.keys(params).forEach(v => {
        paramUrl += `${String(v)}=${String(params[v])}&&`;
    })
    paramUrl = paramUrl;
}