import NsGrid from './src/index.vue'

/* istanbul ignore next */
NsGrid.install = function (app) {
  app.component(NsGrid.name, NsGrid)
}

export default NsGrid
