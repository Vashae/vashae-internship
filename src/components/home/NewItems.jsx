import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "none" }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
        );
        setNewItems(data);
      } catch (err) {
        setError("Failed to load collections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, []);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520, // Small Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const Countdown = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());
  
    useEffect(() => {
      if (timeLeft <= 0) return;
  
      const interval = setInterval(() => {
        setTimeLeft(expiryDate - Date.now());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [expiryDate, timeLeft]);
  
    const getFormattedTime = (milliseconds) => {
      if (milliseconds <= 0) return "";
  
      const totalSeconds = Math.floor(milliseconds / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };
  
    return <div>{getFormattedTime(timeLeft)}</div>;
  };
  



  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
          {isLoading ? 
           
              Array.from({length:7})
                .map((_, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <Skeleton height={300} />
                    <Skeleton width="80%" style={{ margin: "10px 0" }} />
                    <Skeleton width="60%" />
                  </div>
                ))
           
           : 
              Array.isArray(newItems) && newItems.slice(0, 7).map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={item.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item.authorID}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                      
                    </div>
                    
                    <div className="de_countdown"> <Countdown expiryDate={item.expiryDate} /></div>
                    


                    <div className="nft__item_wrap">
                      
                    
                    
                    <div className="nft__item_extra">
                    
                    <div className="nft__item_buttons">
                    
                      <button>Buy Now</button>
                      
                      <div className="nft__item_share">
                      
                        <h4>Share</h4>
                        
                        <a href="" target="_blank" rel="noreferrer">
                      
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                        
                      </div>
                      
                    </div>
                    
                  </div>
                  
                      <Link to="/item-details">
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                        </div>
                        
                      </div>
                    </div>
                 
                  </div>
                 ))}
            </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
