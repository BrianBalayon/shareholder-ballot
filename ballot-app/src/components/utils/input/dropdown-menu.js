import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const DropdownMenu = ({
  dropdownItemInfo,
  keyName,
  onClickDropdownItem,
  title
}) => {
  return (
    <DropdownButton
      title={title}
      onSelect={e => onClickDropdownItem(keyName, e)}
    >
      {dropdownItemInfo.map((itemInfo, index) => (
        <Dropdown.Item key={`${keyName}-${index}`} eventKey={itemInfo.eventKey}>
          {itemInfo.itemText}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownMenu;
