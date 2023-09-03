import { useState, useEffect } from "react";
import "./cardItem.css";
import { useFavouritePhotos } from "../../context/FavouritePhotosContext";

const Carditem = ({ id, alt, photographer, src }) => {
  const { addToFavourites, removeFromFavourites } = useFavouritePhotos();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const isPhotoFavourite = localStorage.getItem("favourite-photo")
      ? JSON.parse(localStorage.getItem("favourite-photo")).some(photo => photo.id === id)
      : false;
    setIsFavourite(isPhotoFavourite);
  }, [id]);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourites(id);
    } else {
      addToFavourites(id);
    }
    setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  };

  return (
    <div
      className="card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card">
        <img src={src.medium} alt={alt} />
      </div>
      <div className={`overlay ${isHovered ? "visible" : ""}`}>
        <div className="overlay-content">
          <span className="title"> {alt} </span>
          <hr />
          <span className="author"> {photographer} </span>
          <br />
          <button className={`fav-btn ${isFavourite ? "favourite" : ""}`} type="button" onClick={toggleFavourite}>
            {isFavourite ? "Remove from Favorites" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carditem;