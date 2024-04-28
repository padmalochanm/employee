import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button  
} from '@chakra-ui/react';
import axios from 'axios';
import { HamburgerIcon } from '@chakra-ui/icons';

function Card(props) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/employees/${props._id}`);
      navigate("/");
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="card">
      <div className="container">
        <div className="name">{props.name}</div>
        <div className="info">
          <div>{props.id}</div>
          <br/>
          <div>{props.phoneNumber}</div>
          <div>{props.email}</div>
          <br/>
          <div>{props.reportsTo}</div>
        </div>
      </div>
      <img src={props.img} alt={props.employeeName} className="circle-img"/>
      <div className="menu-container">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='ghost'
            size='sm'
          />
          <MenuList>
            <MenuItem onClick={() => navigate("/update", {state: props})}>
              Update
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              Delete
            </MenuItem>            
          </MenuList>
        </Menu>
        <Button colorScheme='teal' size='xs' onClick={() => navigate("/manager", {state: props})}>
          Mng
        </Button>
      </div>
    </div>
  );
}

export default Card;
