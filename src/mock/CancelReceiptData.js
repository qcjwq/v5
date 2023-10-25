const cancelReceiptData = [
  {
    seq: 1,
    id: "FjWaRu72",
    name: "申请取消",
    sourceParticipant: "订单",
    targetParticipant: "取消单据",
    children: [
      {
        seq: 1,
        id: "LLK11vwj",
        name: "给EBK发取消申请",
        sourceParticipant: "取消单据",
        targetParticipant: "EBK"
      },
      {
        seq: 2,
        id: "eSRwHlqz",
        name: "EBK超时未回复",
        sourceParticipant: "发单模块",
        targetParticipant: "取消单据"
      },
      {
        seq: 3,
        id: "yMKopfzc",
        name: "创事件307213198进人工",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 4,
        id: "YeWSpJzy",
        name: "EBK回传拒绝",
        sourceParticipant: "EBK",
        targetParticipant: "取消单据"
      },
      {
        seq: 5,
        id: "XNdi4C6t",
        name: "取消单据结束",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据"
      },
      {
        seq: 6,
        id: "vWS4WfVi",
        name: "系统对客通知取消失败",
        sourceParticipant: "取消单据",
        targetParticipant: "客人"
      },
      {
        seq: 7,
        id: "hpIhPdSR",
        name: "员工关闭事件307213198",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 8,
        id: "HR55sNDe",
        name: "取消单据结果是拒绝",
        sourceParticipant: "事件系统",
        targetParticipant: "取消单据"
      }
    ]
  },
  {
    seq: 2,
    id: "0pm4I5bz",
    name: "客人再次选线取消",
    sourceParticipant: "订单",
    targetParticipant: "取消单据",
    children: [
      {
        seq: 1,
        id: "pbPCRKUW",
        name: "员工创建事件307222667",
        sourceParticipant: "事件系统",
        targetParticipant: "事件系统"
      },
      {
        seq: 2,
        id: "1hXbPWUr",
        name: "客人提供了相关证明",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据",
        children: [
          {
            seq: 1,
            id: "D1CDTUe6",
            name: "EBK回传拒绝",
            sourceParticipant: "EBK",
            targetParticipant: "取消单据"
          },
          {
            seq: 2,
            id: "NaufG49F",
            name: "在原取消单据上操作发单",
            sourceParticipant: "取消单据",
            targetParticipant: "发单模块"
          }
        ]
      },
      {
        seq: 3,
        id: "UY4ZBYNa",
        name: "员工再次给酒店发单",
        sourceParticipant: "取消单据",
        targetParticipant: "发单模块",
        children: [
          {
            seq: 1,
            id: "5YDg1txk",
            name: "EBK同意免费取消",
            sourceParticipant: "EBK",
            targetParticipant: "取消单据"
          }
        ]
      },
      {
        seq: 4,
        id: "1fbmdQky",
        name: "员工单据录入协商结果，免费取消，单据结束",
        sourceParticipant: "取消单据",
        targetParticipant: "取消单据"
      },
      {
        seq: 5,
        id: "fVJwXpJz",
        name: "回传状态不一致，系统转人工跟进",
        sourceParticipant: "发单模块",
        targetParticipant: "取消单据"
      },
      {
        seq: 6,
        id: "iTnqR65Q",
        name: "事件单307213198重开",
        sourceParticipant: "取消单据",
        targetParticipant: "事件系统"
      }
    ]
  }
];

export default cancelReceiptData;
