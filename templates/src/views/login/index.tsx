/*
 * @Author: liuyuhao
 * @Date: 2024-05-14 10:35:34
 * @LastEditors: zhuqinqin
 * @LastEditTime: 2024-07-25 16:40:12
 * @Description: file description
 */
import useForm from './hooks/useForm'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import classes from './login.module.scss'
import { defineComponent, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, type FormInstance } from 'element-plus'

export default defineComponent({
  setup() {
    const loginButton = '登 录'
    const mainTitle = 'xxx管理平台'

    const router = useRouter()
    const formInstance = ref<FormInstance>()
    const { form, refresh, formList, rules, loginWithPassword, loading } = useForm()

    /**
     * 处理登录点击事件的函数。
     * 该函数首先尝试验证表单，如果表单有效，则调用处理登录的函数。
     * 如果表单验证失败，则函数会提前返回。
     * 如果在执行过程中遇到错误，会将加载状态设置为false。
     */
    const onLoginClick = async () => {
      router.push('/home')
      // try {
      //   // 验证表单值的有效性
      //   const isVali = await formInstance.value?.validate()
      //   if (!isVali) return // 如果表单无效，终止执行
      //   await handleLogin() // 调用处理登录的函数
      // } catch (error) {
      //   loading.value = false // 在捕获到错误时，将加载状态设为false
      // }
    }

    /**
     * 处理登录逻辑。
     * 无参数。
     * 无显式返回值，但会根据登录结果重定向到不同页面或触发刷新操作。
     */
    const handleLogin = async () => {
      try {
        // 开始登录过程，设置加载状态为true
        loading.value = true
        // 异步调用登录函数
        const resp = await loginWithPassword()
        // 登录成功后的处理逻辑
        if (resp === true) {
          const toPath = '/home'
          // 执行重定向，并在完成后更新加载状态
          router.push(toPath).then(() => (loading.value = false))
        } else {
          // 登录失败或需要刷新的处理
          loading.value = false
          refresh()
        }
      } catch (error) {
        // 捕获登录过程中的异常，执行刷新并打印错误信息
        refresh()
        console.error('loginWithPassword ERROR:', error)
      }
    }

    // 初始化
    refresh()

    return () => (
      <div class={classes.root}>
        <div class={classes.poster}></div>
        <div class={classes.login}>
          <p class={classes.loginTitle}>{mainTitle}</p>
          <ElForm ref={formInstance} class={classes.loginForm} v-model:model={form} rules={rules}>
            {formList.value.map((item, index) => (
              <ElFormItem key={index} prop={item.prop} class={item.suffix && classes.mixFormItem}>
                {item.suffix ? (
                  <>
                    <ElInput
                      v-model={form[item.prop]}
                      prefixIcon={() => <img class={classes.inputIcon} src={item.prefix} />}
                      placeholder={item.placeholder}
                      class={'has-suffix'}
                      formatter={(v: string) => v.replace(/[^a-zA-Z0-9]/g, '')}
                      maxlength={item.max}
                      onKeydown={(e) => (e as KeyboardEvent).key === 'Enter' && onLoginClick()}
                    ></ElInput>
                    {item.src && !item.loading ? (
                      <img class={classes.code} src={item.src} onClick={() => refresh()} />
                    ) : (
                      <div
                        class={classes.code}
                        v-loading={item.loading}
                        onClick={() => {
                          !item.loading && refresh()
                        }}
                      ></div>
                    )}
                  </>
                ) : (
                  <ElInput
                    v-model={form[item.prop]}
                    prefixIcon={() => <img class={classes.inputIcon} src={item.prefix} />}
                    type={item.type}
                    formatter={item.formatter}
                    show-password={item.type === 'password'}
                    placeholder={item.placeholder}
                    maxlength={item.max}
                    onKeydown={(e) => (e as KeyboardEvent).key === 'Enter' && onLoginClick()}
                  ></ElInput>
                )}
              </ElFormItem>
            ))}
          </ElForm>
          <ElButton
            class={classes.loginBtn}
            loading={loading.value}
            type="primary"
            onClick={onLoginClick}
          >
            {loginButton}
          </ElButton>
        </div>
      </div>
    )
  }
})
