import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Kantara from "../assets/Kantara.jpeg";
import jolly from "../assets/jolly.jpeg";
import Sunny from "../assets/Sunny.jpg";
import telusu_kada from "../assets/telusu_kada.jpg";
import tron from "../assets/tron.jpeg";
import imli from "../assets/imli.avif";
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
const Home = () => {
  const navigate = useNavigate();

  const baseMovies = [
    {
      id: 1,
      title: "Kantara: A Legend Chapter-1",
      image: Kantara,
      typeofmovie: "Adventure/Drama/Thriller",
      totalSeats: 96,
    },
    {
      id: 2,
      title: "Jolly LLB-3",
      image: jolly,
      typeofmovie: "Comedy/Drama",
      totalSeats: 60,
    },
    {
      id: 3,
      title: "Sunny Sanskari Ki Tulsi Kumari",
      image: Sunny,
      typeofmovie: "Comedy/Romantic",
      totalSeats: 50,
    },
    {
      id: 4,
      title: "Telusu Kadha",
      image: telusu_kada,
      typeofmovie: "Drama/Romantic",
      totalSeats: 48,
    },
    {
      id: 5,
      title: "India's Pride: Imli - The Archer",
      image: imli,
      typeofmovie: "Drama/Sports",
      totalSeats: 45,
    },
    {
      id: 6,
      title: "Tron",
      image: tron,
      typeofmovie: "Drama/Thriller",
      totalSeats: 55,
    },
  ];

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const updateMovies = () => {
      const updated = baseMovies.map((movie) => {
        const bookedSeats =
          JSON.parse(localStorage.getItem(`bookedSeats_${movie.id}`)) || [];
        const availableSeats = movie.totalSeats - bookedSeats.length;
        return { ...movie, bookedSeats, availableSeats };
      });
      setMovies(updated);
    };

    updateMovies();
    window.addEventListener("storage", updateMovies);
    return () => window.removeEventListener("storage", updateMovies);
  }, []);

  const handleSelectMovie = (movie) => {
    navigate(`/cinema/${movie.id}`, { state: movie });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Theatre Ticket Booking System
      </h1>
      <h4 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🎬 Now Showing
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {movie.title}
              </h2>
              <p className="text-gray-600 mb-3">{movie.typeofmovie}</p>
              <p className="text-gray-600 mb-3">
                Available Seats:{" "}
                <span className="font-bold text-green-600">
                  {movie.availableSeats}
                </span>{" "}
                / {movie.totalSeats}
              </p>
              <button
                onClick={() => handleSelectMovie(movie)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Select Seats
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Theatre Ticket Booking
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Your premier destination for movie tickets and entertainment. Book
              your favorite movies with ease and enjoy the best cinematic
              experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Fahimraj12"
                className="text-gray-600 hover:text-white transition-colors"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-white transition-colors"
              >
                <FaTwitter className="h-6 w-6" />
              </a>

              <a
                href="https://www.linkedin.com/in/mo-fahim-raj-175b9b304/"
                className="text-gray-600 hover:text-white transition-colors"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  Movies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">Bharuch Gujarat</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">support@ticketbooking.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Mo Fahim Raj. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a
                href="#"
                className="text-gray-600 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
