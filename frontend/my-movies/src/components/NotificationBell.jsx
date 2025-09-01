"use client";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { gql, useSubscription } from "@apollo/client";

export function NotificationBell() {
  console.log("[NotificationBell] Subscription component mounted");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  const MOVIE_ADDED_SUBSCRIPTION = gql`
    subscription MovieAdded {
      movieAdded {
        id
        title
        genre
        director
        year
        price
        desc
      }
    }
  `;

  const { data, error } = useSubscription(MOVIE_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log("[NotificationBell] Subscription data received:", data);
      if (data?.data?.movieAdded) {
        setNotifications((prev) => {
          const updated = [data.data.movieAdded, ...prev];
          console.log("[NotificationBell] Updated notifications:", updated);
          return updated;
        });
        setHasNew(true);
        console.log("[NotificationBell] hasNew set to true");
      }
    },
  });

  useEffect(() => {
    if (error) {
      console.error("[NotificationBell] Subscription error:", error);
    }
  }, [error]);

  const handleBellClick = () => {
    setOpen(!open);
    setHasNew(false);
    console.log("[NotificationBell] Bell clicked, open:", !open);
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleBellClick} className="relative">
        <FaBell className="text-2xl text-yellow-300" />
        {hasNew && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>
      {open && notifications.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg w-180 max-w-full p-4 relative">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-red-400 text-xl"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <div className="text-yellow-100  font-bold text-lg mb-2">New Movie Notification</div>
            <ul className="h-160  overflow-y-auto">
              {notifications.map((notif,index) => (
                <li key={index} className="mb-3 p-2 bg-zinc-800  rounded border border-zinc-700">
                  <div className="font-bold text-yellow-200 text-2xl mb-1">{notif.title}</div>
                  <div className="text-zinc-300 text-xl">Genre: {notif.genre}</div>
                  <div className="text-zinc-300 text-xl">Director: {notif.director}</div>
                  <div className="text-zinc-300 text-xl">Year: {notif.year}</div>
                  <div className="text-zinc-300 text-xl">Price: ₹{notif.price}</div>
                  <div className="text-zinc-400 text-xl mt-1">{notif.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}