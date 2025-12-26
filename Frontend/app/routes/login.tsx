import React, { useState } from "react";
import { useGraphQLLogin, useGraphQLSignup } from "../api/graphql/hooks";
import { Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const loginMutation = useGraphQLLogin();
  const signupMutation = useGraphQLSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (!formData.fullName.trim()) {
          setError("Full name is required.");
          return;
        }
        await signupMutation.signup(formData.fullName, formData.email, formData.password);
        setFormData({ fullName: "", email: "", password: "" });
        setIsSignUp(false);
        setError("Signup successful! Please log in.");
      } else {
        await loginMutation.login(formData.email, formData.password);
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    }
  };
  
  const isLoading = loginMutation.loading || signupMutation.loading;

  return (
    <div className="bg-light-gray min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {isSignUp ? "Create Your Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {isSignUp ? "Get started with your new account." : "Log in to continue shopping."}
        </p>
        
        {error && (
          <div
            className={`p-3 rounded-lg text-center text-sm mb-4 ${
              error.includes("successful")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
              <div className="relative mt-1">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={isSignUp}
                  disabled={isLoading}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-red focus:border-primary-red"
                />
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
            <div className="relative mt-1">
              <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-red focus:border-primary-red"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <div className="relative mt-1">
              <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-red focus:border-primary-red"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-primary-red text-white font-semibold rounded-lg transition-colors hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setFormData({ fullName: "", email: "", password: "" });
              setError("");
            }}
            className="text-primary-red hover:underline font-semibold"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
