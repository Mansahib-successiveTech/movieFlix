"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export const UserOrder = () => {
  const headers = {
    authorization: localStorage.getItem("token"),
  };

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3; // show 3orders per page

  const fetchDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/order/getordersHistory", { headers });
      setOrders(res.data.data || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // Pagination calculations
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex bg-zinc-900 min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-200">My Orders</h1>
        {orders.length === 0 && <p>No orders found.</p>}

        {currentOrders.map((order) => (
          <div key={order._id} className="mb-6 p-4 border border-zinc-700 rounded-lg">
            <p className="font-semibold text-lg mb-2">Order ID: {order._id}</p>
            <p className="text-yellow-200">Status: {order.status}</p>
            <p className="text-green-200">Payment Method: {order.paymentMethod}</p>

            <div className="ml-4 mt-2">
              <h3 className="font-semibold mb-2">Movies:</h3>
              {order.movies.map((item, index) => (
                <div key={index} className="flex justify-between mb-1">
                  <p>{item.movie.title}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹ {item.movie.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
