/*
 * @description:
 * @Author: liwg
 * @Date: 2022-10-17 10:25:34
 * @LastEditors: liwg
 * @LastEditTime: 2022-10-17 16:12:57
 */
import type { NsQrcodeOptions } from './types'
import type {
  DotType,
  DrawType,
  ErrorCorrectionLevel,
  Mode,
  TypeNumber
} from 'qr-code-styling'
export const defaultOptions: NsQrcodeOptions = {
  width: 300,
  height: 300,
  type: 'svg' as DrawType,
  data: '',
  image: '',
  margin: 3,
  qrOptions: {
    typeNumber: 5 as TypeNumber,
    mode: 'Byte' as Mode,
    errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 20,
    crossOrigin: 'anonymous'
  },
  dotsOptions: {
    color: '#41b583',
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
    // },
    type: 'rounded' as DotType
  },
  backgroundOptions: {
    color: '#ffffff'
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
    // },
  },
  cornersSquareOptions: {
    // color: '#35495E',
    // type: 'extra-rounded' as CornerSquareType
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
    // },
  },
  cornersDotOptions: {
    // color: '#35495E',
    // type: 'dot' as CornerDotType
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
    // },
  },
  border: {
    show: true,
    width: 3,
    height: 40,
    padding: 5,
    color: '#41b583'
  }
}
