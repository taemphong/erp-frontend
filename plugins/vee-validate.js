import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import vue from 'vue'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'กรุณา'
})

extend('addressNumber', {
  validate: value => /^[0-9/]+$/.test(value),
  message: 'กรุณาระบุเป็นตัวเลขหรือเครื่องหมาย / เท่านั้น'
})

vue.component('ValidationObserver', ValidationObserver)
vue.component('ValidationProvider', ValidationProvider)
