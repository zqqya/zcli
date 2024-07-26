/*
 * @Author: zouronggui
 * @Date: 2024-05-14 18:18:25
 * @LastEditors: zhuqinqin
 * @LastEditTime: 2024-07-25 16:33:12
 * @FilePath: /vue-project/src/utils/index.ts
 * @Description:
 */

export * as Crypto from './crypto'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
