import NsTable from './src/Table'
import type { App, Plugin } from 'vue'
/* istanbul ignore next */
NsTable.install = function (app: App) {
  app.component(NsTable.name, NsTable)
  return app
}

export default NsTable as typeof NsTable & Plugin
