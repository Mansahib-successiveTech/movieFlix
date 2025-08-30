"use client";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MovieCartPage() {
  const [cartData, setCartData] = useState([]);
  const headers = {
    authorization: localStorage.getItem("token"),
  };

  const placeOrder=async()=>{
   try{
    const res=await axios.post("http://localhost:8080/order/placeorder",{movies:cartData},{headers})
    toast.success("order placed succesfully");
    setCartData([]);
    getCart();
   }catch (err) {
      console.log("Error placing order:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  }
  const getCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/cart/getcart", { headers });
      setCartData(res.data.cart || []);
    } catch (err) {
      console.log("Error fetching cart:", err);
      toast.error(err.response?.data?.message || "Failed to fetch cart");
    }
  };

  const removeFromCart = async (movieId) => {
    try {
      await axios.delete("http://localhost:8080/cart/deletecart", {
        headers,
        data: { movieId },
      });
      getCart(); // Refresh cart after deletion
    } catch (err) {
      console.log("Error removing from cart:", err);
      toast.error(err.response?.data?.message || "Failed to remove from cart");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice = cartData.reduce((sum, item) => sum + item.movie.price * item.quantity, 0);

  return (
    <div className="bg-zinc-900 min-h-screen text-white px-6 md:px-12 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-200 mb-10 text-center md:text-left">
        My Cart
      </h1>

      {cartData.length > 0 ? (
        <>
          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cartData.map((item) =>
              item.movie ? (
                <div
                  key={item._id}
                  className="bg-zinc-800 rounded-xl shadow-lg flex flex-col overflow-hidden transition hover:scale-110"
                >
                  <MovieCard data={item.movie} />
                  <div className="p-4 flex justify-between items-center border-t border-zinc-700">
                    <p className="text-lg font-medium text-zinc-200">Qty: {item.quantity}</p>
                    <p className="text-lg font-bold text-yellow-300">
                      ₹ {item.movie.price * item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.movie._id)}
                    className="m-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ) : null
            )}
          </div>

          {/* Total & Checkout */}
          <div className="mt-10 flex flex-col md:flex-row justify-end items-center gap-6">
            <p className="text-xl md:text-2xl font-bold text-yellow-300 px-6 py-3 bg-zinc-800 rounded-lg">
              Total: ₹ {totalPrice}
            </p>
            <button className="px-6 py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition" onClick={placeOrder}>
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-zinc-400 mt-40 text-xl">No movies in cart.</p>
      )}
    </div>
  );
}
