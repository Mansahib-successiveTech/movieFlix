"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AllOrders = () => {
 const headers = {
  authorization: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};


  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
//fetch all details
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/order/getallorders",
        { headers }
      );
      setOrders(res.data.data || []);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
//update user order on click
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/order/updateorderstatus/${orderId}`,
        { status: newStatus },
        { headers }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.log("Error updating status:", err);
      toast.error("Failed to update status");
    }
  };

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
      

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-200">All Orders</h1>
         <Link
         href={"/addMovie"}>
          <button
          className="mt-2 mb-10 bg-yellow-200 text-zinc-950 p-2 rounded hover:bg-yellow-500"
        >
          Add New Movie
        </button>
        </Link>
        {orders.length === 0 && <p>No orders found.</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-zinc-700">
            <thead>
              <tr className="bg-zinc-800">
                <th className="border border-zinc-700 px-4 py-2">Order ID</th>
                <th className="border border-zinc-700 px-4 py-2">User</th>
                <th className="border border-zinc-700 px-4 py-2">Email</th>
                <th className="border border-zinc-700 px-4 py-2">Status</th>
                <th className="border border-zinc-700 px-4 py-2">Payment</th>
                <th className="border border-zinc-700 px-4 py-2">Movies</th>
                <th className="border border-zinc-700 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => {
                const totalPrice = order.movies.reduce(
                  (sum, item) => sum + item.movie.price * item.quantity,
                  0
                );

                return (
                  <tr key={order._id} className="text-center">
                    <td className="border border-zinc-700 px-4 py-2">{order._id}</td>
                    <td className="border border-zinc-700 px-4 py-2">{order.user.username}</td>
                    <td className="border border-zinc-700 px-4 py-2">{order.user.email}</td>
                    <td className="border border-zinc-700 px-4 py-2 text-yellow-200">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="bg-zinc-900 text-white p-1 rounded"
                      >
                        <option value="order placed">Order Placed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rented">Rented</option>
                        <option value="returned">Returned</option>
                      </select>
                    </td>
                    <td className="border border-zinc-700 px-4 py-2 text-green-200">{order.paymentMethod}</td>
                    <td className="border border-zinc-700 px-4 py-2 text-left">
                      {order.movies.map((item, idx) => (
                        <div key={idx} className="flex justify-between mb-1">
                          <span>{item.movie.title}</span>
                          <span>Qty: {item.quantity}</span>
                          <span>₹ {item.movie.price * item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td className="border border-zinc-700 px-4 py-2 font-semibold">₹ {totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
