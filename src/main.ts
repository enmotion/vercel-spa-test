/**
 * @ Author: enmoion
 * @ Create Time: 2023-11-4 10:12:05
 * @ Modified by: Your name
 * @ Modified time: 2025-07-13 13:14:28
 * @ Description:
 * vue3-spa入口文件
 */
import "@src/assets/index.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// import 'vant/lib/index.css';
// import '@src/assets/theme.css';
import Bowser from "bowser"; // 引入浏览器侦测模块
import { createApp, type App } from "vue";
import { createPinia } from "pinia"; // 引入 pinia 管理器;
import { useGlobalComponents } from "@src/comps"; // 导入全局懒加载组件
import { initRouter } from "./router"; // vue-router 路由实例
import { useRouterStore } from "vmo-router";
import { useAppStore, useUserStore } from "@src/stores";
// import microApp from '@micro-zoe/micro-app'
import AppVue from "./App.vue"; //
import { useConfirmPlugin, useMessagePlugin } from "@src/use.lib/publicPlugins";
import { userMenuSampleData } from "@src/pages/login-pg/config/dynamic-router-list";
// import { eventBusOnMessageHandler } from './use.lib/microAppEventBusCenter'
import { useRequestPlugin } from "@src/apis";

let app: App<Element> | null = null;
// const isMicroAppRunTime: boolean = window['__MICRO_APP_ENVIRONMENT__'] || false // 判断当前应用是否运行在 micro-app 框架下

// const str = 'Hello, World!'
// const binaryData = btoa(str)
// console.log(binaryData, str)

window.mount = async () => {
	// 初始化APP
	console.log("aaaa");
	app = createApp(AppVue).use(createPinia());
	app.config.errorHandler = (err, instance, info) => {
		// 处理错误
		// console.error("全局错误捕获:", err);
		//alert("数据可能存在问题，请检查并更改操作。");
	};
	const appStore = await useAppStore();
	const userStore = await useUserStore();
	const routeStore = useRouterStore();
	// appStore.setMicroAppEnvironment(isMicroAppRunTime) // 判断应用是否在 MicroApp 嵌套环境模式，并将该状态传递给全局状态管理器
	appStore.setDevice(Bowser.getParser(window.navigator.userAgent).parse()); //提交设备硬件系统环境数据至全局缓存
	appStore.setScreen({
		breakPoint: 800,
		h: document.body.clientHeight,
		w: document.body.clientWidth,
	}); // 设置当前屏幕信息
	window.addEventListener("resize", function () {
		appStore.setScreen({
			h: document.body.clientHeight,
			w: document.body.clientWidth,
		});
	}); // 添加屏幕侦听

	useGlobalComponents(app); // 全局引入公共组件并装配到根目录下

	// 创建动态路由管理器
	// const router = initRouter({
	//   multipleCatch:import.meta.env.VITE_APP_DYNAMIC_ROUTE_MUTIPLE, // 是否为多路由缓存机制，开启该机制后，路由将支持所有访问过的路由表与初次加载的路由表，全面支持浏览器标签地址黏贴访问形式，前提是缓存共享；
	//   mode:import.meta.env.VITE_APP_ROUTE_HISTORY_MODE, // 路由模式 history | hash
	//   baseRoute:import.meta.env.VITE_APP_SITE_BASE_ROUTER // 基础路由地址 baseRoute
	// }); // 创建路由，配置路由缓存模式为多项还是单项
	console.warn("router loaded after refresh");
	useMessagePlugin(app); // 全局 $message 方法绑定
	useConfirmPlugin(app); // 全局 $confirm
	useRequestPlugin(app); // 绑定请求方法
	const router = initRouter();
	// 微应用的免密登录操纵
	// if (isMicroAppRunTime) {
	//   const data = window.microApp?.getData() // 返回主应用下发的data数据
	//   userStore.setToken(data?.token || {})
	//   userStore.setInfo(data?.info || {})
	//   // window.microApp.addDataListener(eventBusOnMessageHandler, true) // 引用之间的通讯，全部通过消息中心处理器收集处理
	//   // 后台管控路由的情况下，需要启用获取用户菜单行为

	//   // microApp.start({tagName:`micro-app-${import.meta.env.VITE_APP_NAME}`}); // 当出现嵌套子应用情况，需要考虑添加标签尾缀，未测试；
	//   // router.generateRousteByTreeData() //如果存在后端管控路由的情况，在此处装填路由表；
	// }
	console.log(routeStore.getCachedRoutes);
	if (import.meta.env.VITE_APP_ROUTE_BACKEND_RULE) {
		console.log(userMenuSampleData);
		router.reloadRoutes(routeStore.getCachedRoutes); // 用前端菜单装配路由表
		// userStore.setInfo({ name: 'seerr' })
		userStore.setMenu(userMenuSampleData);
		console.log("后台路由获取...");
		// router.generateRousteByTreeData(...res) // 获取后，添加到路由表
	} else {
		console.log(userMenuSampleData);
		router.reloadRoutes(routeStore.getCachedRoutes); // 用前端菜单装配路由表
		// userStore.setInfo({ name: 'seerr' })
		userStore.setMenu(userMenuSampleData);
	}
	app.use(router); // 一定要记得，app.use(router) 必须在 proxyRouter.reloadRoutes 与 proxyRouter.generateRousteByTreeData 之后调用，不然可能会出现路由表未能正确装填的情况;
	console.log("app mount");
	app.mount("#app"); // 构建
	// userStore.setInfo({ name: 'seerr' })
	userStore.setMenu(userMenuSampleData);
};

// 作为子应用时，暴露给主应用的销毁hook
window.unmount = () => {
	console.log("app unmount");
	app?.unmount();
	// window.microApp.removeDataListener(eventBusOnMessageHandler) // 作为子应用时，销毁时，移除消息侦听;
};
// if (!isMicroAppRunTime) {
//   console.log('microApp host:')
//   // microApp?.start() // 只有在主应用情况下，才能执行 microApp.start() 嵌套情况则更加复杂; 见 micro-app 文档
window.mount();
//   // microApp?.addDataListener(eventBusOnMessageHandler,true); // 作为主应用时，开启全局侦听 待测试此消息中心的能力
// }







const sss = {
  "output":[
    {
      "output": {
        "description": "就是文章一开头就设置一个悬念，不让读者一眼就看到底，而是一步步把事件展示开来。这种开头部分适当设置悬念，能让人们产生追寻究竟的阅读兴趣，就好像在美好的大自然中寻幽探胜，愈进愈奇，给人以渐入佳境的感受；具有引人入胜、趣味无穷的效果。",
        "is": true,
        "key": "backgroundOpening",
        "name": "悬念开头",
        "resson": "文章开头写‘我在火星上捡到一块钱，这可不是普通的一块钱，它闪烁着奇异的金属光泽，仿佛蕴含着某种未知的能量’，设置了这块钱不普通且有未知能量的悬念，引发读者追寻究竟的兴趣。"
      }
    },
    {
      "output": {
        "description": "就是指对文章组成的几个部分，采取由点到面或由面到点、点面结合地组织材料、谋篇布局、安排文章层次结构的方法。在写作中采用这种点面结合的构思方法，目的是为了反映事物的本来面貌，揭示事物的本质特征。也就是说，在记叙事件和人物的时候，既要有面上的描写，又要有点上的刻画。用面上的描写是为了反映事物的全貌，用点上的刻画是为了突出事物的特征。运用点面结合构思的文章，不但能够反映事物的全貌，给人以全面、具体、完整、清晰的印象；而且能够突出重点，揭示事物的本质；使文章行文变化有致，开阔流转，从而增强文章的美感。",
        "is": true,
        "key": "combiningPointAndPlane",
        "name": "点面结合",
        "resson": "文中‘火星的天空呈现出淡淡的粉红色，远处的火山群在夕阳下显得格外壮观’是面上描写，展现火星整体环境；‘这块硬币似乎与地球上的完全不同，它的表面刻有复杂的图案，像是某种古老的文字’是点上刻画，突出硬币特征。既有面上描写反映全貌，又有点上刻画突出重点，符合点面结合的构思方法。"
      }
    },
    {
      "output": {
        "description": "构思是指在写作过程中，围绕已确立的立意（中心主旨），对文章的整体内容、结构框架、素材选取、表达顺序等进行全面规划和设计的思维过程。它是将抽象的立意转化为具体写作思路的关键环节，需要作者对“如何组织内容才能更好地表达主题”进行细致思考，比如：选择哪些素材（事件、论据、细节等）来支撑立意，采用何种结构（总分、递进、并列等）安排这些素材，按什么顺序（时间、逻辑、空间等）展开叙述或论证，以及如何设计过渡、照应等，最终形成清晰的写作蓝图，为后续成文提供具体指引。",
        "is": true,
        "key": "compositionPlanning",
        "name": "构思",
        "resson": "文章围绕探索宇宙奥秘的立意进行规划。素材选取独特，以在火星捡到有穿越时空力量的硬币展开故事。按时间和逻辑顺序叙述，先写捡到硬币，接着写穿越到火星，最后写回到地球。有过渡语句，如‘突然，硬币上的图案开始发光’，使情节连贯，形成清晰写作蓝图。"
      }
    },
    {
      "output": {
        "description": "即在立意上刻意求新，从现实生活中不断发现新鲜的问题，发现旧事物的弊端，看到新事物的发展趋势，捕捉生活中的闪光点，从而感知时代的脉搏，努力体现时代精神立意。体现时代精神立意，能够使文章反映时代新面貌，体现时代新精神，创新文章主题，提升文章中心，同时给人以思想深邃、新人耳目之感。",
        "is": true,
        "key": "conceptionReflectingModernSpirit",
        "name": "体现现代精神立意",
        "resson": "作文以在火星捡到有穿越时空力量的一元钱展开，想象新奇。描绘充满科技感的火星世界及火星人对和平与探索的渴望，体现了对宇宙探索的时代精神，结尾表达对宇宙奥秘探索的向往，立意符合体现现代精神立意的标签要求。"
      }
    },
    {
      "output": {
        "description": "照应是写作中一种通过在文章不同部分设置相互关联的内容以形成彼此关照与呼应的写作方法大类，其核心是借助内容间的关联性增强文本的结构严谨性、逻辑连贯性和表达效果，常见的具体表现包括文章内容与标题的呼应、开头与结尾的呼应、前文线索与后文揭示的呼应、特定内容的重复出现形成的呼应，以及提问与回答的呼应等。",
        "is": true,
        "key": "echoing",
        "name": "照应",
        "resson": "文章存在前文线索与后文揭示的呼应，开头提到‘我在火星上捡到一块钱，这可不是普通的一块钱，它闪烁着奇异的金属光泽，仿佛蕴含着某种未知的能量’，后文揭示这块硬币是火星上古老文明的遗物，拥有穿越时空的力量，前后呼应，增强了文本的逻辑连贯性。"
      }
    },
    {
      "output": {
        "description": "又叫首尾呼应，即文章开头部分和结尾部分遥相呼应，使文章结成一个整体。一般写文章，开头提到的内容，结尾要重提，或加深，或拓宽，这就形成了首尾照应。首尾照应使文章有头有尾，首尾圈合，由浅入深，结构完整；主题也得以强调和深化。",
        "is": true,
        "key": "echoingBetweenBeginningAndEnd",
        "name": "首尾照应",
        "resson": "文章开头提到“我在火星上捡到一块钱，这可不是普通的一块钱”，结尾提到“我手中依然紧握着那块神奇的硬币，心中充满了对火星奇遇的无限回味”，开头的“一块钱”和结尾的“硬币”相呼应，都围绕捡到的特殊钱币展开，形成首尾照应。"
      }
    },
    {
      "output": {
        "description": "在文章中，有时为了情节或内容的需要，要在叙写有关情节或事情之前，先有交代或巧设埋伏，以免后文出现的情节感到突然，这种前有交待，后有照应的前伏后应就叫伏笔照应。伏笔照应使故事情节有根有据，来龙去脉清晰自然，文章内容前后一致，叙事显得和谐顺畅。伏笔用得好，能推动故事情节的发展，又能使人猛然醒悟到前文看似闲笔的语句的作用。伏笔照应是写记人记事文章的一项巧妙技法。",
        "is": true,
        "key": "echoingWithForeshadowing",
        "name": "伏笔照应",
        "resson": "文章开头提到‘这可不是普通的一块钱，它闪烁着奇异的金属光泽，仿佛蕴含着某种未知的能量’，为后文硬币发光使‘我’穿越到另一个空间埋下伏笔；‘它的表面刻有复杂的图案，像是某种古老的文字’也为后文火星人说硬币是古老文明遗物相呼应。这些伏笔照应使文章情节发展自然，前后内容一致。"
      }
    },
    {
      "output": {
        "description": "是指通过叙说具体的事例来阐明道理。由于运用具体生动、甚至通俗趣味的典型事例或故事情节作为载体来说明道理，能够达到教育对象、读者更容易从中悟出深刻道理的目的。几乎所有寓言故事都是寓理于事的典范文章。",
        "is": true,
        "key": "embeddingReasonInEvents",
        "name": "寓理于事",
        "resson": "作文讲述在火星捡到能穿越时空硬币并经历火星奇遇的事例，文末点明“宇宙的奥秘无穷无尽，等待着我们去探索和发现”的道理，符合寓理于事的标签要求。"
      }
    },
    {
      "output": {
        "description": "结尾的写作方法是指在文章末尾，通过特定的构思和表达技巧，对全文内容进行收束、升华主题、强化情感或留下余味的写作方式。它是文章结构的重要组成部分，旨在通过简洁而有力的文字，回应开篇的主题或情感，总结全文核心内容，或引发读者进一步的思考与共鸣。无论是抒情收尾、警句点题、自然收束，还是留下耐人寻味的余韵，其核心目的都是让文章的结尾与前文呼应，使全文结构完整、主题鲜明，给读者留下深刻印象。",
        "is": true,
        "key": "ending",
        "name": "结尾",
        "resson": "作文结尾总结了火星奇遇的经历，“心中充满了对火星奇遇的无限回味”回应前文的奇遇故事，“宇宙的奥秘无穷无尽，等待着我们去探索和发现”升华了主题，让文章结构完整，符合结尾标签定义。"
      }
    },
    {
      "output": {
        "description": "警句是最精练、最有力而又含义深刻的语言，是能精确、概括、透辟地说明一个道理的句子。警句大多经过千锤百炼，准确深刻，精警透辟。一篇文章以警句结束，就叫警句结尾。警句结尾，不但能够点明文章主题，显得很有分量；而且能给读者留下鲜明深刻的印象，尤其能使人从中得到启示，悟出哲理。警句结尾有时还给人画龙点睛之感，获篇末点题之妙。",
        "is": true,
        "key": "epigramEnding",
        "name": "警句结尾",
        "resson": "作文结尾‘这次经历让我深刻认识到，宇宙的奥秘无穷无尽，等待着我们去探索和发现’是含义深刻的句子，点明文章主题，能让读者从中得到启示，属于警句结尾。"
      }
    },
    {
      "output": {
        "description": "扩写是一种以原有文本的核心内容、基本框架或关键信息为基础，通过增加细节描写、补充情节、丰富情感、拓展阐释等方式，对文本进行延展和充实，使其内容更具体、丰富、生动的写作技巧。其目的是在不偏离原文主旨的前提下，增强文本的表现力和感染力，满足更细致的表达需求。",
        "is": true,
        "key": "expansion",
        "name": "扩写",
        "resson": "作文围绕‘我在火星上捡到一块钱’展开，增加了捡到钱时火星环境的细节描写，如‘火星的天空呈现出淡淡的粉红色，远处的火山群在夕阳下显得格外壮观’；补充了捡到钱后穿越到火星文明空间、与火星人交流等情节，丰富了故事内容，符合扩写以核心内容为基础进行延展充实的要求。"
      }
    },
    {
      "output": {
        "description": "“第一人称”“第二人称”“第三人称”都是构思时叙述人称的一种表达方式。第一人称指以“我”为作品中的叙述人。即在写文章时，指称说话人自己为“我”或“我们”等；多用于记叙、抒情一类文章。但是，以“我”或“我们”的身份来叙述，“我”“我们”可以是作者自己，也可以是作品中的人物。运用第一人称便于直接表达作者自己的思想感情，容易拉近与读者的距离，使读者进入“我”这个角色；还便于进行详细的心理描写；能使读者产生一种真实、亲切的感觉；可以增强文章的可信度和抒情性。",
        "is": true,
        "key": "firstPerson",
        "name": "第一人称",
        "resson": "作文中多次使用“我”来叙述事件，如“我在火星上捡到一块钱”“我正穿着特制的宇航服”“我好奇地捡起它”等，符合第一人称以“我”为叙述人的定义。"
      }
    },
    {
      "output": {
        "description": "倒叙既是布局谋篇的方法，又是开头的一种方法。即把事件的结果或某个精彩的片段提到文章的开头来写，然后再按事情发展的顺序来写起因和经过。倒叙开头或造成一种悬念，引起读者强烈的阅读兴趣；或文章一开始就造成一种紧张的气氛，引起读者的强烈情绪，然后再按事情的发展顺序娓娓道来。这种方法不仅用于记事，也可以用于其它记叙文。",
        "is": true,
        "key": "flashbackOpening",
        "name": "倒序开头",
        "resson": "作文开头写“我在火星上捡到一块钱，这可不是普通的一块钱，它闪烁着奇异的金属光泽，仿佛蕴含着某种未知的能量”，先给出捡到特殊一块钱这一结果，引起读者好奇。之后按事情发展顺序，写在火星漫步时捡到钱、观察钱、因钱穿越到另一个空间等内容，符合倒序开头的特点。"
      }
    },
    {
      "output": {
        "description": "又叫进程为序。就是指根据事情本身的发展过程和先后顺序，进行叙述、描写的构思方式。进程为序是一种最基本、最常见的构思方法，它一般是先写事件的起因，再写事件发展的经过，最后写事件的结果。因为任何事情、事件都有一个由产生到发展，由发展到高潮，再由高潮到结束的完整过程。用这种方法构思文章，可以使文章的结构层次同整个事件的发展进程取得一致，让读者感到有头有尾，条理分明，也便于读者对事件本身的完整理解，加深记忆，以提高阅读、分析、认识一般事物规律的能力。",
        "is": true,
        "key": "inEventOrder",
        "name": "事件为序",
        "resson": "文章先写事件起因，即‘我’在火星上捡到一块有奇异能量的钱；接着写发展经过，包括观察硬币、被光芒包围穿越到火星空间、与火星人交流等；最后写结果，火星人送‘我’回地球，‘我’回味奇遇，符合事件为序的构思方式。"
      }
    },
    {
      "output": {
        "description": "就是指随着观察者立足点和观察点的不断变换，对要记叙的事物进行多方面的观察和了解，然后再描绘出一幅画卷，逐步展现它的全貌和特点。游记，参观记一类的文章一般情况下，大都采用这种方法构思文章，安排层次，进行谋篇布局。按地点的变换，或者空间位置的变换排列记叙事物的方向、位置的方法很多，如：可以从远写到近，从近写到远；可以从上写到下，从下写到上；也可以从左写到右，从右写到左；或者从内写到外，从外写到内。不过，一切都要按观察者观察的先后来决定。运用空间为序的方法来写文章，可以使文章层次分明、结构严谨，清晰地描述出不同空间的颜色、形态、事物等，从而给读者留下非常深刻的印象。",
        "is": true,
        "key": "inSpatialOrder",
        "name": "空间为序",
        "resson": "作文先写在火星荒原上，描述了火星天空、火山群等，接着写因硬币穿越到充满科技感的另一个空间，最后写回到地球，按空间变换展开，符合空间为序的标签要求。"
      }
    },
    {
      "output": {
        "description": "是指作者以抒发个人的主观感受和思想感情的方式结束全文。抒情结尾，能最后给读者以强烈的感染，增强文章的感染力，而且能唤起读者对某种情感或共鸣或向往或唾弃之情。",
        "is": true,
        "key": "lyricEnding",
        "name": "抒情结尾",
        "resson": "文章结尾‘我手中依然紧握着那块神奇的硬币，心中充满了对火星奇遇的无限回味。这次经历让我深刻认识到，宇宙的奥秘无穷无尽，等待着我们去探索和发现’，作者抒发了对火星奇遇的回味以及对探索宇宙奥秘的向往，以抒发个人主观感受和思想感情的方式结束全文，满足抒情结尾的标签定义。"
      }
    },
    {
      "output": {
        "description": "即顺着文章中所描写的事件的自然发展或人物命运的归结或对提出问题的分析研究作结，以其必然结果而水到渠成自然收尾的方法。这种结尾方法简单、自然，表面上貌似平淡无奇，实际上却能给读者文章干净利落、恰当得体、结构严谨、一气呵成之感。",
        "is": true,
        "key": "naturalConclusionEnding",
        "name": "自然收束结尾",
        "resson": "文章围绕在火星捡到一块钱展开，讲述捡到硬币后穿越到火星文明空间，最后火星人送‘我’回地球，‘我’回味奇遇并认识到宇宙奥秘无穷。结尾顺着事件自然发展，自然收束，给人文章干净利落、结构严谨之感。"
      }
    },
    {
      "output": {
        "description": "开头的写作方法是指在作文开篇时，通过特定的构思和表达技巧，引出文章主题、奠定情感基调、吸引读者注意力的写作方式。它是文章结构的重要组成部分，旨在通过简洁、恰当的文字，快速建立文章的叙事起点、情感氛围或核心议题，为全文的展开做好铺垫。常见的如开门见山直接点题、设置悬念引发好奇、描绘背景交代情境等，都是这一方法在不同场景下的具体运用，其核心目的是让文章开篇既自然又富有吸引力，为后续内容的推进打下基础。",
        "is": true,
        "key": "opening",
        "name": "开头",
        "resson": "作文开头‘我在火星上捡到一块钱，这可不是普通的一块钱，它闪烁着奇异的金属光泽，仿佛蕴含着某种未知的能量’，采用设置悬念的方式，引发读者好奇，自然引出文章主题‘在火星捡到一块有特殊能量的钱的奇遇’，为后续内容推进做好铺垫。"
      }
    },
    {
      "output": {
        "description": "是指作者在行文的过程中，为了突出文章的中心或者是细节，有时抓住文章的题眼，有时抓住某一关键线索，有时则抓住个别细节进行反复地渲染，多次地印证等，这就是反复照应。运用反复照应，不仅可以促进故事情节的自然发展，有力突出文章的中心思想，还使文章显得别具一格，新人耳目。",
        "is": true,
        "key": "repetitiveEchoing",
        "name": "反复照应",
        "resson": "作文围绕‘一块钱’这一关键线索反复照应。开头点明在火星捡到一块钱，描述其奇异特点；中间再次描述捡起它后图案发光带来穿越；结尾回到地球时仍紧握着它。通过多次提及‘一块钱’，促进故事情节发展，突出探索宇宙奥秘的中心思想。"
      }
    },
    {
      "output": {
        "description": "又叫画龙点睛结尾，就是作者在篇末明确说出自己的写作意图。运用这种方法结尾便于读者对主题的领会，帮助读者把握作者的深意。大多数卒章显志结尾的文章，都能收到篇末点题的效果。好的卒章显志结尾既点明了文章的主题，还对文章所表达的内容有深化溢彩的作用。",
        "is": true,
        "key": "revealingThemeAtTheEnding",
        "name": "卒章显志结尾",
        "resson": "文章结尾‘这次经历让我深刻认识到，宇宙的奥秘无穷无尽，等待着我们去探索和发现’，明确说出作者写作意图，点明主题，深化了文章内容，符合卒章显志结尾的定义。"
      }
    },
    {
      "output": {
        "description": "亦称小中见大，或称小题大作。是指通过小题材、小事件和细节来揭示重大主题、反映深广内容的立意方法。其特点在于抓住一事一物、一情一景，从大处着眼、小处落笔，深入发掘，展开联想，为读者创造一个比现实生活更为广阔、更为深远的思想境界。正如人们常说的“一粒沙里见世界，半瓣花上说人情”，谈身边琐事而寄托遥深，论人情世故而放眼世界。因此，一个背影，两只蚂蚁，几盏明灯，一棵榕树等等，皆可着笔，写成美文佳作，而它们的思想蕴含却并不逊于重大题材作品表现的意义。这种以小求深，以小寓远，以小见大的立意方法，可使文章的意境更为深邃，主题更为深刻。",
        "is": true,
        "key": "seeingTheBigFromTheSmall",
        "name": "以小见大",
        "resson": "作文从小题材“在火星捡到一块钱”展开，通过这块钱穿越到火星文明，展现火星科技成就和火星人对和平与探索的渴望，最后得出“宇宙奥秘无穷，等待我们去探索发现”的深刻认识，体现以小见大。"
      }
    },
    {
      "output": {
        "description": "结构的处理是写作中一种通过特定组织方式（如总分式、并列式、对照式、总分总式等结构框架，以及以人为线索、以物为线索、以情为线索、以景为线索、以思想变化或情感起伏为线索等脉络形式），对文章内容进行统筹安排、有序组织，使文本层次清晰、逻辑严谨、内容排布合理的写作技巧。",
        "is": true,
        "key": "structure",
        "name": "结构",
        "resson": "文章以‘一块钱硬币’为线索，先引出捡到硬币，接着写因硬币穿越到火星，再写在火星的见闻，最后回到地球回味奇遇，层次清晰、逻辑严谨，内容排布合理，符合结构处理的写作技巧要求。"
      }
    },
    {
      "output": {
        "description": "开门见山，是一种比喻的说法，意思是说写什么，开头就说什么，直截了当，尽快入题，不拐弯抹角，不拖泥带水。这种开头方法，简洁明快，三言两语，清楚明白，鲜明强烈，使读者一开篇便能把握住文章的脉络与作者的思想感情。是文章常见的开头法之一。",
        "is": true,
        "key": "suspenseOpening",
        "name": "开门见山",
        "resson": "作文开头直接点明“我在火星上捡到一块钱”，直接进入主题，没有多余的铺垫，符合开门见山的标签定义。"
      }
    },
    {
      "output": {
        "description": "即在叙事的过程中，精心选择一件与文章主题和情节密切相关的具体物件，并让它在叙事的各个阶段重复出现，通过各种手段加强它的形象，借此以过渡或直接点明中心思想。这种结构方法便于集中安排情节、描写人物和叙述事件，突出文章的中心思想。",
        "is": true,
        "key": "takingThingsAsClues",
        "name": "以物为线索",
        "resson": "作文围绕‘一块钱硬币’展开，它在文中多次出现。先写在火星捡到硬币，接着因硬币图案发光穿越到火星，火星人介绍硬币是古老文明遗物，最后回到地球仍紧握着硬币，借此点明探索宇宙奥秘的中心思想。"
      }
    },
    {
      "output": {
        "description": "即在结束全文时，不把要表达的深意明白、合盘托出，而是意在言外，或者将深意隐含在文章所描绘的具体艺术形象之中，让读者去想象和回味。运用这种文字含蓄的结尾，让读者不是直接的、而是需经过自己认真地咀嚼品味和发挥想象而后才能领悟到作者的深意，可以收到比明白说出更好的意在言外的艺术效果。",
        "is": true,
        "key": "thoughtProvokingEnding",
        "name": "耐人寻味结尾",
        "resson": "作文结尾“这次经历让我深刻认识到，宇宙的奥秘无穷无尽，等待着我们去探索和发现”，未明确指出后续探索方向和方式等，让读者去想象未来对宇宙的探索，符合耐人寻味结尾的要求。"
      }
    },
    {
      "output": {
        "description": "立意是指在写作过程中，作者根据写作目的、素材特点及想要传递的核心思想，确定文章所要表达的中心主旨或核心观点的过程，其最终形成的就是文章的灵魂——中心思想。简单来说，立意就是明确“写这篇文章要表达什么”，它是文章的核心与统帅，决定了选材、结构、表达等后续环节的方向，直接影响文章的深度和价值。例如，同样写“母爱”，有的立意侧重“母爱在困境中的坚韧”，有的侧重“母爱中的包容与理解”，不同的立意会让文章呈现出不同的核心内涵。",
        "is": true,
        "key": "topicConception",
        "name": "立意",
        "resson": "文章围绕在火星捡到一块有神奇力量的钱展开奇遇故事，结尾点明‘宇宙的奥秘无穷无尽，等待着我们去探索和发现’，明确了文章的中心主旨，体现了立意这一标签要求。"
      }
    }
  ]
}

console.log(sss.output.map(item=>({
  name:item.output.name,
  resson:item.output.resson,
})))