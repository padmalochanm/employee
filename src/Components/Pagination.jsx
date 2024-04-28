import React, {useState} from 'react'
import { Select } from '@chakra-ui/react'

const Pagination = ({currPage, paginate, setSize}) => {
    const [pageSize, setPageSize] = useState(2);
    const handleChange = (event) => {
        setPageSize(event.target.value);
        setSize(event.target.value);
      };
    const handlePrevClick = () => {
        if (currPage > 0) {
            paginate(currPage - 1);
        }
    };

    const handleNextClick = () => {
        paginate(currPage + 1);
    };

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "25rem"}}>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item">
                        <button onClick={handlePrevClick} class="page-link">Previous</button>
                    </li>
                    <li class="page-item"><button class="page-link" onClick={()=>paginate(currPage)}>{currPage}</button></li>                   
                    <li class="page-item">
                        <button onClick={handleNextClick} class="page-link">Next</button>
                    </li>
                </ul>
            </nav>

            <Select placeholder='Select size' onChange={handleChange} value={pageSize}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
            </Select>
        </div>
    )
}

export default Pagination
