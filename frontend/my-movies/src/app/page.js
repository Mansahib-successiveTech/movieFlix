import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <p className="text-4xl font-bold text-white mb-6 text-center">Welcome to MovieFlix!</p>
      <Link
        href="/home"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Start
      </Link>
    </div>
  );
}
