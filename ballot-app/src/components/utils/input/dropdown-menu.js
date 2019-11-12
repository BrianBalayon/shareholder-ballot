import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropdownMenu = ({
  dropdownItemInfo,
  keyName,
  onDropdownItemClick,
  title
}) => {
  return (
    <DropdownButton
      title={title}
      onSelect={e => onDropdownItemClick(keyName, e)}
    >
      {dropdownItemInfo.map(itemInfo => (
        <Dropdown.Item eventKey={itemInfo.eventKey}>
          {itemInfo.itemText}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownMenu;
