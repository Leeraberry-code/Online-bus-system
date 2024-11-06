import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';

interface SettingsMenuProps {
  userId: string;
  onLogout: () => void;
  toggleIncognito: () => void;
  isIncognito: boolean;
}

interface InitialValues {
  name: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

const darkModeColors = {
  background: '#1e1e1e',
  paper: '#2c2c2c',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  primary: '#90caf9',
};

const lightModeColors = {
  background: '#f5f5f5',
  paper: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  primary: '#1976d2',
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ userId, onLogout, toggleIncognito, isIncognito }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(localStorage.getItem('profileImage') || null);
  const [initialValues, setInitialValues] = useState<InitialValues>({
    name: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const colors = darkMode ? darkModeColors : lightModeColors;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/profile`);
        const userData = response.data;

        setInitialValues({
          name: userData.name,
          username: userData.username || '',
          email: userData.email,
          phone: userData.phone || '',
          location: userData.location || '',
          bio: userData.bio || '',
        });
        setSelectedImage(userData.profileImage || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to fetch user data. Please try again.');
        setSnackbarOpen(true);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettingsOpen = () => {
    setOpenAccountSettings(true);
    handleMenuClose();
  };

  const handleAccountSettingsClose = () => {
    setOpenAccountSettings(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    localStorage.removeItem('profileImage');
  };

  const handleFormSubmit = async (values: InitialValues) => {
    try {
      await axios.put(`http://localhost:5000/profile`, { userId, ...values });
      setSuccessMessage('User details updated successfully!');
      setSnackbarOpen(true);
      handleAccountSettingsClose();
    } catch (error) {
      console.error('Error updating user details:', error);
      setErrorMessage('Failed to update user details. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <button onClick={handleMenuOpen} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <img
          src={selectedImage || '/path/to/default-avatar.png'}
          alt={initialValues.name}
          className="w-10 h-10 rounded-full"
        />
      </button>
      {anchorEl && (
        <div
          className={`absolute bg-${colors.paper} rounded-lg shadow-lg p-4 mt-2 w-72`}
          onMouseLeave={handleMenuClose}
        >
          <div className="flex items-center space-x-4 mb-4">
            <img src={selectedImage || '/path/to/default-avatar.png'} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <p className={`text-${colors.textPrimary} font-bold`}>{initialValues.name}</p>
              <p className={`text-${colors.textSecondary} text-sm`}>{initialValues.email}</p>
            </div>
          </div>
          <button onClick={handleAccountSettingsOpen} className="block w-full text-left text-gray-700 dark:text-gray-300 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            Account Settings
          </button>
          <button onClick={onLogout} className="block w-full text-left text-gray-700 dark:text-gray-300 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            Logout
          </button>
          <div className="flex items-center justify-between mt-4">
            <span className={`text-${colors.textSecondary} text-sm`}>Dark Mode</span>
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="form-switch" />
          </div>
        </div>
      )}
      {openAccountSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-${colors.paper} p-6 rounded-lg w-full max-w-lg`}>
            <h2 className={`text-lg font-semibold text-${colors.textPrimary}`}>Account Settings</h2>
            {/* Account settings form and close button here */}
            <button onClick={handleAccountSettingsClose} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
      {snackbarOpen && (
        <div className="fixed bottom-4 left-4 p-4 bg-red-600 text-white rounded">
          {errorMessage || successMessage}
          <button onClick={handleSnackbarClose} className="ml-2 font-bold">x</button>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
