<template>
    <el-config-provider :size="size" :locale="zhCn">
        <!-- 开启水印 -->
        <el-watermark v-if="watermarkEnabled" :font="{ color: fontColor }" :content="defaultSettings.watermarkContent" :z-index="9999" class="wh-full">
            <router-view />
        </el-watermark>
        <!-- 关闭水印 -->
        <router-view v-else />
    </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useSettingsStore } from '@/store/settings';
import defaultSettings from '@/settings';
import { ThemeEnum } from '@/enums/ThemeEnum';
import { SizeEnum } from '@/enums/SizeEnum';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const size = computed(() => appStore.size as SizeEnum);
const watermarkEnabled = computed(() => settingsStore.watermarkEnabled);

// 明亮/暗黑主题水印字体颜色适配
const fontColor = computed(() => {
    return settingsStore.theme === ThemeEnum.DARK ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
});
</script>
