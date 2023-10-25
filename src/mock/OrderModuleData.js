const orderModuleData = [
  {
    seq: 1,
    id: "zswtafFJ",
    name: "订单核心系统模块",
    sourceParticipant: "订单",
    targetParticipant: "核心业务",
    children: [
      {
        seq: 1,
        id: "9etr35Y9",
        name: "核心业务模块",
        children: [
          {
            seq: 1,
            id: "xJRQ7r1C",
            name: "新订处理模块",
            children: [
              {
                seq: 1,
                id: "7uYUKKbE",
                name: "确认单据"
              }
            ]
          },
          {
            seq: 2,
            id: "Fkz3Kj9z",
            name: "修改处理模块",
            children: [
              {
                seq: 1,
                id: "lxGS9pb8",
                name: "修改单据"
              }
            ]
          },
          {
            seq: 3,
            id: "HJQMzdLl",
            name: "取消处理模块",
            children: [
              {
                seq: 1,
                id: "CMjDdNbF",
                name: "取消单据"
              }
            ]
          },
          {
            seq: 4,
            id: "PLSxYsDn",
            name: "缺陷场景处理模块",
            children: [
              {
                seq: 1,
                id: "EXiQt3nV",
                name: "满房·变价单据"
              }
            ]
          }
        ]
      },
      {
        seq: 2,
        id: "bSB3Z0Cf",
        name: "基础功能",
        children: [
          {
            seq: 1,
            id: "s8tDrYl4",
            name: "商户处理",
            children: [
              {
                seq: 1,
                id: "u1p4C9Ll",
                name: "发单模块"
              },
              {
                seq: 2,
                id: "futw01MJ",
                name: "派单·选货"
              }
            ]
          },
          {
            seq: 2,
            id: "bRhDfpXs",
            name: "基础功能",
            children: [
              {
                seq: 1,
                id: "mJSDxuUd",
                name: "事件·分配"
              },
              {
                seq: 2,
                id: "9DmtHhEt",
                name: "进线·外呼"
              },
              {
                seq: 3,
                id: "RjqtUQRP",
                name: "投诉单据"
              }
            ]
          },
          {
            seq: 3,
            id: "nCOGHcRe",
            name: "费用处理",
            children: [
              {
                seq: 1,
                id: "x41W6NMO",
                name: "支付网关"
              },
              {
                seq: 2,
                id: "H6YSfzGr",
                name: "费用计算"
              },
              {
                seq: 3,
                id: "lSA0gqjc",
                name: "发票单据"
              },
              {
                seq: 4,
                id: "rHbD2eJK",
                name: "审核·结算处理"
              }
            ]
          }
        ]
      },
      {
        seq: 3,
        id: "5y6KTcrG",
        name: "增值处理模块",
        children: [
          {
            seq: 1,
            id: "qGJYNqK5",
            name: "会员权益"
          },
          {
            seq: 2,
            id: "8JDsb2hV",
            name: "促销·优惠券"
          },
          {
            seq: 3,
            id: "dyOmYgAl",
            name: "保险"
          },
          {
            seq: 4,
            id: "bKgxprs0",
            name: "X产品"
          }
        ]
      }
    ]
  },
  {
    seq: 2,
    id: "GyDZA0w4",
    name: "订单周边系统模块",
    children: [
      {
        seq: 1,
        id: "BNoyrnyf",
        name: "咨询协调模块",
        children: [
          {
            seq: 1,
            id: "HTyp6bk8",
            name: "应急处理单据"
          },
          {
            seq: 2,
            id: "EoQ6vqf3",
            name: "共性处理单据"
          },
          {
            seq: 3,
            id: "wV3luaUA",
            name: "客户咨询单据"
          },
          {
            seq: 4,
            id: "5yeegDwJ",
            name: "商户咨询单据"
          }
        ]
      },
      {
        seq: 2,
        id: "MbphimtA",
        name: "通知处理模块"
      },
      {
        seq: 3,
        id: "4LagbsuB",
        name: "积分返现处理模块"
      },
      {
        seq: 4,
        id: "zaonakFq",
        name: "预控模块"
      }
    ]
  }
];

export default orderModuleData;
