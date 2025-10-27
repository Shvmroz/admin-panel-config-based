import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Mail, Lock } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { Input } from "../components/Input";
import Button from "../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@crud.com");
  const [password, setPassword] = useState("admin@crud.com");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:flex lg:col-span-6 items-center justify-center p-8 lg:p-16">
          {/* add left side designs here */}
          <div className="text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-500">
              CRUD Manager
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Effortlessly manage your application data through{" "}
              <span className="font-semibold text-blue-400">
                config-based components
              </span>
              .
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-500 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✔</span>
                  <span>Config-driven CRUD operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✔</span>
                  <span>Dynamic table & form rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✔</span>
                  <span>Seamless API integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">✔</span>
                  <span>Built with React & Tailwind</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome Back
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Sign in to your admin account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 z-10" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 z-10" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
