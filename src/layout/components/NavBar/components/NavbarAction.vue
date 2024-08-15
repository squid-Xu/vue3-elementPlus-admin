<template>
  <div class="flex">
    <template v-if="!isMobile">
      <!--全屏 -->
      <div class="nav-action-item" @click="toggle">
        <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
      </div>

      <!-- 布局大小 -->
      <el-tooltip content="布局大小" effect="dark" placement="bottom">
        <size-select class="nav-action-item" />
      </el-tooltip>

    </template>

    <!-- 用户头像 -->
    <el-dropdown class="nav-action-item" trigger="click">
      <div class="flex-center h100% p10px">
        <img :src="avatar" class="rounded-full mr-10px w24px w24px" />
        <span>admin</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <a target="_blank" href="https://squid-xu.github.io/blog/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" href="https://squid-xu.github.io/blog/">
            <el-dropdown-item>项目文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click="logout">
            注销地址
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置 -->
    <template v-if="defaultSettings.showSettings">
      <div class="nav-action-item" @click="settingStore.settingsVisible = true">
        <svg-icon icon-class="setting" />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useAppStore, useTagsViewStore, useSettingsStore } from "@/store";
import defaultSettings from "@/settings";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { MessageTypeEnum, MessageTypeLabels } from "@/enums/MessageTypeEnum";

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const settingStore = useSettingsStore();

const route = useRoute();
const router = useRouter();

const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE);

const { isFullscreen, toggle } = useFullscreen();


// 头像
const avatar = ref(new URL(`@/assets/avatar.gif`, import.meta.url).href);


/* 注销 */
function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false,
  }).then(() => {
    // userStore
    //   .logout()
    //   .then(() => {
    //     tagsViewStore.delAllViews();
    //   })
    //   .then(() => {
    //     router.push(`/login?redirect=${route.fullPath}`);
    //   });
  });
}
</script>
<style lang="scss" scoped>
.nav-action-item {
  display: inline-block;
  min-width: 40px;
  height: $navbar-height;
  line-height: $navbar-height;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}

:deep(.el-divider--horizontal) {
  margin: 10px 0;
}

.dark .nav-action-item:hover {
  background: rgb(255 255 255 / 20%);
}

.layout-top .nav-action-item,
.layout-mix .nav-action-item {
  color: #fff;
}
</style>
