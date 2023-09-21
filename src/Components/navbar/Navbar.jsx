import React, { useEffect, useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { setLogin, data, setData } = useData();
  const [filteredData, setFilteredData] = useState(data);

  const startSearch = () => {
    const searchBarContainer = document.getElementById("search-bar-container");
    const logo = document.getElementById("logo");
    const searchContainer = document.getElementById("search-container");
    searchBarContainer.style.display = "none";
    logo.style.display = "none";
    searchContainer.style.display = "block";
    logo.focus();
  }

  const fetchUserData = () => {
    const url = "http://localhost:5000/user/";
    axios.get(url)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    const filteredUsers = data.filter((user) =>
      user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredUsers);
    setFilteredData(filteredUsers);
    console.log(filteredData);
  };



  const logout = () => {
    localStorage.removeItem("userEmail");
    setLogin(false);
    navigate("/login");
  };

  return (
    <div>
      <nav className='navbar'>
        <ul className='navbar-item1'>
          <li id='logo'><i style={{ marginTop: "18px" }} className="fa-brands fa-facebook fa-2xl"></i></li>
          <li>
            <div onClick={startSearch} className='search-bar-container' id='search-bar-container'>
              <p className='search-bar'> Search </p>
            </div>

            <div className='search-container' id='search-container'>
              <i style={{ marginRight: "6px" }} className="fa-solid fa-arrow-left fa-2xl"></i>
              <input type="search"
                id="search-bar"
                className='search'
                placeholder='Search'
                onChange={handleSearch}
                value={search} />
              <ul className='search-results'>
                {filteredData.map((user) => (
                  <div className='search-result'>
                    <i style={{ marginTop: "8px" }} className="fa-regular fa-circle-user fa-xl"></i>
                    <li key={user.id}>{user.firstName}</li>
                  </div>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <ul className='navbar-item2'>
          <li><i className="fa-solid fa-house fa-xl"></i></li>
          <li><i className="fa-solid fa-video fa-xl"></i></li>
          <li><i className="fa-solid fa-users fa-xl"></i></li>
          <li><i className="fa-solid fa-gamepad fa-xl"></i></li>
        </ul>
        <ul className='navbar-item3'>
          <li><i className="fa-brands fa-facebook-messenger fa-xl"></i></li>
          <li><i className="fa-solid fa-bell fa-xl"></i></li>
          <li className='dropbtn'><i className="fa-regular fa-circle-user fa-xl">
            <div className='dropdown-content'>
              <button onClick={logout}>Logout</button>
            </div>
          </i></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
