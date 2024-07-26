<template>
  <div class="menu-wrap">
    <el-menu
      active-text-color="#D7001F"
      background-color="#ffffff"
      class="el-menu-vertical"
      :default-active="currentActivePath"
      text-color="#1C2025"
      :collapse="isCollapse"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in menuList"
        class="menu-item"
        @click="changeTab(item)"
      >
        <!-- <ReSvgIcon :icon-class="item.key" class-name="menu-icon" /> -->
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
    <ReSvgIcon
      :icon-class="isCollapse ? 'open-icon' : 'pack-up'"
      :class-name="`toogle-icon ${isCollapse ? 'toogle-icon-collapse' : ''}`"
      @click="toogle"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IMenuItem } from './interface'
const router = useRouter()

const menuList = computed<IMenuItem[]>(() => {
  return [
    {
      title: '菜单1',
      key: 'home',
      path: '/home'
    },
    {
      title: '菜单2',
      key: 'test',
      path: '/test'
    }
  ]
})
// 当前选中路由菜单
const currentActivePath = computed(() => {
  return router.currentRoute.value.meta.current
    ? router.currentRoute.value.meta.current
    : router.currentRoute.value.path
})
const isCollapse = ref(false)
/**
 * @description: 收起打开菜单
 * @return {*}
 */
const toogle = () => {
  isCollapse.value = !isCollapse.value
}
/**
 * @description: 切换菜单
 * @return {*}
 * @param {IMenuItem} item 菜单选项
 */
const changeTab = (item: IMenuItem) => {
  router.push(item.path)
}
</script>
<style lang="scss" scoped>
.menu-wrap {
  position: relative;

  .el-menu-vertical {
    border: none;
    :deep(.menu-icon) {
      margin-right: 8px;
    }
    .menu-item {
      height: 40px;
      background-color: #fff;
      border-left: 3px solid transparent;
    }
    .menu-item.is-active {
      background-color: #fff6f7;
      border-left: 3px solid #d7001f;
    }
  }
  :deep(.toogle-icon) {
    position: absolute;
    left: 102px;
    bottom: 24px;
    cursor: pointer;
    transition: left 0.2s linear;
  }
  :deep(.toogle-icon-collapse) {
    left: 24px;
    bottom: 24px;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
  }
  .el-menu-vertical.el-menu--collapse {
    width: 70px;
  }
}
</style>
