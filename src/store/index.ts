import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

export const store = createPinia()
store.use(
  createPersistedState({
    storage: localStorage,
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  })
)

export function setupStore(app: App<Element>) {
  app.use(store)
}
