import defaultSettings from '@/settings';

import { DeviceEnum } from '@/enums/DeviceEnum';
import { SidebarStatusEnum } from '@/enums/SidebarStatusEnum';

export const useAppStore = defineStore('app', () => {
    // 设备类型
    const device = useStorage('device', DeviceEnum.DESKTOP);
    // 布局大小
    const size = useStorage('size', defaultSettings.size);
    // 侧边栏状态
    const sidebarStatus = useStorage('sidebarStatus', SidebarStatusEnum.CLOSED);
    const sidebar = reactive({
        opened: sidebarStatus.value === SidebarStatusEnum.OPENED,
        withoutAnimation: false
    });

    // 顶部菜单激活路径
    const activeTopMenuPath = useStorage('activeTopMenuPath', '');

    // 切换侧边栏
    function toggleSidebar() {
        sidebar.opened = !sidebar.opened;
        sidebarStatus.value = sidebar.opened ? SidebarStatusEnum.OPENED : SidebarStatusEnum.CLOSED;
    }

    // 关闭侧边栏
    function closeSideBar() {
        sidebar.opened = false;
        sidebarStatus.value = SidebarStatusEnum.CLOSED;
    }

    // 打开侧边栏
    function openSideBar() {
        sidebar.opened = true;
        sidebarStatus.value = SidebarStatusEnum.OPENED;
    }

    // 切换设备
    function toggleDevice(val: string) {
        device.value = val;
    }

    /**
     * 改变布局大小
     *
     * @param val 布局大小 default | small | large
     */
    function changeSize(val: string) {
        size.value = val;
    }

    /**
     * 混合模式顶部切换
     */
    function activeTopMenu(val: string) {
        activeTopMenuPath.value = val;
    }
    return {
        device,
        sidebar,
        size,
        activeTopMenu,
        toggleDevice,
        changeSize,
        toggleSidebar,
        closeSideBar,
        openSideBar,
        activeTopMenuPath
    };
});
