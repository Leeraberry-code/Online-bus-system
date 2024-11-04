'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import {loginUser} from '../../utils/utils'
import { useRouter } from 'next/navigation';

export default function LogInForm() {
  const [formData, setFormData] = useState({
    email:" ",
    password:" "
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const data = await loginUser(formData.email, formData.password);

      // Set success message
      setSuccessMessage("Login successful! Redirecting to home...");

      // Redirect to the home page
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4 pt-20">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-stone-600">Email</span>
        </label>
        <input
          type="email"
          placeholder='Enter your email'
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
          <span className="label-text  text-stone-600">Password</span>
        </label>
        <input
          type="password"
          placeholder='Enter your password'
          name="password"
          id="password"
          className="input input-bordered w-full max-w-x"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      {successMessage && <span className="text-green-500">{successMessage}</span>}
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </div>
    </form>
  );
}