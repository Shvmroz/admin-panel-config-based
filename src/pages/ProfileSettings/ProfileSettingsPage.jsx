import React, { useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useSnackbar } from "notistack";
import { Camera, User, Mail, Phone, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { Input } from "../../components/Input";

const ProfileSettingsPage = () => {
  const { user, setUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || null,
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.image || null);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        enqueueSnackbar("Image size should be less than 5MB", {
          variant: "error",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setImagePreview(imageUrl);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user context only (no localStorage)
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);

      enqueueSnackbar("Profile updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to update profile", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Update your personal information and profile picture
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="p-2 mb-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-md font-medium text-gray-600 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      {/* Profile Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Profile Image Section (col-span-4 on md+) */}
            <div className="md:col-span-4 flex flex-col items-center space-y-4 w-full h-full">
              <div className="relative w-full aspect-square max-w-xs">
                {/* Square image fills entire container */}
                <div className="absolute inset-0 overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-md rounded-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Click the camera icon to upload a new profile picture
                <br />
                <span className="text-xs">Maximum file size: 5MB</span>
              </p>
            </div>

            {/* Right: Form Fields (col-span-8 on md+) */}
            <div className="md:col-span-8 space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="pl-10 bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed hover:cursor-not-allowed opacity-70"
                    disabled
                  />
                </div>
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    placeholder="Enter first name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
                    }
                    placeholder="Enter last name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-2 border-t-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
