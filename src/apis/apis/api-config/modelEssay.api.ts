/**
 * @ Author: Your name
 * @ Create Time: 2025-06-07 12:32:39
 * @ Modified by: Your name
 * @ Modified time: 2025-07-17 21:47:44
 * @ Description:
 */

import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
  
  modelEssaySave:{
    name:"创建更新单个范文",
    url:"/model-essay/save",

    requestConfig:{
      method:"POST"
    }
  },
  
  modelEssayFind:{
    name:"查询范文",
    url:"/model-essay/find",
    requestConfig:{
      method:"POST"
    }
  },

   modelEssayfindOne:{
    name:"查找单个范文的详情",
    url:"/model-essay/findOne",
    requestConfig:{
      method:"GET"
    }
  },

  modelEssayUpdateMany:{
    name:"批量更新范文",
    url:"/model-essay/updateMany",
    requestConfig:{
      method:"PUT"
    }
  },

  modelEssayDelete:{
    name:"批量删除范文",
    url:"/model-essay/delete",
    requestConfig:{
      method:"delete"
    }
  },
  modelEssayVectorSearch:{
    name:"批量删除范文",
    url:"/model-essay/vectorSearch",
    requestConfig:{
      method:"post"
    }
  },
}
export default api;