import Form from './Form'
import type { App, Plugin } from 'vue'

/* istanbul ignore next */
Form.install = function (app: App) {
  app.component(Form.name, Form)
  return app
}

export default Form as typeof Form & Plugin
