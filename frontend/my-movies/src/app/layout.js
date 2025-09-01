import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApolloWrapper from "../ApolloWrapper.jsx";
import SubscriptionTest from "@/components/SubscriptionTest.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <SubscriptionTest />
            <Navbar />
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}