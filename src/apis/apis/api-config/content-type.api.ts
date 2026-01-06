/**
 * @ Author: Your name
 * @ Create Time: 2025-06-07 12:32:39
 * @ Modified by: Your name
 * @ Modified time: 2025-06-14 13:52:00
 * @ Description:
 */

import type { ApiRecord } from "vmo-umi-request";
const api: ApiRecord<string> = {
  
  contentTypeCategory:{
    name:"分类管理接口",
    url:"/content-type/category",
    requestConfig:{
      method:"POST"
    }
  },
  contentTypeCategoryFind:{
    name:"分类查看列表",
    url:"/content-type/category/find",
    requestConfig:{
      method:"POST"
    }
  },

  contentTypeTag:{
    name:"标签管理接口",
    url:"/content-type/tag",
  },
  contentTypeTagFind:{
    name:"标签管理接口",
    url:"/content-type/tag/find",
  },
  
  contentAssociationTag:{
    name:"分类标签关系管理",
    url:"/content-type/association",
  },
  contentAssociationTagDrop:{
    name:"分类标签关系管理",
    url:"/content-type/association/drop",
    requestConfig:{
      method:"POST"
    }
  },
  contentTypeAssociationFind:{
    name:"分类标签关系管理详情",
    url:"/content-type/association/find",
  }
}
export default api;