import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaUser,
  FaCalendarAlt,
  FaLock,
  FaGoogle,
  FaPaypal,
  FaQrcode,
  FaGooglePay,
  FaApplePay,
  FaAmazonPay,
} from "react-icons/fa";
import visa from "../assets/visa-logo.png";
import rupay from "../assets/rupay.png";
import mastercard from "../assets/mastercard.webp";
import { RiPaypalFill } from "react-icons/ri";
import { SiPaytm } from "react-icons/si";
import { SiSamsungpay } from "react-icons/si";
import qr from "../assets/qr.png";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { movieId, movieTitle, selectedSeats, totalAmount } = state || {};
  const [method, setMethod] = useState("Card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });

  // Ticket price configuration
  const ticketPrices = {
    "A-C": 150,
    "C-F": 250,
    "G-I": 350,
  };

  // Function to categorize seats by price tier
  const categorizeSeatsByPrice = (seats) => {
    const categorized = {
      "A-C": [],
      "C-F": [],
      "G-I": [],
    };

    seats?.forEach((seat) => {
      const row = seat.charAt(0).toUpperCase(); // Get the row letter

      if (["A", "B", "C"].includes(row)) {
        categorized["A-C"].push(seat);
      } else if (["D", "E", "F"].includes(row)) {
        categorized["C-F"].push(seat);
      } else if (["G", "H", "I"].includes(row)) {
        categorized["G-I"].push(seat);
      }
    });

    return categorized;
  };

  // Calculate price breakdown
  const categorizedSeats = categorizeSeatsByPrice(selectedSeats);

  const priceBreakdown = Object.entries(categorizedSeats).map(
    ([tier, seats]) => ({
      tier,
      seats,
      count: seats.length,
      pricePerTicket: ticketPrices[tier],
      subtotal: seats.length * ticketPrices[tier],
    })
  );

  const basePrice = priceBreakdown.reduce(
    (total, item) => total + item.subtotal,
    0
  );
  const convenienceFee = Math.round(basePrice * 0.02); // 2% convenience fee
  const tax = Math.round(basePrice * 0.18); // 18% GST
  const finalTotal = basePrice + convenienceFee + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConfirmPayment = () => {
    if (!movieId || !selectedSeats?.length) {
      alert("Payment data missing!");
      return;
    }

    const bookedKey = `bookedSeats_${movieId}`;
    const existingSeats = JSON.parse(localStorage.getItem(bookedKey)) || [];
    const updatedSeats = [...new Set([...existingSeats, ...selectedSeats])];
    localStorage.setItem(bookedKey, JSON.stringify(updatedSeats));

    // Notify Home.jsx
    window.dispatchEvent(new Event("storage"));

    navigate("/payment-success", {
      state: {
        bookedSeats: selectedSeats,
        movieTitle,
        totalPrice: finalTotal,
        priceBreakdown: {
          basePrice,
          convenienceFee,
          tax,
          categorizedSeats,
          ticketPrices,
        },
      },
    });
  };

  // Booking Summary Component
  const BookingSummary = () => (
    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 h-fit">
      <h3 className="font-semibold text-gray-800 mb-4 text-center text-xl">
        Booking Summary
      </h3>

      {/* Movie Info */}
      <div className="mb-4 pb-3 border-b border-blue-200">
        <h4 className="font-medium text-gray-800 text-center text-lg">
          {movieTitle}
        </h4>
        <p className="text-sm text-gray-600 text-center">
          {selectedSeats?.length} seat{selectedSeats?.length > 1 ? "s" : ""}{" "}
          selected
        </p>
      </div>

      {/* Seat-wise Price Breakdown */}
      <div className="space-y-3 mb-4">
        {priceBreakdown.map(
          (item) =>
            item.count > 0 && (
              <div
                key={item.tier}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {item.tier} Tier ({item.count} seat
                    {item.count > 1 ? "s" : ""})
                  </span>
                  <div className="text-xs text-gray-600">
                    {item.seats.join(", ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-800">₹{item.subtotal}</div>
                  <div className="text-xs text-gray-600">
                    ₹{item.pricePerTicket} each
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* Total Calculation */}
      <div className="space-y-2 text-sm border-t border-blue-200 pt-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Price</span>
          <span className="text-gray-800">₹{basePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Convenience Fee</span>
          <span className="text-gray-800">₹{convenienceFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span className="text-gray-800">₹{tax}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-blue-200">
          <span className="font-semibold text-gray-800 text-lg">
            Total Amount
          </span>
          <span className="font-bold text-xl text-blue-600">₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );

  // Payment Form Component
  const PaymentForm = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Ticket Payment
        </h1>
        <h2 className="text-xl font-semibold text-gray-600">
          Select Payment Method
        </h2>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-8">
        <div className="flex gap-3 mb-6">
          {[
            {
              key: "Card",
              icon: <FaCreditCard className="h-5 w-5" />,
              label: "Card",
            },
            {
              key: "UPI",
              icon: <FaGoogle className="h-5 w-5" />,
              label: "UPI",
            },
            {
              key: "QR",
              icon: <FaQrcode className="h-5 w-5" />,
              label: "QR",
            },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setMethod(option.key)}
              className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                method === option.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>

        {/* Payment Method Specific Content */}
        {method === "Card" && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={visa} alt="Visa" className="h-8" />
                <img src={mastercard} alt="Visa" className="h-8" />
                <img src={rupay} alt="Visa" className="h-8" />
              </div>
              <div className="bg-white rounded-lg px-3 py-1">
                <span className="text-blue-600 font-bold text-sm">SECURE</span>
              </div>
            </div>
          </div>
        )}

        {method === "UPI" && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-center gap-4 mb-4 flex-wrap">
              <FaGooglePay className="h-12 w-12 text-blue-500" />
              <FaApplePay className="h-12 w-12 text-blue-500" />
              <FaAmazonPay className="h-12 w-12 text-blue-600" />
              <RiPaypalFill className="h-12 w-12 text-blue-600" />
              <SiPaytm className="h-12 w-12 text-blue-500" />
              <SiSamsungpay className="h-12 w-12 text-blue-500" />
            </div>
            <p className="text-center text-gray-600">Choose your UPI app</p>
          </div>
        )}

        {method === "QR" && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
            <div className="bg-white p-4 inline-block rounded-lg">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <img src={qr} alt="QR Code" className="w-48 h-48" />
              </div>
            </div>
            <p className="text-gray-600 mt-4">Scan this QR code to pay</p>
          </div>
        )}
      </div>

      {/* Card Details Form */}
      {method === "Card" && (
        <div className="space-y-6">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaCreditCard className="text-gray-400 h-6 w-6" />
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <SiVisa className="h-6 w-6 text-blue-600" />
                <SiMastercard className="h-6 w-6 text-red-600" />
                <SiAmericanexpress className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder
            </label>
            <div className="relative">
              <input
                type="text"
                name="holder"
                value={cardDetails.holder}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaUser className="text-gray-400 h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MM/YY
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaCalendarAlt className="text-gray-400 h-6 w-6" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <FaLock className="text-gray-400 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Save Card Option */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="saveCard"
              checked={cardDetails.saveCard}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Save card details for future use
            </label>
          </div>
        </div>
      )}

      {/* Pay Now Button */}
      <button
        onClick={handleConfirmPayment}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
      >
        <FaPaypal className="h-5 w-5" />
        Pay ₹{finalTotal}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto">
          <BookingSummary />
          <div className="mt-6">
            <PaymentForm />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Booking Summary - Left Side */}
            <div className="col-span-4">
              <BookingSummary />
            </div>

            {/* Payment Form - Right Side */}
            <div className="col-span-8">
              <div className="max-w-2xl">
                <PaymentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
