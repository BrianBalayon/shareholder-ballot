import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const DropdownMenu = ({
                          dropdownItemInfo,
                          keyName,
                          onClickDropdownItem,
                          title
                      }) => {
    return (
        <DropdownButton
            variant="outline-secondary"
            as={InputGroup.Append}
            title={title}
            onSelect={e => onClickDropdownItem(keyName, e)}
            id={title}
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
