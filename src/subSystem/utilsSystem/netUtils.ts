import axios from "axios";
import config from "../../config";

/**
 * 获取用户ip
 * @returns Promise<string>
 */
async function ip() {
    return await axios.get(config.ipUrl).then(res => {
        return res.data.ip;
    });
}

/**
 * 获取用户网络类型
 * @todo 待测试
 * @returns wifi / 4g / 3g / 3gnet / 2g / other
 */
function network() {
    let ua = navigator.userAgent;
    let networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
    return networkStr.toLowerCase().replace('nettype/', '');
}

export { ip, network };