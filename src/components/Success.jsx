import React from "react";

const Success = ({ movieTitle, selectedSeats, totalAmount, onGoHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-gray-700 mb-4">
          Your booking for <b>{movieTitle}</b> is confirmed.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 text-left mb-6">
          <p className="text-gray-700">
            <b>Seats:</b> {selectedSeats.join(", ")}
          </p>
          <p className="text-gray-700">
            <b>Total Paid:</b> ₹{totalAmount}
          </p>
        </div>

        <button
          onClick={onGoHome}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
