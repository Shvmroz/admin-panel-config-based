import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleCloseSnackbar = (event) => {
      closeSnackbar(event.detail);
    };

    window.addEventListener("closeSnackbar", handleCloseSnackbar);
    return () => window.removeEventListener("closeSnackbar", handleCloseSnackbar);
  }, [closeSnackbar]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const login = async (email, password) => {
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example hardcoded user object (same structure as STATIC_USERS)
      if (email === "admin@crud.com" && password === "admin@crud.com") {
        const userWithoutPassword = {
          id: 1,
          email,
          first_name: "Admin",
          last_name: "Account",
          role: "admin",
          phone: "+15551234567",
          image: null,
        };

        localStorage.setItem("authToken", "static-token-" + userWithoutPassword.id);
        localStorage.setItem("userData", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setIsAuthenticated(true);

        enqueueSnackbar("Login successful", { variant: "success" });
        return { success: true };
      } else {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
        return { success: false };
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong. Please try again.", {
        variant: "error",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    return { success: true };
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const value = {
    isAuthenticated,
    user,
    setUser,
    loading,
    login,
    logout,
    darkMode,
    toggleDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
