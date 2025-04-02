function Carousel() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide w-75"
      data-bs-ride="carousel" // Enables the auto-slide feature
      data-bs-interval="2000" // Sets the interval between slides (3 seconds in this case)
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/americannulyysees.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img src="/images/deepwork.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img
            src="/images/itsyourship.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img src="/images/lesmis.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img
            src="/images/SleepSmarter.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
export default Carousel;
