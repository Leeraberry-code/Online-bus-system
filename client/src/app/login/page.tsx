"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/login/login", {
        email,
        password,
      });

      const { success, userType, user_id, redirect, message } = response.data;

      if (!success || !user_id || !userType) {
        throw new Error("User type or ID not returned from server. Please contact support.");
      }

      // Store user information in localStorage
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_type", userType);

      // Redirect the user
      if (redirect) {
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
