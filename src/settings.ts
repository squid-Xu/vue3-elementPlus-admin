import { SizeEnum } from './enums/SizeEnum';
import { LayoutEnum } from './enums/LayoutEnum';
import { ThemeEnum } from './enums/ThemeEnum';

const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

const defaultSettings: AppSettings = {
    title: 'Vite + Vue + TS',
    showSettings: true,
    tagsView: true,
    fixedHeader: true,
    sidebarLogo: true,
    layout: LayoutEnum.LEFT,
    theme: mediaQueryList.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    size: SizeEnum.DEFAULT,
    themeColor: '#409EFF',
    watermarkEnabled: false,
    watermarkContent: 'Vite + Vue + TS'
};

export default defaultSettings;
