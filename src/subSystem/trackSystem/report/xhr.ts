import axios from "axios";

type XHRConfigType = {
    // 上报地址，默认为全局设置，设置了path也以url为准
    url?: string;
    // 上报相对地址，设置了baseURL则其为跟路径，否则以当前网址为根路径，设置了url则以url为准
    path?: string;
    // 请求方式
    method?: string;
    // 请求头
    header?: any;
    // 上报数据，拼接在url里
    params?: any;
    // 上报数据，仅适用'PUT'，'POST'，'DELETE'和'PATCH'
    data?: any;
    // 触发器
    trigger: () => void;
}

export function xhr(xhrConfig: XHRConfigType) {

}