'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { signUpAdmin, signUpParent } from '../../utils/utils';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const userTypes = ['parent', 'admin'];
  const [selectedUserType, setUserType] = useState(userTypes[0]);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    password: '',
    userType: userTypes[0],
    name: '',
    initials: '',
    surname: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'userType') {
      setUserType(value);
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const registrationData = { ...formData, userType: selectedUserType };

      if (selectedUserType === 'admin') {
        const response = await signUpAdmin(
            formData.initials,
            formData.surname,
            formData.password,
            formData.email,
        );
        setSuccessMessage('Registration successful! Redirecting to admin dashboard...');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 3000);
      } else {
        const data = await signUpParent(
          formData.name,
          formData.password,
          formData.phoneNumber,
          formData.email,
          formData.surname
        );

        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setErrorMessage(`Error registering: ${err.message}`);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-20">
      {/* User Type Dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">User Type</span>
        </label>
        <select
          name="userType"
          value={selectedUserType}
          onChange={handleChange}
          className="select select-bordered w-full max-w-xs"
          required
        >
          {userTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Initials</span>
        </label>
        <input
          type="text"
          placeholder="Enter your intials"
          id="initials"
          name="initials"
          className="input input-bordered w-full max-w-xs"
          value={formData.initials}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          name="name"
          className="input input-bordered w-full max-w-xs"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Cell number</span>
        </label>
        <input
          type="text"
          placeholder="Enter your cell number"
          id="phoneNumber"
          name="phoneNumber"
          className="input input-bordered w-full max-w-xs"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Surname</span>
        </label>
        <input
          type="text"
          placeholder="Enter your surname"
          id="surname"
          name="surname"
          className="input input-bordered w-full max-w-xs"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          name="email"
          className="input input-bordered w-full max-w-xs"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          className="input input-bordered w-full max-w-xs"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && <span className="text-green-500">{successMessage}</span>}
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
}
