import React, { useEffect, useRef, useState } from "react";
import '../index.css';
import '../css/cards.css';

import AudioPlayer from 'react-modern-audio-player';

function Cards(props) {
  const data = props.data;

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsForCurrentPage = data ? data.slice(startIndex, endIndex) : [];

  const numberOfPages = data ? Math.ceil(data.length / itemsPerPage) : [];
  const pageNumbers = data ? Array.from({ length: numberOfPages }, (_, index) => index + 1) : [];

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, numberOfPages);

  if (endPage === numberOfPages) {
    startPage = Math.max(endPage - 4, 1);
  }

  const imgUrl = 'https://arthurfrost.qflo.co.za/'
  const audioUrl = 'https://arthurfrost.qflo.co.za/'

  const audioElements = useRef(null);

  useEffect(() => {
    audioElements.current = document.getElementsByTagName('audio');
  
    return () => {
      for(let i=0; i < audioElements.current.length; i++){
        audioElements.current[i].pause();
        audioElements.current[i].src = ""; 
      }
    };
  }, []);

  const playList = itemsForCurrentPage.map((item, index) => ({
    // name: item.Title,
    src: audioUrl + item.Audio,
    id: index,
  }));

  const activeUI = {
    all: true,
    playButton: true,
    playList: false,
    prevNnext: false,
    volume: true,
    volumeSlider: true,
    repeatType: false,
    trackTime: true,
    trackInfo: false,
    artwork: false,
    progress: "bar",
  };

  return (
    <>
      <div className="card-container">
      {itemsForCurrentPage.map((item, index) => (
         
              <div  key={index} className="cards">
                  <img src={imgUrl + item.Image} alt="Logo" className="cardImg"
                    onError={(e) => {e.target.onerror = null; e.target.src="../logo.png"; e.target.classList.add("error-image")}}/> 

                    <div style={{marginTop:'1vw'}}>{item.Title}</div>

                    <div className="audioCon">
                      <AudioPlayer playList={playList} activeUI={activeUI} />
                    </div>
              </div>
         
          ))}
      </div>

      <div className="pagination">
        {pageNumbers.map((number, index) => {
          if (number <= 4 || (number >= startPage && number <= endPage) || number > numberOfPages - 3) {
            return (
              <div
                key={index}
                onClick={() => setCurrentPage(number)}
                className={`pageNumbers ${currentPage === number ? 'active' : ''}`}
              >
                {number}
            </div>  
          );
        } else if (number === startPage - 1 || number === endPage + 1) {
          return <span key={index}>...</span>;
        } else {
          return null;
        }
      })}
    </div>

    </>
  );
}

export default Cards;
