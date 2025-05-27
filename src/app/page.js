'use client';

import { useState, useEffect } from 'react';
import defaultData from '../data/defaultData'; // Adjust the path based on your structure

export default function AdminCreateUser() {
  const [userMockData, setUserMockData] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    gender: '',
    email: '',
    contact: '',
    name: '',
    address: '',
    din: '',
    dateOfIncorporation: '',
    category: '',
    rocCode: '',
    status: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('userMockData');
    if (storedData) {
      setUserMockData(JSON.parse(storedData));
    } else {
      localStorage.setItem('userMockData', JSON.stringify(defaultData));
      setUserMockData(defaultData);
    }
  }, []);

  const isReadOnly = (fieldName) => {
    if (!formData.username.trim()) return fieldName !== 'username';
    return fieldName !== 'username' && !!userMockData[formData.username.toLowerCase()];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict age to 3 digits
    if (name === 'age' && value.length > 3) return;

    if (name === 'username') {
      const lowerValue = value.toLowerCase();
      if (userMockData[lowerValue]) {
        setFormData({ username: value, ...userMockData[lowerValue] });
      } else {
        setFormData({
          username: value,
          age: '',
          gender: '',
          email: '',
          contact: '',
          name: '',
          address: '',
          din: '',
          dateOfIncorporation: '',
          category: '',
          rocCode: '',
          status: '',
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const requiredFields = Object.entries(formData).filter(([key, value]) => !value.trim());
    if (requiredFields.length > 0) {
      alert(`Please fill all the fields before submitting.`);
      return;
    }

    const usernameLower = formData.username.toLowerCase();

    const newUserMockData = {
      ...userMockData,
      [usernameLower]: {
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        contact: formData.contact,
        name: formData.name,
        address: formData.address,
        din: formData.din,
        dateOfIncorporation: formData.dateOfIncorporation,
        category: formData.category,
        rocCode: formData.rocCode,
        status: formData.status,
      },
    };

    setUserMockData(newUserMockData);
    localStorage.setItem('userMockData', JSON.stringify(newUserMockData));
    alert(userMockData[usernameLower] ? 'User updated' : 'New user created');

    setFormData({
      username: '',
      age: '',
      gender: '',
      email: '',
      contact: '',
      name: '',
      address: '',
      din: '',
      dateOfIncorporation: '',
      category: '',
      rocCode: '',
      status: '',
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-orange-500 px-8 py-4 flex justify-end items-center shadow-md fixed w-full top-0 left-0 z-10">
        <div className="text-white font-bold text-lg tracking-wide">GOAVEGA</div>
      </nav>

      <div className="flex items-center justify-center px-6 py-12 pt-24">
        <div className="bg-white text-black shadow-xl rounded-2xl p-10 w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-10 text-orange-500">ADMINISTRATION</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Username*', 'username', 'text'],
              ['Age*', 'age', 'number'],
              ['Gender*', 'gender', 'select'],
              ['Email*', 'email', 'email'],
              ['Contact*', 'contact', 'text'],
              ['Full Name*', 'name', 'text'],
              ['Address*', 'address', 'text'],
              ['DIN*', 'din', 'text'],
              ['Date of Incorporation*', 'dateOfIncorporation', 'date'],
              ['Category*', 'category', 'text'],
              ['RoC Code*', 'rocCode', 'text'],
              ['Status*', 'status', 'text'],
            ].map(([label, name, type]) => (
              <div key={name}>
                <label className="block text-sm text-gray-600 mb-1">{label}</label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={isReadOnly(name)}
                    className="w-full border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    maxLength={name === 'age' ? 3 : undefined}
                    placeholder={`Enter ${label.replace('*', '')}`}
                    readOnly={isReadOnly(name)}
                    className="w-full border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
