import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;
    const [idList, setIdList] = useState([]);
    const [formData, setFormData] = useState({
      employeeName: userData ? userData.employeeName : '',
      phoneNumber: userData ? userData.phoneNumber : '',
      email: userData ? userData.email : '',
      reportsTo: userData ? userData.reportsTo : '',
      profileImage: userData ? userData.profileImage : ''
      });

  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log(userData);
        const dataResponse = await axios.get(`http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/employees/${userData.id}`);
        console.log(dataResponse.data);
        setFormData(dataResponse.data);
        const response = await axios.get('http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/employees');
        setIdList(response.data.content);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, [userData]);
  
  const handleChange = (e) => {
    const { name, value} = e.target;
    const newValue = value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/employees?id=${userData.id}`, formData, {headers: {
        'Content-Type': 'application/json',
      },});
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    formData && (
        <Box p="4" borderWidth="1px" borderRadius="md">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="employeeName" mb="4">
          <FormLabel>employee Name</FormLabel>
          <Input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="phoneNumber" mb="4">
          <FormLabel>phone number</FormLabel>
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="reportsTo" mb="4">
          <FormLabel>Manager</FormLabel>
          <Select
            name="reportsTo"
            value={formData.reportsTo}
            onChange={handleChange}
            placeholder="Select Manager"
          >
            {idList.map((gender) => (
              <option key={gender.id} value={gender.id}>{gender.id}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="profileImage" mb="4">
          <FormLabel>Avatar</FormLabel>
          <Input
            type="text" // Assuming avatar is a URL string
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
          />
        </FormControl>
        <Box>
        <Button type="submit" colorScheme="teal">
          Add User
        </Button>
        </Box>
      </form>
    </Box>
  ))
};

export default UpdatePage;
