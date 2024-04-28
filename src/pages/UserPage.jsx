import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import Pagination from '../Components/Pagination';
import Header from '../Components/Header';

function UserPage() {
    const [users, setUsers] = useState([]);
    const [currpage, setCurrPage] = useState(0);
    const [sort, setSort] = useState('');
    const [size, setSize] = useState(2);
    

    useEffect(() => {
        async function fetchData() {
            try {
                let url = `http://employee-server-env.eba-pbhp8yym.us-east-1.elasticbeanstalk.com/api/employees?page=${currpage}&size=${size}`;
                if (sort) {
                url += `&sortBy=${sort}`; // Add sort parameter if available
            }
            const response = await axios.get(url);
            setUsers(response.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [currpage, size, sort]);

    

    function createCard(user) {
        return (
            <Card
                key={user.id}
                id={user.id}
                name={user.employeeName}
                img={user.profileImage}
                phoneNumber={user.phoneNumber}
                email={user.email}
                reportsTo={user.reportsTo}
            />
        );
    }

    const paginate = (pageNumber) => {
        setCurrPage(pageNumber);
    };

    return (
        <div>
            <Header onSort={setSort}/>
            <div className='userList'>
                {users.map(createCard)}
            </div>
            <div className='pagination'>
                <Pagination currPage={currpage} paginate={paginate} setSize={setSize}/>
            </div>
        </div>
    );
}

export default UserPage;
