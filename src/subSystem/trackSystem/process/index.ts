type ConfigurationType = {
    /**
     * 触发方式：
     *   手动触发
     *   点击触发
     *   加载触发
     *   暴露触发
     *   路由跳转
     */
    trigger: () => void;

    /**
     * 上报方式：
     *   xhr上报
     *   img上报
     *   script上报
     */
    report: number;

    // 上报地址

    // 上报数据
}

class Process {
    // 提供copy方法
    // 提供全局配置方法
    constructor() {

    }
}