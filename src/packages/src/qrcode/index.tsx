import Qrcode from './Qrcode'
import type { App, Plugin } from 'vue'
/* istanbul ignore next */
Qrcode.install = function (app: App) {
  app.component(Qrcode.name, Qrcode)
  return app
}

export default Qrcode as typeof Qrcode & Plugin
