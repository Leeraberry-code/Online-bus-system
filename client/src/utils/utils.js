const axios = require('axios');

export const signUpAdmin = async (initials,surname, email, password, token) => {
  const url = 'http://localhost:5000/admin/admins';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Admin_Initials: initials, Admin_Surname: surname,Admin_Email: email,Admin_Passcode: password}),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.error)
    }

    return data;
  } catch (error) {
    console.log('Error signing up:', error);
    throw error;
  }
};

export const signUpParent = async (name, email, password, phone, token) => {
    const url = 'http://localhost:5000/parent/parents';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Parent_Name: name,Parent_Email: email,Parent_Passcode: password,Parent_CellNo: phone }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      return data;
    } catch (error) {
      console.log('Error signing up:', error);
      throw error;
    }
  };

export const loginUser = async (email, password) => {
    const url = 'http://localhost:5000/login/login';
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      return data;
    } catch (error) {
      console.log('Error logging in');

      throw error;
    }
  };