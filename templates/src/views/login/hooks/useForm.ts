/*
 * @Author: liuyuhao
 * @Date: 2024-05-15 15:44:34
 * @LastEditors: zhuqinqin
 * @LastEditTime: 2024-07-25 16:32:21
 * @Description: file description
 */

import { Crypto } from '@/utils'
import { useUserStore } from '@/stores'
import type { FormRules } from 'element-plus'
import { getVerifyImage } from './useRequest'
import UserIcon from '@/assets/images/icons/user.png'
import LockIcon from '@/assets/images/icons/lock.png'
import ShieldIcon from '@/assets/images/icons/shield.png'
import { computed, reactive, ref, type InputTypeHTMLAttribute } from 'vue'

type FormProp = 'userName' | 'password' | 'code'

export type FormItem = {
  prop: FormProp
  placeholder: string
  max: number
  prefix: string
  type?: InputTypeHTMLAttribute
  suffix?: boolean
  src?: string
  loading?: boolean
  formatter?: (value: string) => string
}

export default function useForm() {
  const uuid = ref('')
  const codeSrc = ref('')
  const loading = ref(false)
  const codeLoading = ref(false)
  const { setLogin } = useUserStore()
  const form = reactive({ userName: '', password: '', code: '' })

  const formList = computed<FormItem[]>(() => [
    {
      prop: 'userName',
      placeholder: '请输入用户名',
      max: 30,
      type: 'text',
      // formatter: (v: string) => v.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, ''),
      prefix: UserIcon
    },
    {
      prop: 'password',
      placeholder: '请输入密码',
      // formatter: (v: string) => v.replace(/[^a-zA-Z0-9\u4e00-\u9fff!@#$%^&*.-_]/g, ''),
      max: 40,
      type: 'password',
      prefix: LockIcon
    },
    {
      prop: 'code',
      placeholder: '请输入验证码',
      max: 4,
      prefix: ShieldIcon,
      suffix: true,
      src: codeSrc.value,
      loading: codeLoading.value
    }
  ])

  const rules: FormRules = {
    userName: [
      { required: true, message: '请输入用户名' },
      { max: 30, message: '用户名格式错误' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { max: 40, message: '密码格式错误' }
    ],
    code: [
      { required: true, message: '请输入验证码' },
      { max: 4, min: 4, message: '验证码格式错误' }
    ]
  }

  /** @description  */
  const refresh = async () => {
    codeLoading.value = true
    try {
      const resp = await getVerifyImage()
      codeLoading.value = false
      if (resp) {
        uuid.value = resp.uuid
        codeSrc.value = resp.verifyCode
      }
    } catch (error) {
      codeLoading.value = false
    }
  }

  /** @description 账号密码验证码登录 */
  const loginWithPassword = async () => {
    const md5_str = Crypto.md5EnCode(form.password)
    const sha256_str = Crypto.SHA256EnCode(md5_str + form.code.toUpperCase())
    try {
      const success = await setLogin({
        userName: form.userName,
        uuid: uuid.value,
        password: sha256_str,
        verifyCode: form.code
      })
      return !!success
    } catch (error) {}
  }

  return { form, loading, formList, rules, refresh, codeLoading, loginWithPassword }
}
