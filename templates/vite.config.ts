import vue from '@vitejs/plugin-vue'
import { ConfigEnv } from 'vite'
import { UserConfigExport } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  return {
    base: '/',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src'
        }
      ]
    },
    server: {
      // 服务配置
      port: 6001, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy: {
        '/api': {
          target: 'http://10.160.40.199:30010/', // 研发云环境
          ws: true,
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id, { getModuleInfo }) {
            const reg = /(.*)\/src\/components\/(.*)/
            if (reg.test(id)) {
              const importersLen = getModuleInfo(id)?.importers.length
              // 被多处引用
              if (importersLen && importersLen > 1) {
                return 'common'
              }
            }
          }
        }
      },
      assetsDir: 'static',
      sourcemap: mode !== 'production',
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true
        }
      }
    },
    css: {
      modules: {
        //* css模块化
        // css模块化 文件以.module.[css|less|scss]结尾
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        hashPrefix: 'prefix',
        localsConvention: 'camelCaseOnly'
      },
      preprocessorOptions: {
        scss: {}
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Chrome > 31', 'ff > 31', 'ie >= 8']
          })
        ]
      }
    },
    plugins: [
      vue(),
      // JSX支持
      vueJsx(),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'md', 'tsx'],
        deep: true,
        dts: 'types/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ]
  }
}
