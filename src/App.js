import React, { useState, useEffect } from "react";
import './index.css';
import './css/home.css';
import './App.css'; // Import your CSS file
import Header from "./components/Header";
import Cards from "./components/Cards";
import Carousel from 'react-bootstrap/Carousel';

import image1 from './images/david-nieto-Sz9LJq-UqLw-unsplash.jpg'
import image2 from './images/nathan-mullet-GoFys2bZJaE-unsplash.jpg'
import image3 from './images/aaron-burden-UIib0bAvWfs-unsplash.jpg'

function App() {

  const [aboutData, setAboutData] = useState(null);
  const [sermonData, setSermonData] = useState(null);
  const [search, setSearch] = useState('');
  const [activeSort, setActiveSort] = useState('ascending');

  // Get api data with Ajax
  useEffect(() => {
    fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php')
    .then(response => response.json())
    .then(data => {
      const sortedData = [...data.Timeline].sort((a, b) => new Date(a.CreateDate) - new Date(b.CreateDate));
      setAboutData(data.Body[0].About)
      setSermonData(sortedData)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const [filteredData, setFilteredData] = useState(sermonData);

  useEffect(() => {
    setFilteredData(
      sermonData?.filter(item =>
        item.Title.toLowerCase().includes(search.toLowerCase()) ||
        item.Description.toLowerCase().includes(search.toLowerCase()) ||
        item.Category.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [sermonData, search]);

  const sortAscending = () => {
    const sortedData = [...sermonData].sort((a, b) => new Date(a.CreateDate) - new Date(b.CreateDate));
    setSermonData(sortedData);
    setActiveSort('ascending');
  }

  const sortDescending = () => {
    const sortedData = [...sermonData].sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate));
    setSermonData(sortedData);
    setActiveSort('descending');
  }

  return (
    <div style={{backgroundColor:'#131313', paddingBottom: '1.5vw', width:'100%', minHeight:'100%'}}>
      <Header/>

      <Carousel id="home">
        <Carousel.Item>
          <div className="d-flex">
            <div className="carousel-text">
              <h3 style={{fontWeight:"normal"}}>Joyful Worship</h3>
              <h3> Join Us in Praise</h3>
              <p style={{width:'50%'}}>Discover a place of warmth and community where every song uplifts your spirit.</p>
            </div>
            <div className="image-container">
              <img
                className="d-block w-100 carouselCon"
                src={image1}
                alt="First slide"
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex">
            <div className="carousel-text">
              <h3 style={{fontWeight:"normal"}}>Family of Faith</h3>
              <h3>Together We Grow</h3>
              <p style={{width:'50%'}}>Embrace a journey of spiritual growth in a nurturing environment for all ages.</p>
            </div>
            <div className="image-container">
              <img
                className="d-block w-100 carouselCon"
                src={image2}
                alt="Second slide"
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex">
            <div className="carousel-text">
              <h3 style={{fontWeight:"normal"}}>Service and Love</h3>
              <h3>Making a Difference</h3>
              <p style={{width:'50%'}}>Be part of our mission to spread love and service within our community and beyond.</p>
            </div>
            <div className="image-container">
              <img
                className="d-block w-100 carouselCon"
                src={image3}
                alt="Third slide"
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <div style={{marginLeft:'10vw', marginTop:'5vw'}} id="active">
        <h2 style={{fontWeight:'lighter', textDecoration: 'underline', textDecorationColor: '#03AFB1'}}>The man himself</h2>
      </div>

      {aboutData && <div className="aboutSection" dangerouslySetInnerHTML={{ __html: aboutData }} />}
      

      <div style={{marginLeft:'10vw', marginTop:'7.5vw', marginBottom:'2.5vw'}} id="sermons">
        <h2 style={{fontWeight:'lighter', textDecoration: 'underline', textDecorationColor: '#03AFB1'}}>Sermons</h2>
      </div>

      <div style={{marginLeft:'10vw', marginRight:'10vw', marginTop:'2vw', display: 'flex', justifyContent: 'space-between' }}>
       <input type="text" value={search} onChange={handleSearch} placeholder="Search..." className="search"/>
        <div style={{display:'flex'}}>
          <div onClick={sortAscending} style={{color: activeSort === 'ascending' ? '#03AFB1' : 'white', marginRight:'2vw'}}>New to Old</div>
          <div onClick={sortDescending} style={{color: activeSort === 'descending' ? '#03AFB1' : 'white'}}>Old to New</div>
        </div>
      </div>
      

      <div className="sermonsMainContainer">
        <div  className="sermonsContainer">
          <Cards  data={filteredData || sermonData}/>
        </div>
      </div>
    </div>
  );
}

export default App;