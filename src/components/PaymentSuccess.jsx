import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookedSeats = [], movieTitle, totalPrice } = location.state || {};

  useEffect(() => {
    // ✅ Save booked seats in localStorage
    if (bookedSeats.length > 0) {
      const prevBooked = JSON.parse(localStorage.getItem("bookedSeats")) || [];
      const updatedSeats = Array.from(new Set([...prevBooked, ...bookedSeats]));
      localStorage.setItem("bookedSeats", JSON.stringify(updatedSeats));
    }

    // ✅ Auto redirect to home after 4 sec
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);
    return () => clearTimeout(timer);
  }, [bookedSeats, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-100 p-6 rounded-full"
          >
            <CheckCircle2 size={70} className="text-green-500" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-1 text-lg">Payment Successful</p>
        <p className="text-gray-500 mb-6 text-sm">
          Seats booked for <span className="font-semibold">{movieTitle}</span>{" "}
          worth ₹{totalPrice}
        </p>
        <p className="text-gray-500 mb-6 text-sm">
          You’ll be redirected to the home page shortly or click below to go
          now.
        </p>
        <p className="text-gray-500 mb-6 text-sm">
          Developed and Designed by Mo Fahim Raj
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
        >
          Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
