
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <AuthProvider>
        <Navbar />
        {children}
         <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>

      </body>
    </html>
  );
}
