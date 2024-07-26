/*
 * @Author: liuyuhao
 * @Date: 2024-05-21 15:29:52
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-22 17:58:32
 * @Description: file description
 */

import request from '../request'
import type { IResponse } from '../common/type'
import type { UserInfo } from '@/stores/modules/user'

export type IVerifyResponse = {
  uuid: string
  verifyCode: string
}

export type ILoginParam = {
  userName: string // 用户名 必需
  // SHA256（MD5(输入密码)+验证码大写）
  password: string // 密码 必需
  uuid: string // 图形验证码uuid 必需
  verifyCode: string // 图形验证码 必需
}

export const GetVerify = async function () {
  return request.get<void, IResponse<IVerifyResponse>>('/user/getCaptcha')
}

export const Login = (param: ILoginParam) => {
  return request.post<ILoginParam, IResponse<UserInfo>>('/user/pswLogin', param)
}

export const Logout = () => {
  return request.post<void, IResponse>('/user/logout')
}
