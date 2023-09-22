import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/api/login/index'
import type { IAccount } from '@/api/login/index'
import { localCache } from '@/utils/cache'

import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const name = loginResult.data.name
      this.token = loginResult.data.token
      // 注意这里我们要先获取到token才能进行后续操作
      localCache.setCache(LOGIN_TOKEN, this.token)
      console.log(this.token);

    },
  }
})

export default useLoginStore
