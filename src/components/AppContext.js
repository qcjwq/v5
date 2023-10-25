import React, { createContext, useContext, useState } from "react";
import orderModuleData from "../mock/OrderModuleData";
import modifyGeneralData from "../mock/ModifyGeneralData";
import checkoutEarlyData from "../mock/CheckoutEarlyData";
import modifyWholeData from "../mock/ModifyWholeData";
import cancelReceiptData from "../mock/CancelReceiptData";
import {
  generateUniqueRandomId,
  updateIdsInNestedJson,
  flattenJSON,
  nestJSON,
  updateSeq
} from "./common/Common.js";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeItemKey, setActiveItemKey] = useState(null);
  const [seq, setSeq] = useState("");
  const [id, setId] = useState("");
  const [parentId, setParentId] = useState("0");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [sourceParticipant, setSourceParticipant] = useState("");
  const [targetParticipant, setTargetParticipant] = useState("");
  const [activeAccordionKeys, setActiveAccordionKeys] = useState([]);

  // 订单模块
  const loadOrderModuleData = () => {
    loadData(orderModuleData);
  };

  // 修改通用路线
  const loadModifyGeneralData = () => {
    loadData(modifyGeneralData);
  };

  // 修改单据（提前离店）
  const loadCheckoutEarlyData = () => {
    loadData(checkoutEarlyData);
  };

  // 修改二期（取消新订）
  const loadModifyWholeData = () => {
    loadData(modifyWholeData);
  };

  // 取消单据排障case
  const loadCancelReceiptData = () => {
    loadData(cancelReceiptData);
  };

  const loadData = (sourceData) => {
    const flatData = flattenJSON(sourceData, "0");
    setData(flatData);
  };

  // 更新 selectedItem 的 seq 值
  const updateSelectedItemSeq = (newData, selectedItemId, setSeq) => {
    const updatedSelectedItem = newData.find(
      (item) => item.id === selectedItemId
    );
    if (updatedSelectedItem) {
      setSeq(updatedSelectedItem.seq);
    }
  };

  const findParentNode = (data, id, parent = null) => {
    for (const node of data) {
      if (node.id === id) return parent;
      if (node.children) {
        const foundParent = findParentNode(node.children, id, node);
        if (foundParent) return foundParent;
      }
    }
    return null;
  };

  // 处理上移事件
  const handleMoveUp = () => {
    if (!selectedItem) return;

    const nest = nestJSON(data);

    // 深拷贝原始 data 数组
    const newData = JSON.parse(JSON.stringify(nest));

    // 找到 selectedItem 的父节点，如果没有父节点，使用 newData 作为 parent
    const parent = findParentNode(newData, selectedItem.id) || newData;
    const childrenArray = Array.isArray(parent) ? parent : parent.children;

    if (!childrenArray) return;

    // 找到 selectedItem 在其父节点的 children 数组中的索引
    const index = childrenArray.findIndex(
      (item) => item.id === selectedItem.id
    );

    if (index <= 0) return; // 已经在顶部，不能再向上移动

    // 交换位置
    [childrenArray[index], childrenArray[index - 1]] = [
      childrenArray[index - 1],
      childrenArray[index]
    ];

    const flat = flattenJSON(newData);

    // 更新 data 数组
    setData(flat);

    // 更新 selectedItem 的 seq 值（如果需要）
    updateSelectedItemSeq(flat, selectedItem.id, setSeq);
  };

  // 处理下移事件
  const handleMoveDown = () => {
    if (!selectedItem) return;

    const nest = nestJSON(data);

    // 深拷贝原始 data 数组
    const newData = JSON.parse(JSON.stringify(nest));

    // 找到 selectedItem 的父节点，如果没有父节点，使用 newData 作为 parent
    const parent = findParentNode(newData, selectedItem.id) || newData;
    const childrenArray = Array.isArray(parent) ? parent : parent.children;

    if (!childrenArray) return;

    // 找到 selectedItem 在其父节点的 children 数组中的索引
    const index = childrenArray.findIndex(
      (item) => item.id === selectedItem.id
    );

    if (index >= childrenArray.length - 1) return; // 已经在底部，不能再向下移动

    // 交换位置
    [childrenArray[index], childrenArray[index + 1]] = [
      childrenArray[index + 1],
      childrenArray[index]
    ];

    const flat = flattenJSON(newData);

    // 更新 data 数组
    setData(flat);

    // 更新 selectedItem 的 seq 值（如果需要）
    updateSelectedItemSeq(flat, selectedItem.id, setSeq);
  };

  // 处理新增子节点事件
  const handleAddChild = () => {
    const newId = generateUniqueRandomId(data);
    const newParentId = selectedItem ? selectedItem.id : "0"; // 默认为根节点

    const newItem = {
      seq: 0, // 占位符，将被 updateSeq 更新
      id: newId,
      name,
      parentId: newParentId,
      domain,
      sourceParticipant,
      targetParticipant
    };

    const newData = [...data, newItem];
    updateSeq(newData);
    setData(newData);
  };

  // 处理新增同级节点事件
  const handleAddSibling = () => {
    const newId = generateUniqueRandomId(data);
    const newParentId = selectedItem ? selectedItem.parentId : "0"; // 默认为根节点

    const newItem = {
      id: newId,
      name,
      parentId: newParentId,
      domain,
      sourceParticipant,
      targetParticipant
    };

    let newData;
    if (selectedItem) {
      // 找到选中节点的索引，并在其之后插入新节点
      const selectedIndex = data.findIndex(
        (item) => item.id === selectedItem.id
      );
      newData = [
        ...data.slice(0, selectedIndex + 1),
        newItem,
        ...data.slice(selectedIndex + 1)
      ];
    } else {
      // 如果没有选中节点，则添加到根节点 "0" 的最后
      newData = [...data, newItem];
    }

    updateSeq(newData);
    setData(newData);
  };

  // 处理修改事件
  const handleModify = () => {
    const index = data.findIndex(
      (item) => item.id === (selectedItem && selectedItem.id)
    );
    if (index > -1) {
      const newData = [...data];
      const updatedItem = {
        id,
        name,
        parentId,
        domain,
        sourceParticipant,
        targetParticipant
      };
      newData[index] = updatedItem;

      updateSeq(newData);
      setData(newData);
      setSelectedItem(null);
    }
  };

  // 处理删除事件
  const handleDelete = () => {
    if (selectedItem) {
      const newData = data.filter((item) => item.id !== selectedItem.id);
      updateSeq(newData);
      setData(newData);
      setSelectedItem(null);
    }
  };

  // 处理导出事件
  const handleExport = () => {
    const allData = [];
    const nest = nestJSON(data);
    const newNestedJson = updateIdsInNestedJson(nest, allData);
    console.info("nest:", JSON.stringify(newNestedJson));
  };

  // 处理拖动事件
  const handleDrop = (newParentId, droppedItemId) => {
    // 找到被拖放的节点
    const droppedItem = data.find((item) => item.id === droppedItemId);
    if (!droppedItem) return;

    // 更新被拖放节点的 parentId
    droppedItem.parentId = newParentId;

    // 创建一个新的数据数组，包含更新后的节点
    const updatedData = data.map((item) => {
      if (item.id === droppedItemId) {
        return droppedItem;
      }
      return item;
    });

    updateSeq(updatedData);
    setData(updatedData);
  };

  const toggleAccordionKey = (key) => {
    setActiveAccordionKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key]
    );
  };

  const value = {
    data,
    setData,
    selectedItem,
    setSelectedItem,
    activeItemKey,
    setActiveItemKey,
    activeAccordionKeys,
    toggleAccordionKey,

    seq,
    setSeq,
    updateSeq,
    id,
    setId,
    parentId,
    setParentId,
    name,
    setName,
    domain,
    setDomain,
    sourceParticipant,
    setSourceParticipant,
    targetParticipant,
    setTargetParticipant,

    handleMoveUp,
    handleMoveDown,
    handleAddChild,
    handleAddSibling,
    handleModify,
    handleDelete,
    handleExport,
    handleDrop,

    loadOrderModuleData,
    loadModifyGeneralData,
    loadCheckoutEarlyData,
    loadModifyWholeData,
    loadCancelReceiptData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
