/**
 * @ Author: Your name
 * @ Create Time: 2025-06-07 12:32:39
 * @ Modified by: Your name
 * @ Modified time: 2025-07-12 21:26:45
 * @ Description:
 */

import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
  appSave:{
    name:"创建更新单个应用",
    url:"/app/save",
    requestConfig:{
      method:"POST"
    }
  },
  
  appFind:{
    name:"查询应用",
    url:"/app/find",
    requestConfig:{
      method:"POST"
    }
  },

  appUpdateMany:{
    name:"批量更新应用",
    url:"/app/updateMany",
    requestConfig:{
      method:"PUT"
    }
  },

  appDelete:{
    name:"批量删除应用",
    url:"/app/delete",
    requestConfig:{
      method:"delete"
    }
  },
}
export default api;