const modifyGeneralData = [
  {
    seq: 1,
    id: "qGIhLCei",
    name: "Upstream",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "uAW2Pmmq",
        name: "修改单据（商单号）",
        sourceParticipant: "商单",
        targetParticipant: "修改单据"
      },
      {
        seq: 2,
        id: "oaPySa9Q",
        name: "创建单据（修改项）",
        sourceParticipant: "商单",
        targetParticipant: "修改单据"
      }
    ]
  },
  {
    seq: 2,
    id: "IZug8JUt",
    name: "Application",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "3e0ersHF",
        name: "创建单据",
        sourceParticipant: "修改单据",
        targetParticipant: "单据"
      }
    ]
  },
  {
    seq: 3,
    id: "LnXqTWEq",
    name: "Domain",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "nV8vD2gZ",
        name: "问询",
        sourceParticipant: "单据",
        targetParticipant: "领域服务"
      },
      {
        seq: 2,
        id: "yKvZ8QMi",
        name: "计费",
        sourceParticipant: "单据",
        targetParticipant: "领域服务"
      },
      {
        seq: 3,
        id: "vInoZ7Eb",
        name: "生成修改项",
        sourceParticipant: "单据",
        targetParticipant: "修改项"
      },
      {
        seq: 4,
        id: "jWdT8kCM",
        name: "生成操作单",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        seq: 5,
        id: "Crbrtdrn",
        name: "保存单据",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        seq: 6,
        id: "1Fc2lpdK",
        name: "变更为修改中",
        sourceParticipant: "单据",
        targetParticipant: "操作单"
      },
      {
        seq: 7,
        id: "DlWmjuUK",
        name: "抛超时延迟消息",
        sourceParticipant: "单据",
        targetParticipant: "超时QMQ"
      }
    ]
  },
  {
    seq: 4,
    id: "3CJ9kUUR",
    name: "Infrastructure",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "kVlD0fgC",
        name: "计费API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 2,
        id: "dwyVcJIA",
        name: "单据Repo",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 3,
        id: "gvP0tVxr",
        name: "订单状态机API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 4,
        id: "vbpeAfyj",
        name: "超时QMQ",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 5,
        id: "Y0Qdrz7J",
        name: "支付API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 6,
        id: "grIVNAeJ",
        name: "商单API",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 7,
        id: "CBVGVJUp",
        name: "投诉单据API",
        sourceParticipant: "",
        targetParticipant: ""
      }
    ]
  }
];
export default modifyGeneralData;
