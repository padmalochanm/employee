import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Select } from '@chakra-ui/react';
import axios from 'axios';
const ManagerPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userData = location.state;
    const [level, setLevel] = useState(1);
    const [emp, setEmp] = useState({});
    const[mng, setMng] = useState({});

    const handleChange = (event) => {
        setLevel(event.target.value);
      };
    useEffect(() => {
        async function getManager() {
            setEmp(userData);
            const id = userData.id;
            const url = `http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/manager/${id}/${level}`;
            console.log(url);
            const manager = await axios.get(url);
            if(manager.data===null){
                navigate("/");
            }
            setMng(manager.data);
        }
        getManager();
    }, [level, userData, navigate]);  
  return (
    <div>
        <div className="card">
            <div className="container">
                <div className="name">{emp.name}</div>
                <div className="info">
                    <div>{emp.id}</div>
                    <br/>
                    <div>{emp.phoneNumber}</div>
                    <div>{emp.email}</div>
                    <br/>
                    <div>{emp.reportsTo}</div>
                </div>
            </div>
            <img src={emp.img} alt={emp.name} className="circle-img"/>
        </div>
        <div style={{alignItems: "left"}}>Manager at level
        <Select placeholder='level' onChange={handleChange} value={level}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </Select>
        </div>
        <br/>
        <div className="card">
            <div className="container">
                <div className="name">{mng.employeeName}</div>
                <div className="info">
                    <div>{mng.id}</div>
                    <br/>
                    <div>{mng.phoneNumber}</div>
                    <div>{mng.email}</div>
                    <br/>
                    <div>{mng.reportsTo}</div>
                </div>
            </div>
            <img src={mng.profileImage} alt={mng.employeeName} className="circle-img"/>
        </div>
        <Button onClick={() => navigate("/")}>Back</Button> 
    </div>
  )
}

export default ManagerPage
