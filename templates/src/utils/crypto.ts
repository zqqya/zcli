/*
 * @Author: liuyuhao
 * @Date: 2024-05-21 16:26:48
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-21 16:26:48
 * @Description: file description
 */
import { MD5, SHA256 } from 'crypto-js'

/**
 * @description md5加密
 * @param {string} password
 * @returns
 */
export function md5EnCode(password: string) {
  return MD5(password).toString()
}

/**
 * sha256加密
 * @param str 要加密的字符串
 * @returns {string} 加密过后的字符串
 */
export const SHA256EnCode = (str: string): string => {
  return SHA256(str).toString()
}
