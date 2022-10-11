import { resolve } from 'node:path'

import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import viteCompression from 'vite-plugin-compression' //压缩静态资源
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import legacy from '@vitejs/plugin-legacy'
import {
  VxeTableResolve,
  createStyleImportPlugin
} from 'vite-plugin-style-import'
import type { ConfigEnv, UserConfig } from 'vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    base: `/${env.VITE_GLOB_APP_SHORT_NAME}/`,
    root,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        },
        {
          find: '#',
          replacement: resolve(__dirname, './types')
        }
      ]
    },
    plugins: [
      vue({
        reactivityTransform: true
      }),
      vueJsx(),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()]
      }),
      AutoImport({
        imports: ['vue', 'vue/macros', 'vue-router', 'pinia', '@vueuse/core'],
        dts: resolve(__dirname, 'src/types/auto-imports.d.ts'),
        dirs: [resolve(__dirname, 'src/composables')]
      }),
      Components({
        extensions: ['vue', 'md', 'tsx', 'ts'],
        include: [/\.md$/, /\.vue$/, /\.tsx$/, /\.ts$/],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
            // importLess: true
          })
        ],
        dts: resolve(__dirname, 'src/types/components.d.ts'),
        directoryAsNamespace: true
      }),
      Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' // 生成的压缩包后缀
      }),
      legacy({
        // 为打包后的文件提供传统浏览器兼容性支持
        targets: ['> 1%, last 1 version, ie >= 11'], // 需要兼容的浏览器列表
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(__dirname, 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      })
    ],

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'root-entry-name': 'default',
            hack: `
            true;
            @import "${resolve('./src/styles/_var.less')}"; 
            `
          }
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port: 9527,
      open: true,
      hmr: true,
      proxy: {
        '/apins': {
          target:
            'https://www.fastmock.site/mock/9ce6483c3aa7273b5704990b02622511/apins',
          secure: false,
          rewrite: (path) => path.replace(/^\/apins/, '')
        }
      }
    }
  }
}
