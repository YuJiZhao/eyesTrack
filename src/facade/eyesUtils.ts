import { ip } from "../subSystem/utilsSystem/netUtils";
import { browser, OS, agent, screenResolution } from "../subSystem/utilsSystem/agentUtils";
import {
    heapSize, heapRatio, redirectCount, pageOpenWay, DNSTime, tcpConnectTime, 
    DOMTime, whiteScreenTime, DOMReadyTime, onLoadTime, firstScreenTime
} from "../subSystem/utilsSystem/performUtils";

export default {
    ip,
    browser, OS, agent, screenResolution,
    heapSize, heapRatio, redirectCount, pageOpenWay, DNSTime, tcpConnectTime, 
    DOMTime, whiteScreenTime, DOMReadyTime, onLoadTime, firstScreenTime
};