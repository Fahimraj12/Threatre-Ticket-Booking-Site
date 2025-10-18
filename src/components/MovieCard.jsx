import React from "react";

const MovieCard = ({ movie, availableSeats, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-cover rounded-t-lg"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{movie.title}</h2>
        <p
          className={`font-medium ${
            availableSeats < 10 ? "text-red-600" : "text-green-600"
          }`}
        >
          {availableSeats} seats available
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
