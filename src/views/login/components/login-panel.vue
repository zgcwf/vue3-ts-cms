<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">后台管理模板</h1>

    <!-- tabs -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <!-- 账号登陆 -->
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 2.手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <!-- 手机登录 -->
          <pane-phone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部菜单 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLogin">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref<string>('account')

// 实时更新状态
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

// 登录
// 注意这里泛型传递的子组件类型(即导入的子组件名称)
// InstanceType用于构造一个由所有Type的构造函数的实例类型组成的类型, 就是获取子组件实例的类型
const accountRef = ref<InstanceType<typeof PaneAccount>>()
const phoneRef = ref<InstanceType<typeof PanePhone>>()

function handleLogin() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  }
  if (activeName.value === 'phone') {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 20%;
  min-width: 330px;
  min-height: 200px;
  margin-bottom: 120px;

  .title {
    text-align: center;
    margin-bottom: 25px;
  }

  .tabs {
    box-shadow: 1px 1px 5px #ccc;
    border-radius: 20px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // 自定义高度，覆盖掉 size="large" 中默认的高度
    --el-button-size: 44px !important;
  }
}
</style>
