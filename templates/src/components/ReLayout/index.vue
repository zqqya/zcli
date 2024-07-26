<!--
 * @Author: zhuqinqin
 * @Date: 2024-05-13 09:56:21
 * @LastEditors: zhuqinqin
 * @LastEditTime: 2024-07-25 16:57:27
 * @FilePath: /vue-project/src/components/ReLayout/index.vue
 * @Description: 布局
-->
<template>
  <div class="layout">
    <div class="header">
      <div class="header-logo"></div>
      <div class="greeting">
        <div>{{ greeting }}</div>
        <div @click="logout">退出</div>
      </div>
    </div>
    <div class="main">
      <ReMenu :class="['menu', { 'is-menu-collapse': isCollapse }]" @toogle="toogleMenu"></ReMenu>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessageBox } from 'element-plus'
import { RouterView } from 'vue-router'

const { replace } = useRouter()
const { USER_STORE_KEY, userInfo, setLogout } = useUserStore()
const greeting = computed(() => `欢迎您，${userInfo?.userName ?? '用户'}`)

const logout = () => {
  ElMessageBox({
    title: '提示',
    message: '确认退出登录?',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      try {
        await setLogout()
      } catch (error) {
        sessionStorage.removeItem(USER_STORE_KEY)
      } finally {
        replace('/login')
      }
    })
    .catch(() => {})
}
const isCollapse = ref(false)
const toogleMenu = (data: boolean) => {
  isCollapse.value = data
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
}

$iconsize: 16px;
$headerheight: 60px;
.header {
  width: 100%;
  background: linear-gradient(90deg, #d7001f 0%, #ea0d2d 100%);
  box-shadow: 0px 2px 6px 0px rgba(215, 0, 31, 0.1);
  height: $headerheight;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-logo {
    width: 488px;
    height: 60px;
    background: url(../../assets/images/header-logo.png) no-repeat;
    background-size: auto 100%;
    margin-left: 24px;
  }
  .greeting {
    color: #fff;
    font-family:
      PingFangSC,
      PingFang SC;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .logout {
    cursor: pointer;
    margin: 0 24px;
    width: $iconsize;
    height: $iconsize;
  }
}
.main {
  display: flex;
  height: calc(100% - $headerheight);
  overflow: hidden;
  .menu {
    background: #fff;
    box-shadow: 1px 0px 5px 0px rgba(158, 40, 40, 0.08);
  }
  .content {
    padding: 0 0 16px;
    box-sizing: border-box;
    background: #f9f9f9;
    min-height: calc(100vh - 60px);
    flex: 1 1 auto;
    width: calc(100% - 220px);
  }
}
</style>
