import React, {useState, useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams()
  const [read, setRead] = useState([])
  const [searchterm, setSearchTerm] = useState('')
  

  useEffect(()=>{
    async function fetchAuthor(){
      const {data} = await axios.get (`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      setRead(data)
      console.log(data)
    }
    fetchAuthor()
  },[id])
  return (
    
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
{Array.isArray(read) && read.slice(0, 6).map((red, index) => (
        <section aria-label="section" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={red.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {red.authorName}
                          <span className="profile_username">{red.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {red.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower"> {red.followers}</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        
        </section>
         ))};
         
      </div>
    </div>

  );
};

export default Author;
