/**
 * @ Author: Your name
 * @ Create Time: 2025-06-07 12:32:39
 * @ Modified by: Your name
 * @ Modified time: 2025-07-05 23:13:22
 * @ Description:
 */

import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
  
  problemsSave:{
    name:"创建更新单个作文毛病",
    url:"/problems/save",
    requestConfig:{
      method:"POST"
    }
  },
  
  problemsFind:{
    name:"查询作文毛病",
    url:"/problems/find",
    requestConfig:{
      method:"POST"
    }
  },

  problemsUpdateMany:{
    name:"批量更新作文毛病",
    url:"/problems/updateMany",
    requestConfig:{
      method:"PUT"
    }
  },

  problemsDelete:{
    name:"批量删除作文毛病",
    url:"/problems/delete",
    requestConfig:{
      method:"delete"
    }
  },
}
export default api;