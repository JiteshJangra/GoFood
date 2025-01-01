import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
//import Carousel from "../components/Carousel";

export default function Home() {
  const [search,setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    })
    response = await response.json();
    //console.log( response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
      <div>
        <div><Navbar /></div>
        <div ><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="1000" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                </div>
            </div>
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://picsum.photos/seed/49/1080/480" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://picsum.photos/seed/13/1080/480" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://picsum.photos/seed/34/1080/480" alt="Third slide" />
            </div>
          </div>
          <button className="carousel-control-prev" data-bs-target="#carouselExampleFade" type="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" data-bs-target="#carouselExampleFade" type="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div></div>
        <div className='container'>
          {
            foodCat.length > 0
              ?
              foodCat.map((data) => {
                return (
                  <div className='mb-3 row' key={data._id} >
                    <div className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {
                      foodItem.length > 0 ?
                        foodItem.filter((item) => (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())))
                          .map(filterItems => {
                            return (
                              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                <Card foodItem={filterItems}
                                  options={filterItems.options[0]}
                                    />
                              </div>
                            )
                          }) : <div id='false'>No such data</div>}

                  </div>

                )
              })
              : ""
          }

        </div>
        <div><Footer /></div>
      </div>
    </>
  );
}
