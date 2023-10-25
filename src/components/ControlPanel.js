import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Tab,
  Tabs,
  Container,
  FloatingLabel
} from "react-bootstrap";
import MermaidFlowChat from "./mermaid/MermaidFlowChat";
import SequenceDiagram from "./mermaid/SequenceDiagram";
import MermaidGraph from "./mermaid/MermaidGraph";
import { useAppContext } from "./AppContext";

function ControlPanel() {
  const {
    selectedItem,
    seq,
    setSeq,
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
    loadOrderModuleData,
    loadModifyGeneralData,
    loadCheckoutEarlyData,
    loadModifyWholeData,
    loadCancelReceiptData
  } = useAppContext();
  const [activeTab, setActiveTab] = useState("SequenceDiagram");

  useEffect(() => {
    loadModifyWholeData();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setSeq(selectedItem.seq);
      setId(selectedItem.id);
      setParentId(selectedItem.parentId);
      setDomain(selectedItem.domain);
      setName(selectedItem.name);
      setSourceParticipant(selectedItem.sourceParticipant);
      setTargetParticipant(selectedItem.targetParticipant);
    }
  }, [selectedItem]);

  return (
    <Container fluid className="custom-container">
      <Row className="mb-12">
        <Col className="custom-col">
          <FloatingLabel label="序号" className="custom-label">
            <Form.Control
              type="text"
              value={seq}
              size="sm"
              onChange={(e) => setSeq(e.target.value)}
              disabled
            />
          </FloatingLabel>
        </Col>
        <Col className="custom-col">
          <FloatingLabel label="节点ID" className="custom-label">
            <Form.Control
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled
            />
          </FloatingLabel>
        </Col>
        <Col className="custom-col">
          <FloatingLabel label="父节点ID" className="custom-label">
            <Form.Control
              type="text"
              value={parentId}
              size="sm"
              onChange={(e) => setParentId(e.target.value)}
              disabled
            />
          </FloatingLabel>
        </Col>
        <Col className="custom-col">
          <FloatingLabel label="领域" className="custom-label">
            <Form.Control
              type="text"
              value={domain}
              size="sm"
              onChange={(e) => setDomain(e.target.value)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-12">
        <Col className="custom-col">
          <FloatingLabel label="动作名称" className="custom-label">
            <Form.Control
              type="text"
              value={name}
              size="sm"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col className="custom-col">
          <FloatingLabel label="源参与者" className="custom-label">
            <Form.Control
              type="text"
              value={sourceParticipant}
              size="sm"
              onChange={(e) => setSourceParticipant(e.target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col className="custom-col">
          <FloatingLabel label="目标参与者" className="custom-label">
            <Form.Control
              type="text"
              value={targetParticipant}
              size="sm"
              onChange={(e) => setTargetParticipant(e.target.value)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mb-12">
        <Form.Group className="d-flex gap-1">
          <Button variant="success" size="sm" onClick={handleMoveUp}>
            上移
          </Button>
          <Button variant="success" size="sm" onClick={handleMoveDown}>
            下移
          </Button>
          <Button variant="success" size="sm" onClick={handleAddChild}>
            新增子节点
          </Button>
          <Button variant="success" size="sm" onClick={handleAddSibling}>
            新增同级节点
          </Button>
          <Button variant="primary" size="sm" onClick={handleModify}>
            修改
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            删除
          </Button>
          <Button variant="info" size="sm" onClick={handleExport}>
            导出节点
          </Button>
        </Form.Group>
      </Row>
      <Row className="mb-12">
        <Form.Group className="d-flex gap-1">
          <Button variant="secondary" size="sm" onClick={loadOrderModuleData}>
            [设计]订单模块
          </Button>
          <Button variant="secondary" size="sm" onClick={loadModifyGeneralData}>
            [设计]修改通用路线
          </Button>
          <Button variant="secondary" size="sm" onClick={loadCheckoutEarlyData}>
            [设计]修改一期（提前离店）
          </Button>
          <Button variant="secondary" size="sm" onClick={loadModifyWholeData}>
            [设计]修改二期（取消新订）
          </Button>
          <Button variant="secondary" size="sm" onClick={loadCancelReceiptData}>
            [case]取消单据
          </Button>
        </Form.Group>
      </Row>
      <Row className="mb-12">
        <Tabs
          defaultActiveKey="SequenceDiagram"
          onSelect={(key) => setActiveTab(key)}
        >
          <Tab eventKey="SequenceDiagram" title="时序图">
            <SequenceDiagram activeTab={activeTab} />
          </Tab>
          <Tab eventKey="MermaidFlowChat" title="流程图">
            <MermaidFlowChat activeTab={activeTab} />
          </Tab>
          <Tab eventKey="MermaidGraph" title="思维导图">
            <MermaidGraph activeTab={activeTab} />
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default ControlPanel;
