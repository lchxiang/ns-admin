/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-10 15:26:41
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-10 16:14:51
 */
export type LoginForm = {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  userInfo: {
    username: string
    sex: 0 | 1
  }
}
