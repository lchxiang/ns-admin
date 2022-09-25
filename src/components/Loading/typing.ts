/*
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: liwg
 * @LastEditTime: 2022-03-19 10:48:11
 */
import { SizeEnum } from '@/enums/sizeEnum'
export interface LoadingProps {
  tip: string
  size: SizeEnum
  absolute: boolean
  loading: boolean
  background: string
  theme: 'dark' | 'light'
}
