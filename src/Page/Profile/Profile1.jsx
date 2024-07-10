/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken, selectId, selectUserName } from "../../redux/features/counterSlice";
import api from '../../config/axios';

function Profile1() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const userInfo = useSelector(selectUser);
  const token = useSelector(selectToken);
  const id = useSelector(selectId);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
     
        // Make API call with token and ID
        const response = await api.get(`/user-current`);
        setUser(response.data); // Assuming API returns user data directly
        
      } catch (err) {
        setError(err);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Đã xảy ra lỗi: {error.message}</div>;
  }


  return (
    <div>
      <h1>Thông tin tài khoản</h1>
      {/* <p>Biệt danh: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Số điện thoại: {user.phoneNumber}</p>
      <p>Địa chỉ: {user.address}</p>
      <p>Điểm: {user.point}</p> */}
    </div>
  );
}

export default Profile1;




// import React, { useEffect, useState } from 'react';
// import api from '../../config/axios';

// function Profile1() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         // Retrieve token and ID from localStorage
//         const token = localStorage.getItem('token');
//         const id = localStorage.getItem('id');

//         // Make API call with token and ID
//         const response = await api.get(`/user/customer-pagination?id=${id}`, {
//           headers: {
//             Authorization: `${token}`,
//           },
//         });

//         // Check if the ID from storage matches the ID from API response
//         if (response.data.id !== id) {
//           throw new Error('User ID does not match');
//         }

//         setUser(response.data); // Assuming API returns user data directly
//       } catch (err) {
//         setError(err);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (error) {
//     return <div>Đã xảy ra lỗi: {error.message}</div>;
//   }

//   if (!user) {
//     return <div>Đang tải...</div>;
//   }

//   return (
//     <div>
//       <h1>Thông tin tài khoản</h1>
//       <p>Biệt danh: {user.fullName}</p>
//       <p>Email: {user.email}</p>
//       <p>Số điện thoại: {user.phoneNumber}</p>
//       <p>Địa chỉ: {user.address}</p>
//       <p>Điểm: {user.point}</p>
//     </div>
//   );
// }

// export default Profile1;