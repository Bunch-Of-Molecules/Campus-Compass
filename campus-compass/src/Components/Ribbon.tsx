import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const Ribbon = () => {

    const [searchValue] = useState('');

    const handleSearch = () => {
        console.log("Searching for:", searchValue);
    }

    return (
        <div className="ribbon">
            <h1>Campus Compass</h1>
            <div className="searchWrapper">
            <FaSearch className='searchIcon' />
            <input
                type="text"
                placeholder="Search..."
                className="searchBar"

                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}

            />
            </div>
        </div>
    );
};

export default Ribbon;