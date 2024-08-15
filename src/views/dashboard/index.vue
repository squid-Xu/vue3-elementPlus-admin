<template>
  <div class="dashboard-container">

    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img class="w-20 h-20 mr-5 rounded-full" :src="avatar" />
            <div>
              <p>上午好，系统管理员！</p>
              <p class="text-sm text-gray">
                今日天气晴朗，气温在15℃至25℃之间，东南风。
              </p>
            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <el-statistic v-for="item in statisticData" :key="item.key" :value="item.value">
              <template #title>
                <div class="flex items-center">
                  <svg-icon :icon-class="item.iconClass" size="20px" />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
              <template v-if="item.suffix" #suffix>/100</template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据卡片 -->
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">在线用户</span>
              <el-tag type="success" size="small">日</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg"> 1</span>
            <svg-icon icon-class="user" size="2em" />
          </div>
          <div class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]">
            <span> 总用户数 </span>
            <span>57821 </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">浏览量</span>
              <el-tag type="primary" size="small">日</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg"> 1</span>
            <svg-icon icon-class="pv" size="2em" />
          </div>
          <div class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]">
            <span> 总浏览量 </span>
            <span>239815</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">访客数</span>
              <el-tag type="danger" size="small">日</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg"> 1</span>
            <svg-icon icon-class="uv" size="2em" />
          </div>
          <div class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]">
            <span> 总访客数 </span>
            <span>2000</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">IP数</span>
              <el-tag type="warning" size="small">日</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg"> 1</span>
            <svg-icon icon-class="ip" size="2em" />
          </div>
          <div class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]">
            <span> 总IP数 </span>
            <span>13613</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="16">
        <!-- 访问趋势统计图 -->
        <VisitTrend id="VisitTrend" width="100%" height="400px" />
      </el-col>
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                通知公告<el-icon class="ml-1">
                  <Notification />
                </el-icon>
              </div>
              <el-link type="primary">
                <span class="text-xs">查看更多</span><el-icon class="text-xs">
                  <ArrowRight />
                </el-icon></el-link>
            </div>
          </template>

          <el-scrollbar height="400px">
            <div v-for="(item, index) in notices" :key="index" class="flex-y-center py-3">
              <el-tag :type="getNoticeLevelTag(item.level)" size="small">
                {{ getNoticeLabel(item.type) }}
              </el-tag>
              <el-text truncated class="!mx-2 flex-1 !text-xs !text-[var(--el-text-color-secondary)]">
                {{ item.title }}
              </el-text>
              <el-link>
                <el-icon class="text-sm">
                  <View />
                </el-icon>
              </el-link>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

import VisitTrend from './components/VisitTrend.vue'
import { NoticeTypeEnum, getNoticeLabel } from "@/enums/NoticeTypeEnum";
import { View, ArrowRight, Notification } from '@element-plus/icons-vue'

// 头像
const avatar = ref(new URL(`@/assets/avatar.gif`, import.meta.url).href);


// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);

// 通知公告
const notices = ref([
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_UPGRADE,
    title: "v2.12.0 奥运会结束了",
  },
  {
    level: 0,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 7 月 1 日举办年中总结大会，请各部门做好准备。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "端午节假期从 6 月 12 日至 6 月 14 日放假，共 3 天。",
  },

  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
  },
  {
    level: 0,
    type: NoticeTypeEnum.OTHER,
    title: "公司新规章制度发布，请大家及时查阅。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.HOLIDAY_NOTICE,
    title: "中秋节假期从 9 月 22 日至 9 月 24 日放假，共 3 天。",
  },
  {
    level: 1,
    type: NoticeTypeEnum.COMPANY_NEWS,
    title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SECURITY_ALERT,
    title:
      "请注意，近期有恶意软件通过即时通讯工具传播，请勿下载不明来源的文件。",
  },
  {
    level: 2,
    type: NoticeTypeEnum.SYSTEM_MAINTENANCE,
    title: "系统将于下周日凌晨 3 点进行升级，预计维护时间为 1 小时。",
  },
  {
    level: 3,
    type: NoticeTypeEnum.OTHER,
    title: "公司年度体检通知已发布，请各位员工按时参加。",
  },
]);

const getNoticeLevelTag = (type: number) => {
  switch (type) {
    case 0:
      return "danger";
    case 1:
      return "warning";
    case 2:
      return "primary";
    default:
      return "success";
  }
};

</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;
}
</style>
