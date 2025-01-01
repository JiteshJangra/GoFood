import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="1000" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{zIndex:"10"}}>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success text-white " type="submit">Search</button>
            </form>
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
      </div>
    </div>
  )
}
