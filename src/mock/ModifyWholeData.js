const modifyWholeData = [
  {
    seq: 1,
    id: "4dKvKxry",
    appId: "100002669",
    name: "修改问询",
    sourceParticipant: "订单",
    targetParticipant: "订单详情服务"
  },
  {
    seq: 2,
    id: "0PqLql1r",
    appId: "100039557",
    name: "修改选房",
    sourceParticipant: "订单",
    targetParticipant: "房型集成服务"
  },
  {
    seq: 3,
    id: "Zt1UYLpi",
    appId: "100039557",
    name: "申请修改",
    sourceParticipant: "订单",
    targetParticipant: "订单操作服务",
    children: [
      {
        seq: 1,
        id: "ECF2H5TK",
        appId: "100036066",
        name: "创建修改单据",
        sourceParticipant: "订单操作服务",
        targetParticipant: "修改单据",
        children: [
          {
            seq: 1,
            id: "1Y5MbySt",
            appId: "",
            name: "创建修改申请单",
            sourceParticipant: "修改单据",
            targetParticipant: "修改单据",
            children: [
              {
                seq: 1,
                id: "sKzNTp4f",
                appId: "",
                name: "记录客人修改诉求",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据"
              },
              {
                seq: 2,
                id: "HGx28r2Y",
                appId: "",
                name: "记录修改前后对比数据",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据"
              }
            ]
          },
          {
            seq: 2,
            id: "fIlMIaUQ",
            appId: "",
            name: "创建修改操作单",
            sourceParticipant: "修改单据",
            targetParticipant: "修改单据"
          },
          {
            seq: 3,
            id: "Myw3Sbt1",
            appId: "100039557",
            name: "创建订单",
            sourceParticipant: "",
            targetParticipant: "",
            children: [
              {
                seq: 1,
                id: "aAyB2wlI",
                appId: "100017834",
                name: "订单生成创建新单",
                sourceParticipant: "修改单据",
                targetParticipant: "订单生成服务",
                children: [
                  {
                    seq: 1,
                    id: "sOCyZ5fu",
                    appId: "100017834",
                    name: "生成订单",
                    sourceParticipant: "订单生成服务",
                    targetParticipant: "订单生成服务"
                  },
                  {
                    seq: 2,
                    id: "nH1SmbFb",
                    appId: "",
                    name: "扣减库存",
                    sourceParticipant: "订单生成服务",
                    targetParticipant: "订单生成服务"
                  },
                  {
                    seq: 3,
                    id: "QCi8NzQe",
                    appId: "",
                    name: "订单提交",
                    sourceParticipant: "订单生成服务",
                    targetParticipant: "订单生成服务"
                  },
                  {
                    seq: 4,
                    id: "QFXoWEKi",
                    appId: "100027546",
                    name: "订单同步服务",
                    sourceParticipant: "订单生成服务",
                    targetParticipant: "订单同步服务",
                    children: [
                      {
                        seq: 1,
                        id: "wdB1xsEX",
                        appId: "100027546",
                        name: "创新新商单",
                        sourceParticipant: "订单同步服务",
                        targetParticipant: "订单同步服务"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            seq: 4,
            id: "SlUCN8S9",
            appId: "",
            name: "创建新单结果",
            sourceParticipant: "订单生成服务",
            targetParticipant: "修改单据",
            children: [
              {
                seq: 1,
                id: "EuNdhhvh",
                appId: "",
                name: "成功",
                isAlt: true,
                sourceParticipant: "订单生成服务",
                targetParticipant: "修改单据"
              },
              {
                seq: 2,
                id: "uytdPP5U",
                appId: "",
                name: "失败",
                isAlt: true,
                sourceParticipant: "订单生成服务",
                targetParticipant: "修改单据",
                children: [
                  {
                    seq: 1,
                    id: "H581XyjR",
                    appId: "",
                    name: "【创单失败子流程】",
                    sourceParticipant: "修改单据",
                    targetParticipant: "修改单据"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        seq: 2,
        id: "Bop6tWNw",
        appId: "",
        name: "订单支付",
        sourceParticipant: "订单",
        targetParticipant: "订单支付服务",
        children: [
          {
            seq: 1,
            id: "tPmkQ8st",
            appId: "",
            name: "订单多退少补",
            sourceParticipant: "订单",
            targetParticipant: "修改单据",
            children: [
              {
                seq: 1,
                id: "kapJFW6l",
                appId: "",
                name: "补款",
                sourceParticipant: "修改单据",
                targetParticipant: "订单支付服务",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "7RpBSTNJ",
                    appId: "",
                    name: "Offline渠道发送支付信息",
                    sourceParticipant: "修改单据",
                    targetParticipant: "客户通知服务",
                    isAlt: true,
                    children: [
                      {
                        seq: 1,
                        id: "R7mWEFRt",
                        appId: "",
                        name: "国内发短信",
                        sourceParticipant: "客户通知服务",
                        targetParticipant: "客户通知服务",
                        isAlt: true
                      },
                      {
                        seq: 2,
                        id: "qh5TFZKo",
                        appId: "",
                        name: "海外发EML",
                        sourceParticipant: "客户通知服务",
                        targetParticipant: "客户通知服务",
                        isAlt: true
                      }
                    ]
                  },
                  {
                    seq: 2,
                    id: "zg5adtfp",
                    appId: "",
                    name: "非Offline渠道跳转到收银台",
                    sourceParticipant: "修改单据",
                    targetParticipant: "支付收银台",
                    isAlt: true
                  }
                ]
              },
              {
                seq: 2,
                id: "HTKXSDFq",
                appId: "",
                name: "退款",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据",
                isAlt: true
              },
              {
                seq: 3,
                id: "E7IDXcG6",
                appId: "",
                name: "无差价",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据",
                isAlt: true
              }
            ]
          },
          {
            seq: 2,
            id: "odZ2osmA",
            appId: "",
            name: "客人付款",
            sourceParticipant: "订单",
            targetParticipant: "支付收银台"
          },
          {
            seq: 3,
            id: "a0TWeKk9",
            appId: "",
            name: "收集支付结果",
            sourceParticipant: "支付收银台",
            targetParticipant: "订单支付服务",
            children: [
              {
                seq: 1,
                id: "4FuScbTR",
                appId: "",
                name: "订单支付成功",
                sourceParticipant: "支付收银台",
                targetParticipant: "订单支付服务",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "SvEBYmgs",
                    appId: "",
                    name: "抛送支付结果消息",
                    sourceParticipant: "订单支付服务",
                    targetParticipant: "QMQ"
                  }
                ]
              },
              {
                seq: 2,
                id: "VFUW5fyc",
                appId: "",
                name: "订单支付失败",
                sourceParticipant: "支付收银台",
                targetParticipant: "订单支付服务",
                isAlt: true
              }
            ]
          },
          {
            seq: 4,
            id: "27pBHWZq",
            appId: "",
            name: "监听支付结果消息",
            sourceParticipant: "QMQ",
            targetParticipant: "修改单据",
            children: [
              {
                seq: 1,
                id: "aQnsxSaf",
                appId: "",
                name: "支付成功",
                sourceParticipant: "QMQ",
                targetParticipant: "修改单据",
                isAlt: true
              },
              {
                seq: 2,
                id: "y7cRYArm",
                appId: "",
                name: "支付失败",
                sourceParticipant: "QMQ",
                targetParticipant: "修改单据",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "TtDOsc4p",
                    appId: "",
                    name: "【支付失败子流程】",
                    sourceParticipant: "修改单据",
                    targetParticipant: "修改单据"
                  }
                ]
              },
              {
                seq: 3,
                id: "BrViKrdO",
                appId: "",
                name: "支付超时",
                sourceParticipant: "QMQ",
                targetParticipant: "修改单据",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "XquuNkoL",
                    appId: "",
                    name: "【支付超时子流程】",
                    sourceParticipant: "修改单据",
                    targetParticipant: "修改单据"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        seq: 3,
        id: "53GOuTn1",
        appId: "",
        name: "创建取消操作单",
        sourceParticipant: "修改单据",
        targetParticipant: "取消单据",
        children: [
          {
            seq: 1,
            id: "FMghXndn",
            appId: "",
            name: "发取消单",
            sourceParticipant: "取消单据",
            targetParticipant: "发单模块",
            children: [
              {
                seq: 1,
                id: "FyTANsNM",
                appId: "",
                name: "对商发单（取消类型）",
                sourceParticipant: "发单模块",
                targetParticipant: "商户系统"
              },
              {
                seq: 2,
                id: "Do8oFPmP",
                appId: "",
                name: "发单结果回调",
                sourceParticipant: "商户系统",
                targetParticipant: "发单模块",
                children: [
                  {
                    seq: 1,
                    id: "Ty9hhcmD",
                    appId: "",
                    name: "发单成功",
                    sourceParticipant: "商户系统",
                    targetParticipant: "发单模块",
                    isAlt: true
                  },
                  {
                    seq: 2,
                    id: "2mcsNmXe",
                    appId: "",
                    name: "发单失败",
                    sourceParticipant: "商户系统",
                    targetParticipant: "发单模块",
                    isAlt: true,
                    children: [
                      {
                        seq: 1,
                        id: "a4MYYy37",
                        appId: "",
                        name: "发单重试",
                        sourceParticipant: "发单模块",
                        targetParticipant: "发单模块"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            seq: 2,
            id: "Nv7T4GOm",
            appId: "",
            name: "商户回传结果",
            sourceParticipant: "商户系统",
            targetParticipant: "发单模块",
            children: [
              {
                seq: 1,
                id: "Cwzyywkh",
                appId: "",
                name: "商户同意取消",
                sourceParticipant: "商户系统",
                targetParticipant: "发单模块",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "hLzzVVHi",
                    appId: "",
                    name: "取消订单（原商单）",
                    sourceParticipant: "取消单据",
                    targetParticipant: "资源单服务",
                    children: [
                      {
                        seq: 1,
                        id: "mwf58p4H",
                        appId: "",
                        name: "抛送原商单取消消息",
                        sourceParticipant: "资源单服务",
                        targetParticipant: "QMQ"
                      }
                    ]
                  }
                ]
              },
              {
                seq: 2,
                id: "KhIuEsHT",
                appId: "",
                name: "商户拒绝取消",
                sourceParticipant: "商户系统",
                targetParticipant: "发单模块",
                isAlt: true
              },
              {
                seq: 3,
                id: "a1iuv0YC",
                appId: "",
                name: "商户回传超时",
                sourceParticipant: "商户系统",
                targetParticipant: "发单模块",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "9AOoSnvp",
                    appId: "",
                    name: "取消单据进人",
                    sourceParticipant: "取消单据",
                    targetParticipant: "事件系统"
                  }
                ]
              }
            ]
          },
          {
            seq: 3,
            id: "ueMD1xNF",
            appId: "",
            name: "抛送取消操作单结果消息",
            sourceParticipant: "取消单据",
            targetParticipant: "取消单据",
            children: [
              {
                seq: 1,
                id: "HfVGsbtB",
                appId: "",
                name: "取消操作单成功",
                sourceParticipant: "取消单据",
                targetParticipant: "QMQ",
                isAlt: true
              },
              {
                seq: 2,
                id: "FY461fD3",
                appId: "",
                name: "取消操作单失败",
                sourceParticipant: "取消单据",
                targetParticipant: "QMQ",
                isAlt: true
              }
            ]
          },
          {
            seq: 4,
            id: "gVt8eII2",
            appId: "",
            name: "监听取消操作单结果消息",
            sourceParticipant: "QMQ",
            targetParticipant: "修改单据",
            children: [
              {
                seq: 1,
                id: "7FVWiXk0",
                appId: "",
                name: "取消成功",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "vGmrwkv1",
                    appId: "",
                    name: "客商单换绑",
                    sourceParticipant: "修改单据",
                    targetParticipant: "资源单服务",
                    children: [
                      {
                        seq: 1,
                        id: "a9STfpDD",
                        appId: "",
                        name: "客单绑定到新商单",
                        sourceParticipant: "资源单服务",
                        targetParticipant: "资源单服务"
                      }
                    ]
                  },
                  {
                    seq: 2,
                    id: "on5QSTXU",
                    appId: "",
                    name: "提交商单（新商单）",
                    sourceParticipant: "修改单据",
                    targetParticipant: "资源单服务",
                    children: [
                      {
                        seq: 1,
                        id: "wWXsV31R",
                        appId: "",
                        name: "抛送新商单提交消息",
                        sourceParticipant: "资源单服务",
                        targetParticipant: "QMQ"
                      }
                    ]
                  }
                ]
              },
              {
                seq: 2,
                id: "45xXWa7k",
                appId: "",
                name: "取消失败",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "lWpuXZOP",
                    appId: "",
                    name: "【取消失败子流程】",
                    sourceParticipant: "修改单据",
                    targetParticipant: "取消单据"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        seq: 4,
        id: "RQm1XkE8",
        appId: "",
        name: "创建新订确认单",
        sourceParticipant: "修改单据",
        targetParticipant: "确认单据",
        children: [
          {
            seq: 1,
            id: "IpcPNFJM",
            appId: "",
            name: "监听商单提交消息",
            sourceParticipant: "QMQ",
            targetParticipant: "确认单据",
            children: [
              {
                seq: 1,
                id: "1LbmSEVv",
                appId: "",
                name: "创建新订确认单",
                sourceParticipant: "确认单据",
                targetParticipant: "确认单据"
              }
            ]
          },
          {
            seq: 2,
            id: "9uIaXYwK",
            appId: "",
            name: "发确认单",
            sourceParticipant: "确认单据",
            targetParticipant: "发单模块",
            children: [
              {
                seq: 1,
                id: "uRdvIarh",
                appId: "",
                name: "对商发单（新订类型）",
                sourceParticipant: "发单模块",
                targetParticipant: "商户系统"
              },
              {
                seq: 2,
                id: "tBYBwcoL",
                appId: "",
                name: "发单结果回调",
                sourceParticipant: "商户系统",
                targetParticipant: "发单模块",
                children: [
                  {
                    seq: 1,
                    id: "4JotCbY7",
                    appId: "",
                    name: "发单成功",
                    sourceParticipant: "商户系统",
                    targetParticipant: "发单模块",
                    isAlt: true
                  },
                  {
                    seq: 2,
                    id: "q3w9Bd4s",
                    appId: "",
                    name: "发单失败",
                    sourceParticipant: "商户系统",
                    targetParticipant: "发单模块",
                    isAlt: true,
                    children: [
                      {
                        seq: 1,
                        id: "9MEJbhP9",
                        appId: "",
                        name: "发单重试",
                        sourceParticipant: "发单模块",
                        targetParticipant: "发单模块"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            seq: 3,
            id: "GY0BBEbV",
            appId: "",
            name: "商户回传结果",
            sourceParticipant: "商户系统",
            targetParticipant: "发单模块",
            children: [
              {
                seq: 1,
                id: "vxlgnb3k",
                appId: "",
                name: "商户同意新订",
                sourceParticipant: "发单模块",
                targetParticipant: "确认单据",
                isAlt: true
              },
              {
                seq: 2,
                id: "XldaVKsC",
                appId: "",
                name: "商户拒绝新订",
                sourceParticipant: "发单模块",
                targetParticipant: "确认单据",
                isAlt: true
              },
              {
                seq: 3,
                id: "ESMst4Lj",
                appId: "",
                name: "商户回传超时",
                sourceParticipant: "发单模块",
                targetParticipant: "确认单据",
                isAlt: true
              }
            ]
          },
          {
            seq: 4,
            id: "44nDottt",
            appId: "",
            name: "抛送新订确认结果消息",
            sourceParticipant: "确认单据",
            targetParticipant: "确认单据",
            children: [
              {
                seq: 1,
                id: "f9bFJcDu",
                appId: "",
                name: "新订操作成功",
                sourceParticipant: "确认单据",
                targetParticipant: "QMQ",
                isAlt: true
              },
              {
                seq: 2,
                id: "hoReDFVP",
                appId: "",
                name: "新订操作失败",
                sourceParticipant: "确认单据",
                targetParticipant: "QMQ",
                isAlt: true,
                children: [
                  {
                    seq: 1,
                    id: "SI5cDR9e",
                    appId: "",
                    name: "【新订失败子流程】",
                    sourceParticipant: "确认单据",
                    targetParticipant: "修改单据"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    seq: 4,
    id: "IuqIZ7Nc",
    appId: "",
    name: "商户处理",
    sourceParticipant: "修改单据",
    targetParticipant: "修改单据",
    children: [
      {
        seq: 1,
        id: "z2ovM6HU",
        appId: "",
        name: "处理取消新订结果",
        sourceParticipant: "修改单据",
        targetParticipant: "修改单据",
        children: [
          {
            seq: 1,
            id: "WYLn4uFH",
            appId: "",
            name: "取消成功，新订成功",
            sourceParticipant: "修改单据",
            targetParticipant: "修改单据",
            isAlt: true,
            children: [
              {
                seq: 1,
                id: "2Yoh1eSD",
                appId: "",
                name: "修改单据成功",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据"
              }
            ]
          },
          {
            seq: 2,
            id: "m0PTopls",
            appId: "",
            name: "取消成功，新订失败",
            sourceParticipant: "修改单据",
            targetParticipant: "修改单据",
            isAlt: true,
            children: [
              {
                seq: 1,
                id: "y0clqe4y",
                appId: "",
                name: "修改单据失败",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据"
              }
            ]
          },
          {
            seq: 3,
            id: "T0CsiJ73",
            appId: "",
            name: "取消失败",
            sourceParticipant: "修改单据",
            targetParticipant: "修改单据",
            isAlt: true,
            children: [
              {
                seq: 1,
                id: "fSrR6RqC",
                appId: "",
                name: "修改单据失败",
                sourceParticipant: "修改单据",
                targetParticipant: "修改单据"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    seq: 5,
    id: "ZbcnmxVK",
    appId: "",
    name: "修改后处理",
    sourceParticipant: "修改单据",
    targetParticipant: "修改单据"
  },
  {
    seq: 6,
    id: "IzznRdUP",
    appId: "",
    name: "口头协商",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "7rsV3IRO",
        appId: "",
        name: "取消口头协商",
        sourceParticipant: "",
        targetParticipant: ""
      },
      {
        seq: 2,
        id: "R9dVsV4L",
        appId: "",
        name: "新订口头协商",
        sourceParticipant: "",
        targetParticipant: ""
      }
    ]
  },
  {
    seq: 7,
    id: "f4rzg2BR",
    appId: "",
    name: "催",
    sourceParticipant: "",
    targetParticipant: "",
    children: [
      {
        seq: 1,
        id: "xqf0EWWJ",
        appId: "",
        name: "假催",
        sourceParticipant: "",
        targetParticipant: "",
        isAlt: true
      },
      {
        seq: 2,
        id: "f0WKGCvU",
        appId: "",
        name: "真催",
        sourceParticipant: "",
        targetParticipant: "",
        isAlt: true
      }
    ]
  },
  {
    seq: 8,
    id: "9XdJC7MN",
    appId: "",
    name: "修改进度轨迹",
    sourceParticipant: "",
    targetParticipant: ""
  },
  {
    seq: 9,
    id: "RudgzNQB",
    appId: "",
    name: "修改对比项",
    sourceParticipant: "",
    targetParticipant: ""
  }
];

export default modifyWholeData;
