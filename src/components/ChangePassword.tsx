/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-14 13:32:05
 * @LastEditors: liwg
 * @LastEditTime: 2022-09-14 14:41:29
 */
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'

interface Iprops {
  isOldPassword: Boolean
}

interface ChangePasswordRules {
  password: Rule[]
  passwordConfirm: Rule[]
  oldPassword?: Rule[]
}

export const ChangePassword = defineComponent(function (props: Iprops = { isOldPassword: true }) {
  const formModel = reactive({
    oldPassword: '',
    password: '',
    passwordConfirm: ''
  })

  const formRef = $ref<FormInstance>()

  const validatePassword = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入新密码')
    } else {
      if (formModel.passwordConfirm !== '') {
        formRef?.validateFields('empPasswordConfirm')
      }
      return Promise.resolve()
    }
  }

  const validateConfirmPassword = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请再次确认新密码')
    } else if (value !== formModel.password) {
      return Promise.reject('两次密码不一致')
    } else {
      return Promise.resolve()
    }
  }

  const changePasswordRules = $computed<ChangePasswordRules>(() => {
    const baseRules: ChangePasswordRules = {
      password: [
        { required: true, validator: validatePassword, trigger: 'change' },
        {
          pattern: /^(?=.*\d)(?=.*[A-Za-z]).{5,20}[^\u4e00-\u9fa5]$/,
          message: '密码必须包含字母和数字的非中文组合，长度在6-20之间'
        }
      ],
      passwordConfirm: [{ validator: validateConfirmPassword, trigger: 'change' }],
      oldPassword: [{ required: true }]
    }

    if (!props.isOldPassword) {
      delete baseRules.oldPassword
    }
    return baseRules
  })

  //   onMounted(() => {
  //     console.log('onMounted')
  //   })

  return () => (
    <a-form ref={$$(formRef)} model={formModel} rules={changePasswordRules}>
      {props.isOldPassword && (
        <a-form-item label="原密码" name="oldPassword">
          <a-input-password
            v-model={[formModel.oldPassword, 'value']}
            size="large"
            autocomplete="off"
          />
        </a-form-item>
      )}
      <a-form-item label="新密码" name="password">
        <a-input-password v-model={[formModel.password, 'value']} size="large" autocomplete="off" />
      </a-form-item>
      <a-form-item label="确认密码" name="empPasswordConfirm">
        <a-input-password
          size="large"
          v-model={[formModel.passwordConfirm, 'value']}
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  )
})
