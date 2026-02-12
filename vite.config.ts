import { fileURLToPath, URL } from "node:url";
import compressPlugin from "vite-plugin-compression";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import monacoEditorPlugin from "vite-plugin-monaco-editor"; // 1.1.0

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
	// 获取当前模式下的环境变量
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: "./", // 打包后，所有文件的引入地址，设置为相对路径作为基础地址
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
		},
		plugins: [
			vue({
				template: {
					compilerOptions: {
						isCustomElement: (tag) => /^micro-app/.test(tag),
					},
				},
			}),
			//@ts-ignore
			monacoEditorPlugin({
				languageWorkers: ["editorWorkerService", "css", "html", "json", "typescript"],
			}),
			vueJsx(),
			AutoImport({ resolvers: [ElementPlusResolver()] }),
			Components({ resolvers: [ElementPlusResolver()] }),
			compressPlugin({
				// gzip 压缩插件配置
				ext: ".gz", // gz br 自定义扩展名，此处默认".gz"
				algorithm: "gzip", // 采用 brotliCompress gzip 算法
				deleteOriginFile: false, // 是否删除未压缩的原始文件
				threshold: 1025, // 触发压缩的文件下限大小,开启得越大,需要被压缩的文件就越多
			}),
		],
		resolve: {
			alias: {
				"@src": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		server: {
			host: "0.0.0.0",
			port: 5201,
			proxy: {
				"/api": {
					target: "http://localhost:3000", // 代理地址
					changeOrigin: true,
					ws: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					// selfHandleResponse:true,
					// configure:(proxy,_options)=>{
					//   proxy.on('proxyRes', (proxyRes, req, res) => {
					//     if(req.url.split('?')[0].split('/').pop() == 'xhr_streaming'){
					//       // console.log(res,'ddddd');
					//       console.log(res.hasHeader,res.getHeaders());
					//       res.removeHeader("Connection");
					//       res.removeHeader('Origin');
					//       res.setHeader("Origin","");
					//       res.setHeader("Upgrade","websocket");
					//       res.setHeader("Connection","upgrade");
					//       proxyRes.pipe(res);
					//       //
					//     }
					//     proxyRes.pipe(res)
					//   });
					// },
				},
				"/files": {
					target: "https://kyatjmmxdq8crwqo.public.blob.vercel-storage.com", // 代理地址
					changeOrigin: true,
					ws: true,
					rewrite: (path) => path.replace(/^\/files/, ""),
					// selfHandleResponse:true,
					// configure:(proxy,_options)=>{
					//   proxy.on('proxyRes', (proxyRes, req, res) => {
					//     if(req.url.split('?')[0].split('/').pop() == 'xhr_streaming'){
					//       // console.log(res,'ddddd');
					//       console.log(res.hasHeader,res.getHeaders());
					//       res.removeHeader("Connection");
					//       res.removeHeader('Origin');
					//       res.setHeader("Origin","");
					//       res.setHeader("Upgrade","websocket");
					//       res.setHeader("Connection","upgrade");
					//       proxyRes.pipe(res);
					//       //
					//     }
					//     proxyRes.pipe(res)
					//   });
					// },
				},
				// '/socketio': {
				//   target: 'ws://192.168.2.2:18180', // 获取环境变量接口代理地址
				//   changeOrigin: true,
				//   ws:true,
				//   rewrite: (path) => path.replace(/^\/socketio/, '')
				// },
			},
		},
		preview: {
			host: "0.0.0.0",
			port: 5200,
			proxy: {
				"/api": {
					target: "http://localhost:3000", // 代理地址
					changeOrigin: true,
					ws: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					// selfHandleResponse:true,
					// configure:(proxy,_options)=>{
					//   proxy.on('proxyRes', (proxyRes, req, res) => {
					//     if(req.url.split('?')[0].split('/').pop() == 'xhr_streaming'){
					//       // console.log(res,'ddddd');
					//       console.log(res.hasHeader,res.getHeaders());
					//       res.removeHeader("Connection");
					//       res.removeHeader('Origin');
					//       res.setHeader("Origin","");
					//       res.setHeader("Upgrade","websocket");
					//       res.setHeader("Connection","upgrade");
					//       proxyRes.pipe(res);
					//       //
					//     }
					//     proxyRes.pipe(res)
					//   });
					// },
				},
				// '/socketio': {
				//   target: 'ws://192.168.2.2:18180', // 获取环境变量接口代理地址
				//   changeOrigin: true,
				//   ws:true,
				//   rewrite: (path) => path.replace(/^\/socketio/, '')
				// },
			},
		},
		esbuild: {
			// sourcemap:true,
			drop: mode == "production" ? ["console", "debugger"] : [],
		},
	});
};
