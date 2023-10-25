const checkoutEarlyData = [
  {
    seq: 1,
    id: "dnXpWVRZ",
    name: "申请提前离店",
    sourceParticipant: "订单",
    targetParticipant: "修改单据",
    children: [
      {
        seq: 1,
        id: "ef0oVbKg",
        name: "创建单据",
        sourceParticipant: "修改单据",
        targetParticipant: "修改单据"
      },
      {
        seq: 2,
        id: "oTMLH91v",
        name: "创建商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      },
      {
        seq: 3,
        id: "pIhBezwW",
        name: "提交商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务",
        children: [
          {
            seq: 1,
            id: "lHR2n1c6",
            name: "订单提交消息",
            sourceParticipant: "资源单服务",
            targetParticipant: "QMQ"
          }
        ]
      }
    ]
  },
  {
    seq: 2,
    id: "5gLgw3Uh",
    name: "商户处理",
    sourceParticipant: "订单",
    targetParticipant: "确认单据",
    children: [
      {
        seq: 1,
        id: "WB5Pu8TC",
        name: "创建确认单据",
        sourceParticipant: "QMQ",
        targetParticipant: "确认单据"
      },
      {
        seq: 2,
        id: "X0aH8ukl",
        name: "关联修改单据",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      },
      {
        seq: 3,
        id: "YF7VP8BN",
        name: "发单",
        sourceParticipant: "确认单据",
        targetParticipant: "EBK商户"
      },
      {
        seq: 4,
        id: "KUGQtKyf",
        name: "发单回调",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      },
      {
        seq: 5,
        id: "UPbrYnlo",
        name: "商户回传",
        sourceParticipant: "EBK商户",
        targetParticipant: "确认单据"
      },
      {
        seq: 6,
        id: "XJW8UUMt",
        name: "发单回传",
        sourceParticipant: "确认单据",
        targetParticipant: "修改单据"
      }
    ]
  },
  {
    seq: 3,
    id: "plgiDqMn",
    name: "订单修改",
    sourceParticipant: "订单",
    targetParticipant: "修改单据",
    children: [
      {
        seq: 1,
        id: "35dQLagO",
        name: "客商换绑",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      },
      {
        seq: 2,
        id: "lUV2fKhG",
        name: "取消原商单",
        sourceParticipant: "修改单据",
        targetParticipant: "资源单服务"
      }
    ]
  }
];

export default checkoutEarlyData;
