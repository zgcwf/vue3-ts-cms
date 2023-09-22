<template>
  <div>
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="55px" size="large" status-icon>
      <!-- 这里的prop定义的就是相应校验规则的名字 -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="formData.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" show-password placeholder="请输入密码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'

import useLoginStore from '@/stores/login/index'
import { localCache } from '@/utils/cache'
import type { IAccount } from '@/api/login/index'

// 1.定义account数据
const formData = reactive<IAccount>({
  name: localCache.getCache('name') ?? 'coderwhy',
  password: localCache.getCache('password') ?? '123456'
})


// 2.定义校验规则
const formRules = reactive<FormRules<IAccount>>({
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '必须是5~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '必须是6位以上数字或字母组成~',
      trigger: 'blur'
    }
  ]
});

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

const loginAction = async (isRemPwd: boolean) => {
  if (!formRef.value) return
  await formRef.value?.validate((valid, fields) => {
    if (valid) {
      // 获取用户输入的帐号和密码
      const name = formData.name
      const password = formData.password

      loginStore.loginAccountAction({ name, password }).then(() => {
        // 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      console.log('vaild-err', fields);
      // ElMessage.error('请您输入正确的格式后再进行操作~~')
    }
  })
}

// 4.暴露方法给父组件
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
