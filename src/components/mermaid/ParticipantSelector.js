import { Button, Form, Dropdown } from "react-bootstrap";

const ParticipantSelector = ({
  participantSet,
  checkedItems,
  setCheckedItems
}) => {
  const handleSelectAll = () => {
    setCheckedItems(new Set(participantSet));
  };

  const handleDeselectAll = () => {
    setCheckedItems(new Set());
  };

  const handleInverseSelection = () => {
    const newCheckedItems = new Set();

    for (const item of participantSet) {
      if (checkedItems.has(item)) {
        continue;
      } else {
        newCheckedItems.add(item);
      }
    }

    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="d-flex align-items-center" style={{ gap: "5px" }}>
      <Button onClick={handleSelectAll} size="sm">
        全选
      </Button>
      <Button onClick={handleDeselectAll} size="sm">
        全不选
      </Button>
      <Button onClick={handleInverseSelection} size="sm">
        反选
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
          选择参与者
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Array.from(participantSet).map((participant, index) => (
            <Dropdown.Item key={index} onClick={(e) => e.stopPropagation()}>
              <Form.Check
                type="checkbox"
                value={participant}
                label={participant}
                checked={checkedItems.has(participant)}
                onChange={() => {
                  const newCheckedItems = new Set(checkedItems);
                  if (checkedItems.has(participant)) {
                    newCheckedItems.delete(participant);
                  } else {
                    newCheckedItems.add(participant);
                  }
                  setCheckedItems(newCheckedItems);
                }}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ParticipantSelector;
