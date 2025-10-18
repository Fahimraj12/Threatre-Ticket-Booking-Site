import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cinema = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Define seat types and pricing by row
  const seatTypes = useMemo(
    () => ({
      regular: { name: "Regular", price: 150, rows: [0, 1, 2] }, // A–C
      premium: { name: "Premium", price: 250, rows: [3, 4, 5] }, // D–F
      vip: { name: "VIP", price: 350, rows: [6, 7, 8] }, // G–I
    }),
    []
  );

  const totalRows = 9;
  const seatsPerRow = 12;
  const asilePos = 6;

  // Get booked seats from localStorage
  const bookedSeats =
    JSON.parse(localStorage.getItem(`bookedSeats_${id}`)) || [];

  const getSeatPrice = (row) => {
    if (row <= 2) return 150;
    if (row <= 5) return 250;
    return 350;
  };

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // prevent booked seat
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handlePayment = () => {
    if (selectedSeats.length === 0) return alert("Select at least one seat!");
    const totalPrice = selectedSeats.reduce((sum, seat) => {
      const row = seat.charCodeAt(0) - 65;
      return sum + getSeatPrice(row);
    }, 0);
    navigate("/payment", {
      state: { movieId: id, selectedSeats, totalPrice },
    });
  };

  const renderSeats = () => {
    return Array.from({ length: totalRows }).map((_, row) => {
      const rowLabel = String.fromCharCode(65 + row);
      return (
        <div
          key={row}
          className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-0"
        >
          <span className="w-4 sm:w-6 font-semibold text-xs sm:text-sm">
            {rowLabel}
          </span>
          {Array.from({ length: seatsPerRow }).map((_, col) => {
            const seat = `${rowLabel}${col + 1}`;
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            const price = getSeatPrice(row);
            const color = isBooked
              ? "bg-gray-400"
              : isSelected
              ? "bg-green-500"
              : price === 150
              ? "bg-blue-200"
              : price === 250
              ? "bg-yellow-200"
              : "bg-red-200";

            return (
              <div
                key={col}
                onClick={() => toggleSeat(seat)}
                className={`
                  w-6 h-6 sm:w-8 sm:h-8 
                  rounded-sm sm:rounded-md 
                  cursor-pointer 
                  flex items-center justify-center 
                  text-xs sm:text-sm 
                  font-medium 
                  ${color}
                  hover:opacity-80 
                  transition-opacity
                `}
              >
                {col + 1}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    const row = seat.charCodeAt(0) - 65;
    return sum + getSeatPrice(row);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 md:py-10 flex flex-col items-center px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        Select Your Seats
      </h1>

      {/* Screen indicator */}
      <div className="w-full max-w-2xl mb-6 sm:mb-8 text-center">
        <div className="bg-gray-800 text-white py-2 px-4 rounded-lg mx-auto max-w-md">
          <p className="text-sm sm:text-base font-semibold">SCREEN</p>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 items-center overflow-x-auto py-2">
          {renderSeats()}
        </div>

        {/* Legend - Responsive grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm">
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-200 rounded flex-shrink-0"></span>
            <span>Regular (₹150)</span>
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-200 rounded flex-shrink-0"></span>
            <span>Premium (₹250)</span>
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-red-200 rounded flex-shrink-0"></span>
            <span>VIP (₹350)</span>
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded flex-shrink-0"></span>
            <span>Selected</span>
          </span>
          <span className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded flex-shrink-0"></span>
            <span>Booked</span>
          </span>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 break-words">
            Selected Seats: {selectedSeats.join(", ") || "None"}
          </p>
          <p className="text-lg sm:text-xl font-bold text-indigo-600 mb-4 sm:mb-4">
            Total: ₹{totalPrice}
          </p>
          <button
            onClick={handlePayment}
            className="bg-indigo-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-indigo-700 transition w-full sm:w-auto text-sm sm:text-base"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Custom CSS for additional responsive behavior */}
      <style jsx>{`
        @media (max-width: 640px) {
          .seat-grid {
            transform: scale(0.9);
            transform-origin: top center;
          }
        }

        @media (max-width: 480px) {
          .seat-grid {
            transform: scale(0.8);
          }
        }

        @media (max-width: 380px) {
          .seat-grid {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default Cinema;
