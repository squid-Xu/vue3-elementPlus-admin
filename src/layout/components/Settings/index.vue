<template>
  <el-drawer v-model="settingsVisible" size="300" title="项目配置">
    <el-divider>主题设置</el-divider>

    <div class="flex-center">
      <el-switch v-model="isDark" :active-icon="Moon" :inactive-icon="Sunny" @change="changeTheme" />
    </div>

    <el-divider>界面设置</el-divider>

    <div class="setting-item">
      <span class="text-xs">主题颜色</span>
      <ThemeColorPicker v-model="settingsStore.themeColor" @update:model-value="changeThemeColor" />
    </div>

    <div class="setting-item">
      <span class="text-xs">开启 Tags-View</span>
      <el-switch v-model="settingsStore.tagsView" />
    </div>

    <div class="setting-item">
      <span class="text-xs">固定 Header</span>
      <el-switch v-model="settingsStore.fixedHeader" />
    </div>

    <div class="setting-item">
      <span class="text-xs">侧边栏 Logo</span>
      <el-switch v-model="settingsStore.sidebarLogo" />
    </div>

    <div class="setting-item">
      <span class="text-xs">开启水印</span>
      <el-switch v-model="settingsStore.watermarkEnabled" />
    </div>

    <el-divider>导航设置</el-divider>

    <LayoutSelect v-model="settingsStore.layout" @update:model-value="changeLayout" />
  </el-drawer>
</template>

<script setup lang="ts">
import { useAppStore, } from "@/store/app";
import { useSettingsStore } from "@/store/settings";
import { usePermissionStore } from "@/store/permission";
import ThemeColorPicker from './components/ThemeColorPicker.vue'
import LayoutSelect from './components/LayoutSelect.vue'
import { LayoutEnum } from "@/enums/LayoutEnum";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { Moon, Sunny } from '@element-plus/icons-vue'

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();



const settingsVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set() {
    settingsStore.settingsVisible = false;
  },
});

/** 切换主题颜色 */
function changeThemeColor(color: string) {
  settingsStore.changeThemeColor(color);
}

/** 切换主题 */
const isDark = ref<boolean>(settingsStore.theme === ThemeEnum.DARK);
const changeTheme = (val: any) => {
  isDark.value = val;
  settingsStore.changeTheme(isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
};

/** 切换布局 */
function changeLayout(layout: string) {
  settingsStore.changeLayout(layout);
  if (layout === LayoutEnum.MIX) {
    route.name && againActiveTop(route.name as string);
  }
}

/** 重新激活顶部菜单 */
function againActiveTop(newVal: string) {
  const parent = findOutermostParent(permissionStore.routes, newVal);
  if (appStore.activeTopMenu !== parent.path) {
    appStore.activeTopMenu(parent.path);
  }
}

/** 递归查找最外层父节点 */
function findOutermostParent(tree: any[], findName: string) {
  let parentMap: any = {};

  function buildParentMap(node: any, parent: any) {
    parentMap[node.name] = parent;

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        buildParentMap(node.children[i], node);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    buildParentMap(tree[i], null);
  }

  let currentNode = parentMap[findName];
  while (currentNode) {
    if (!parentMap[currentNode.name]) {
      return currentNode;
    }
    currentNode = parentMap[currentNode.name];
  }

  return null;
}
</script>

<style lang="scss" scoped>
.setting-item {
  @apply py-1 flex-x-between;
}
</style>
