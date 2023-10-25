export function dfs(data, parentId, result = []) {
  // 根据 parentId 过滤子节点并按照 seq 排序
  const children = data
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.seq - b.seq); // 使用 seq 进行排序

  // 设置 isFirst 和 isEnd 属性
  if (children.length === 1) {
    children[0].isFirst = true;
    children[0].isEnd = true;
  } else {
    children.forEach((child, index) => {
      child.isFirst = index === 0;
      child.isEnd = index === children.length - 1;
    });
  }

  for (const child of children) {
    // 先假设每个节点是叶子节点
    child.isLeaf = true;

    // 检查该节点的 children 是否有至少两个 isAlt=true 的条目
    if (
      data.filter((item) => item.parentId === child.id && item.isAlt).length >=
      2
    ) {
      child.isAltGroup = true;
    }

    result.push(child);
    dfs(data, child.id, result);

    // 如果该节点有子节点，更新 isLeaf 标识
    if (data.some((item) => item.parentId === child.id)) {
      child.isLeaf = false;
    }
  }

  return result;
}

const generateRandomId = (characters) => {
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateUniqueRandomId = (data) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result;
  do {
    result = generateRandomId(characters);
  } while (data.some((item) => item.id === result));

  return result;
};

export const updateIdsInNestedJson = (nestedJson, allData) => {
  return nestedJson.map((item) => {
    const newItem = { ...item, id: generateUniqueRandomId(allData) };

    if (newItem.children) {
      newItem.children = updateIdsInNestedJson(newItem.children, allData);
    }

    return newItem;
  });
};

export const flattenJSON = (nestedData, parentId = "0") => {
  let flatData = [];
  let currentSeq = 1; // 每一层都从1开始编号

  nestedData.forEach((item) => {
    const { children, ...rest } = item;
    rest.parentId = parentId;
    rest.seq = currentSeq++;

    flatData.push(rest);

    if (children && children.length > 0) {
      flatData = [...flatData, ...flattenJSON(children, item.id)];
    }
  });

  return flatData;
};

export const nestJSON = (flatData, parentId = "0") => {
  const nestedData = [];

  for (let i = 0; i < flatData.length; i++) {
    const item = flatData[i];

    if (item.parentId === parentId) {
      const {
        seq,
        id,
        appId,
        name,
        domain,
        sourceParticipant,
        targetParticipant,
        isAlt
      } = item;

      // 创建一个新对象，仅包含所需字段
      const newItem = {
        seq,
        id,
        appId: appId != null ? appId : "",
        name,
        domain,
        sourceParticipant,
        targetParticipant,
        isAlt
      };

      // 查找子节点并递归
      const children = nestJSON(flatData, item.id);
      if (children.length > 0) {
        newItem.children = children;

        // 检查该节点的 children 是否有至少两个 isAlt=true 的条目，并且 sourceParticipant 和 targetParticipant 都不为空
        if (
          children.filter(
            (child) =>
              child.isAlt && child.sourceParticipant && child.targetParticipant
          ).length >= 2
        ) {
          newItem.isAltGroup = true;
        }
      }

      nestedData.push(newItem);
    }
  }

  return nestedData;
};

export const updateSeq = (data) => {
  // 创建一个映射，用于存储每个 parentId 下的子节点
  const parentMap = {};
  data.forEach((item) => {
    if (!parentMap[item.parentId]) {
      parentMap[item.parentId] = [];
    }
    parentMap[item.parentId].push(item);
  });

  // 对每一个 parentId 下的子节点重新编号，从1开始
  Object.keys(parentMap).forEach((parentId) => {
    let seq = 1;
    parentMap[parentId].forEach((child) => {
      child.seq = seq++;
    });
  });
};

// 递归遍历嵌套的 JSON 数据
export const traverseData = (data, parentId) => {
  let mermaidData = "";

  // 根据 'seq' 字段排序
  const sortedData = [...data].sort((a, b) => a.seq - b.seq);

  for (const item of sortedData) {
    // 添加当前节点
    mermaidData += `${item.id}["${item.name}"]\n`;

    // 如果存在 parentId（不是根节点），添加从 parentId 到当前节点的箭头
    if (parentId && parentId !== "0") {
      mermaidData += `${parentId} --> ${item.id}\n`;
    }

    // 递归处理子节点
    if (item.children) {
      mermaidData += traverseData(item.children, item.id);
    }
  }

  return mermaidData;
};

export const handleExportSVG = (containerRef, fileName) => {
  if (!containerRef) {
    return;
  }

  if (!containerRef.current) {
    return;
  }

  const svgElement = containerRef.current.querySelector("svg");
  if (svgElement) {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // 创建日期时间戳
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(
      date.getHours()
    ).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(
      date.getSeconds()
    ).padStart(2, "0")}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}_${formattedDate}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  } else {
    console.warn("SVG element not found in the DOM.");
  }
};
