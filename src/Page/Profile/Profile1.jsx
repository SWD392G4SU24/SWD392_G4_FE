

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser, selectToken, selectId, selectUserName } from "../../redux/features/counterSlice";
// import api from '../../config/axios';

// function Profile1() {
//   const userId = useSelector(selectId); // Lấy user ID từ Redux store nếu có
//   const [user, setUser] = useState(null);
//   const [newFullName, setNewFullName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [error, setError] = useState(null);

//   const getUserProfile = async () => {
//     try {
//       const response = await api.get(`/user-current`);
//       setUser(response.data); // Assuming API returns user data directly
//       console.log(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const updateUserProfile = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("UserID", userId); // Thêm UserID vào dữ liệu gửi đi
//       formData.append("fullName", newFullName);
//       formData.append("email", newEmail);
//       formData.append("phoneNumber", newPhoneNumber);

//       const response = await api.patch(`/user/update`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setUser(response.data);
//       console.log(response.data);
//     } catch (err) {
//       setError(err);
//       console.log("Error: ", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateUserProfile();
//   };

//   return (
//     <div>
//       <h1>{user?.fullName}</h1>
//       <h1>{user?.email}</h1>
//       <h1>{user?.phoneNumber}</h1>
      
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Full Name:</label>
//           <input
//             type="text"
//             value={newFullName}
//             onChange={(e) => setNewFullName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             value={newPhoneNumber}
//             onChange={(e) => setNewPhoneNumber(e.target.value)}
//           />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>

//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// }

// export default Profile1;

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
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState(null);

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/user-current`);
      setUser(response.data); // Giả sử API trả về dữ liệu người dùng trực tiếp
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
      setUser(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      setError(err);
      console.log("Error: ", err.response?.data || err.message);
    }
  };

  const getOrderHistory = async () => {
    try {
      const pageNumber = 1; // Trang đầu tiên
      const pageSize = 5; // Số lượng đơn hàng trên mỗi trang

      const response = await api.get(`/order/get-by-userID?PageNumber=${pageNumber}&PageSize=${pageSize}&UserID=${userId}`);
      setOrderHistory(response.data.data); // Giả sử API trả về dữ liệu lịch sử đơn hàng
      console.log(response.data.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUserProfile();
    getOrderHistory();
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

      <h2>Order History</h2>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map(order => (
            order.orderDetailsDto.map(detail => (
              <li key={detail.id}>
                <p>Product: {detail.product}</p>
                <img src={detail.productImgUrl} alt={detail.product} width="100" />
                <p>Quantity: {detail.quantity}</p>
                <p>Product Cost: {detail.productCost}</p>
                <p>Status: {order.status}</p>
                <p>Lastest Update At: {order.lastestUpdateAt}</p>
              </li>
            ))
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Profile1;

