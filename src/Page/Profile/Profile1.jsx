

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken, selectId, selectUserName } from "../../redux/features/counterSlice";
import api from '../../config/axios';

function Profile1() {
  const userId = useSelector(selectId); // Lấy user ID từ Redux store nếu có
  const [user, setUser] = useState(null);
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/user-current`);
      setUser(response.data); // Assuming API returns user data directly
      console.log(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("UserID", userId); // Thêm UserID vào dữ liệu gửi đi
      formData.append("fullName", newFullName);
      formData.append("email", newEmail);
      formData.append("phoneNumber", newPhoneNumber);

      const response = await api.patch(`/user/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
      console.log("Error: ", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile();
  };

  return (
    <div>
      <h1>{user?.fullName}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.phoneNumber}</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Profile1;

