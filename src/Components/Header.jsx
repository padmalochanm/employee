import { Select, Button } from '@chakra-ui/react'
import { useState } from 'react';
function Header({sort, onSort}) {
    const [sorting, setSorting] = useState('');
    const handleChange = (event) => {
        setSorting(event.target.value);
        onSort(event.target.value);
      };
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "25rem", marginBottom: "1.5rem" }}>
            <div >
            <Button colorScheme='teal'><a href="/newUser">Add new user</a></Button>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Select placeholder='Sort by' onChange={handleChange} value={sorting}>
                <option value='employeeName'>Name</option>
                <option value='email'>EMail</option>
            </Select>
        </div>
        </div>
    );
}

export default Header;
