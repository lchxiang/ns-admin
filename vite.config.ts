import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import viteCompression from 'vite-plugin-compression' //压缩静态资源
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
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
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core']
    }),
    Components({
      extensions: ['vue', 'md', 'tsx', 'ts'],
      include: [/\.md$/, /\.vue$/, /\.tsx$/, /\.ts$/],
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          importLess: true
        })
      ],
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
    })
  ],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
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
  }
})
