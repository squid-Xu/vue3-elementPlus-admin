<!-- 混合布局菜单(top) -->
<template>
  <el-scrollbar>
    <el-menu mode="horizontal" :default-active="activePath" :background-color="variables['menu-background']"
      :text-color="variables['menu-text']" :active-text-color="variables['menu-active-text']"
      @select="handleMenuSelect">
      <el-menu-item v-for="route in mixTopMenus" :key="route.path" :index="route.path">
        <template #title v-if="route.meta">
          <SidebarMenuItemTitle :icon="route?.meta?.icon" :title="route?.meta?.title" />
        </template>
        <template #title v-else>
          <SidebarMenuItemTitle :icon="route?.children?.[0]?.meta?.icon" :title="route?.children?.[0]?.meta?.title" />
        </template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import SidebarMenuItemTitle from './SidebarMenuItemTitle.vue';
import { isExternal } from "@/utils/index";
import { useAppStore, } from "@/store/app";
import { usePermissionStore } from "@/store/permission";
import variables from "@/styles/variables.module.scss";
import { RouteRecordRaw } from "vue-router";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const router = useRouter();


// 避免 activeTopMenuPath 缓存被清理，从当前路由路径获取顶部菜单路径，eg. /system/user → /system
const activeTopMenuPath = useRoute().path.match(/^\/[^\/]+/)?.[0] || "/";
appStore.activeTopMenu(
  //防止刷新 '/dashboard' 匹配不到子路由
  activeTopMenuPath === "/dashboard" ? "/" : activeTopMenuPath
);

// 激活的顶部菜单路径
const activePath = computed(() => appStore.activeTopMenuPath);

// 混合模式顶部菜单集合
const mixTopMenus = ref<RouteRecordRaw[]>([]);

/**
 * 菜单选择事件
 */
const handleMenuSelect = (routePath: string) => {
  appStore.activeTopMenu(routePath);
  permissionStore.setMixLeftMenus(routePath);
  // 获取左侧菜单集合，默认跳转到第一个菜单
  const mixLeftMenus = permissionStore.mixLeftMenus;
  goToFirstMenu(mixLeftMenus);
};

/**
 * 默认跳转到左侧第一个菜单
 */
const goToFirstMenu = (menus: RouteRecordRaw[]) => {
  if (menus.length === 0) return;

  const [first] = menus;

  if (first.children && first.children.length > 0) {
    goToFirstMenu(first.children as RouteRecordRaw[]);
  } else if (isExternal(first.path)) {
    window.open(first.path, '_blank');
  } else if (first.name) {
    router.push({
      name: first.name,
      query: first?.meta?.params as undefined,
    });
  }
};

// 初始化顶部菜单
onMounted(() => {
  mixTopMenus.value = permissionStore.routes.filter(
    (item) => !item.meta || !item.meta.hidden
  );
});
</script>
