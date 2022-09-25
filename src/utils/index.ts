import type { App, Plugin } from 'vue'
/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component as T & Plugin)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component
}
