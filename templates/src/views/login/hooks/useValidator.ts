/*
 * @Author: liuyuhao
 * @Date: 2024-05-24 17:13:00
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-24 17:47:02
 * @Description: file description
 */

/**
 * @description 验证密码强度和格式。
 * @param password 待验证的密码字符串。
 * @returns 返回一个布尔值，true 表示密码符合要求，false 表示密码不符合要求。
 */
export function validatePassword(password: string): boolean {
  // 密码长度校验
  if (password.length > 40) {
    return false
  }
  // 密码字符组成校验
  const regex = /^[a-zA-Z0-9(!@#¥$^%…&*()-_+=)]+$/
  return regex.test(password)
}
