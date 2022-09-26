import { vueTypes } from '@/utils/vueTypes'
export const dictProps = {
  labelKey: vueTypes.string.def('name'),
  valueKey: vueTypes.string.def('id'),
  url: vueTypes.string,
  listPath: vueTypes.string,
  options: vueTypes.array,
  ajaxData: vueTypes.object
}
