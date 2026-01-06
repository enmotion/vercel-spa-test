/**
 * 公共工具函数库
 * 包含金额转换、拼音转换、数据验证等通用功能
 */

import { pinyin } from "pinyin-pro"; 

/**
 * 将服务端金额转换为显示金额
 * @param value - 服务端金额值（毫厘单位）
 * @param t - 转换基数，默认为10000
 * @returns 转换后的显示金额（保留4位小数）
 * @example
 * getConvertAmount(1000000) // 返回 100.0000
 */
export function getConvertAmount(value:number, t:number = 10000):number{
  return parseFloat((value / t).toFixed(4))
}

/**
 * 将显示金额转换为服务端金额
 * @param value - 显示金额值
 * @param t - 转换基数，默认为10000
 * @returns 转换后的服务端金额（毫厘单位）
 * @example
 * setConvertAmount(100.5) // 返回 1005000
 */
export function setConvertAmount(value:number, t:number = 10000):number{
  return Math.floor(value * t)
}

/**
 * 生成或获取自动键值
 * @param ns - 需要转换的字符串
 * @param current - 当前键值，如果存在则直接返回
 * @returns 转换后的键值（大写字母，无空格）
 * @example
 * getConvertAutoKey('你好世界') // 返回 'NHSJ'
 * getConvertAutoKey('', 'ABC') // 返回 'ABC'
 */
export function getConvertAutoKey(ns:string='',current:string=''){
  return !current ? pinyin(ns,{ pattern: 'first', toneType: 'none', type: 'string' }).replace(/\s/g,'').toUpperCase()??'' : current
}

/**
 * 验证键值格式
 * @param key - 需要验证的键值
 * @param min - 最小长度
 * @param max - 最大长度
 * @returns 是否符合格式要求
 * @description
 * 规则：
 * 1. 以字母或数字开头
 * 2. 只能包含字母、数字和连字符
 * 3. 长度在min和max之间
 * @example
 * isValidateKeyValue('abc-123', 2, 10) // 返回 true
 */
export function isValidateKeyValue(key:string, min:number, max:number,){
  const regx = new RegExp(`^[a-zA-Z0-9]([a-zA-Z0-9-]{${min},${max}})$`,'g')
  return regx.test(key);
}

/**
 * 验证名称格式
 * @param key - 需要验证的名称
 * @param min - 最小长度
 * @param max - 最大长度
 * @returns 是否符合格式要求
 * @description
 * 规则：
 * 1. 以中文字符开头
 * 2. 只能包含中文、数字和连字符
 * 3. 长度在min和max之间
 * @example
 * isValidateNameValue('测试-123', 2, 10) // 返回 true
 */
export function isValidateNameValue(key:string, min:number, max:number,){
  const regx = new RegExp(`^[\u4e00-\u9fa5]([0-9\u4e00-\u9fa5-]{${min},${max}})$`,'g')
  return regx.test(key);
}