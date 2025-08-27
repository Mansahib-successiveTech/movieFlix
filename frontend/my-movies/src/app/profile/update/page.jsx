import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";
import { UpdateUser } from "@/components/UpdateUser";

export default function HomePage() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
    <UpdateUser />
    </div>
  );
}
