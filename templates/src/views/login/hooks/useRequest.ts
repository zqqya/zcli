/*
 * @Author: liuyuhao
 * @Date: 2024-05-15 16:11:27
 * @LastEditors: liuyuhao
 * @LastEditTime: 2024-05-21 15:49:32
 * @Description: file description
 */
import { GetVerify } from '@/api/login'
import { ElMessage } from 'element-plus'

export const getVerifyImage = async () => {
  try {
    const { status, msg, data } = await GetVerify()

    if (status === 200 && data) {
      return data
    } else {
      ElMessage.error(msg)
    }
  } catch (error) {
    console.error('getVerifyImage ERROR: ', error)
  }
}
