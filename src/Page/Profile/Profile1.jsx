/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken, selectId, selectUserName } from "../../redux/features/counterSlice";
import api from '../../config/axios';

function Profile1() {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    try {
      // Make API call with token and ID
      const user = await api.get(`/user-current`);
      setUser(user.data); // Assuming API returns user data directly
      console.log(user.data);
      console.log(user.data.fullName)
    } catch (err) {
      setError(err);
    }
};


useEffect(() => {
    getUserProfile();
}, [])

  return (
    <div>
    <h1>{user.fullName}</h1>
    <h1>{user.email}</h1>
    <h1>{user.phoneNumber}</h1>
    </div>
  );
}

export default Profile1;

