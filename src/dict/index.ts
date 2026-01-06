import type { TagItem } from "@src/use.lib/customeFormatter"

// 正常启用禁用标签
export const statusDict: Record<string | number, TagItem> = {
  0: { label: '禁用', type: 'info', },
  1: { label: '启用', type: 'success', }
}

export const productSkuStatus: Record<string | number, TagItem> = {
  0: { label: '下架', type: 'info', },
  1: { label: '上架', type: 'success', }
}

export const IsFixedDict: Record<string | number, TagItem> = {
  0: { label: '否', type: 'info', },
  1: { label: '是', type: 'success', }
}

export const productSkuType: Record<string | number, TagItem> = {
  'cash': { label: '现金', type: 'warning', },
  'prize': { label: '奖金', type: 'primary', }
}

// 收入支出
export const InOrOutDict: Record<string | number, TagItem> = {
  in: { label: '入', type: 'warning', },
  out: { label: '出', type: 'success', }

}

// 待审核已审核
export const ReviewOrReviewed: Record<string | number, TagItem> = {
  0: { label: '待审核', type: 'primary', },
  1: { label: '已审核', type: 'info', }
}

export const SaleOrderStatus: Record<string | number, TagItem> = {
  ...ReviewOrReviewed,
  2: { label: '生产排期', type: 'warning', },
  3: { label: '完成', type: 'success', }
}

// 待定，确认
export const PendingOrChecked: Record<string | number, TagItem> = {
  0: { label: '待定', type: 'primary', },
  1: { label: '确认', type: 'info', }
}

// 款项科目
export const PaymentType: Record<string | number, TagItem> = {
  "cash": { label: '现金', type: 'info', },
  "material": { label: '物料', type: 'info', },
  "logistics": { label: '物流', type: 'info', }
}

// 预售单类型
export const SaleOrderType: Record<string | number, TagItem> = {
  "book": { label: '预订', type: 'success', },
  "cancel": { label: '退订', type: 'danger', }
}

// 首付款科目
export const transactionType: Record<string | number, TagItem> = {
  "dealer-logistics-in": { label: '经销商物流充值', type: 'warning', },
  "dealer-material-in": { label: '经销商物料充值', type: 'warning', },
  "dealer-cash-in": { label: '经销商现金充值', type: 'warning', },
  "supplire-returns-in": { label: '供应商退款', type: 'warning', },
  "fixed-in": { label: '修正盈余', type: 'warning', },
  "fund-allocation-in": { label: '资金调拨', type: 'primary', },
  "fixed-out": { label: '修正亏损', type: 'success', },
  "dealer-returns-out": { label: '经销商退款', type: 'success', },
  "supplier-pay-out": { label: '供应商结算', type: 'success', },
}
export const DealerPerSaveFlowType: Record<string | number, TagItem> = {
  "dealer-presale-in": { label: '预售预订', type: 'warning', },
  "dealer-presale-out": { label: '预售退订', type: 'success', },
  "dealer-presale-fix": { label: '预存修正', type: 'danger', },
  "dealer-presale-pick": { label: '销售提货', type: 'success', },
  "dealer-cash-fix": { label: '账户修正', type: 'danger', },
  "dealer-sale-out": { label: '销售扣款', type: 'success', },
  "dealer-sale-in": { label: '销售退货', type: 'warning', },
  "dealer-overdue": { label: '结算欠款', type: 'success', },
  "cash-in": { label: '现金充值', type: 'warning', },
  "cash-out": { label: '现金退款', type: 'success', },
}
export const DealerCashFlowType: Record<string | number, TagItem> = {
  "pre-sale-out": { label: '预售预订', type: 'success', },
  "dealer-sale-out": { label: '销售扣款', type: 'success', },
  "dealer-overdue": { label: '结算欠款', type: 'success', },
  "cash-out": { label: '现金账户退款', type: 'success', },
  "logistics-out": { label: '物流账户退款', type: 'success', },
  "material-out": { label: '物料账户退款', type: 'success', },

  "dealer-cash-fix": { label: '现金账户修正', type: 'danger', },
  "dealer-logistics-fix": { label: '物流账户修正', type: 'danger', },
  "dealer-material-fix": { label: '物料账户修正', type: 'danger', },

  "pre-sale-in": { label: '预售退订', type: 'warning', },
  "dealer-sale-in": { label: '销售退货', type: 'warning', },
  "cash-in": { label: '现金账户充值', type: 'warning', },
  "logistics-in": { label: '物流账户充值', type: 'warning', },
  "material-in": { label: '物料账户充值', type: 'warning', },
}
export const DealerBonusType: Record<string | number, TagItem> = {
  "dealer-bonus-in": { label: '奖票兑换', type: 'warning', },
  "dealer-bonus-out": { label: '商品兑换', type: 'success', },
  "dealer-bonus-fix": { label: '奖金修正', type: 'danger', },
}

export const ProductSkuType: Record<string | number, TagItem> = {
  "cash": { label: '现金SKU', type: 'warning', },
  "prize": { label: '奖金SKU', type: 'success', }
}