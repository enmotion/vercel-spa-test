/**
 * @ Author: Your name
 * @ Create Time: 2025-06-07 12:32:39
 * @ Modified by: Your name
 * @ Modified time: 2025-07-14 13:04:12
 * @ Description:
 */
import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
  
  appreciatesSave:{
    name:"创建更新单个作文亮点",
    url:"/appreciates/save",
    requestConfig:{
      method:"POST"
    }
  },
  
  appreciatesFind:{
    name:"查询作文亮点",
    url:"/appreciates/find",
    requestConfig:{
      method:"POST"
    }
  },

  appreciatesUpdateMany:{
    name:"批量更新作文亮点",
    url:"/appreciates/updateMany",
    requestConfig:{
      method:"PUT"
    }
  },

  appreciatesDelete:{
    name:"批量删除作文亮点",
    url:"/appreciates/delete",
    requestConfig:{
      method:"delete"
    }
  },
}
export default api;