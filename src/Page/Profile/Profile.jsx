
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import styles from './Profile.module.scss';
import { MailOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Input } from 'antd';
// Formik này là để lấy dữ liệu từ ô mình nhập
import { withFormik, Form } from 'formik';
// Check validation
import * as Yup from 'yup';
import { display } from '@mui/system';
import api from "../../config/axios";
import { selectId } from "../../redux/features/counterSlice";
import { useSelector } from 'react-redux';


function Profile(props) {
    
    const [activeTab, setActiveTab] = useState('Tài Khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const contentRef = useRef(null); // Tham chiếu tới phần nội dung
    const [user, setUser] = useState(null);//setState getUser

    const [submitComplete, setSubmitComplete] = useState(false);
    const [orderFilter, setOrderFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    // Reset the current page to 1 when the filter changes  
    const handleFilterChange = (filter) => {   
        setOrderFilter(filter);       
         setCurrentPage(1);
    }; 
    const [orderHistory, setOrderHistory] = useState([]); // setState for order histor
    const ordersPerPage = 3; // Số đơn hàng trên mỗi trang
    const [error, setError] = useState(null);

    const userId = useSelector(selectId); // Lấy user ID từ Redux store 
    const [alertContent, setAlertContent] = useState("");

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
        isValid 
    } = props;

    const openEditForm = () => {
        setIsEditing(true);
        setIsSidebarHidden(true);
        setFieldValue('fullName',user.fullName);
        setFieldValue('email', user.email); 
        setFieldValue('phoneNumber', user.phoneNumber);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setIsSidebarHidden(false);
        if (contentRef.current) {
            // Cuộn trang đến vị trí nội dung sau khi đóng form chỉnh sửa
            contentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    


    // Lấy API thông tin khách hàng API
    const getUserProfile = async () => {
        try {
          // Make API call with token and ID
          const userInfor = await api.get(`/user-current`);
          setUser(userInfor.data); // Assuming API returns user data directly
        } catch (err) {
          setError(err);
        }
    };
    
    //Api get history order
    const getOrderHistory = async () => {
        try {
          const pageNumber = 1; // Trang đầu tiên
          const pageSize = 10; // Số lượng đơn hàng trên mỗi trang
      
          const response = await api.get(`/order/get-by-userID?PageNumber=${pageNumber}&PageSize=${pageSize}&UserID=${userId}`);
          setOrderHistory(response.data.data); // Assuming API returns the order history data
          console.log(response.data.data);
        } catch (err) {
          setError(err);
          console.log("Error: ", err.response?.data || err.message);
        }
      };

    useEffect(() => {
        getUserProfile();
        getOrderHistory()
  
    }, [])
   

    // const updateUserProfile = async () => {
    //     try {
    //       const formData = new FormData();
    //       formData.append("UserID", userId); // Thêm UserID vào dữ liệu gửi đi
    //       formData.append("fullName", values.fullName);
    //       formData.append("email", values.email);
    //       formData.append("phoneNumber", values.phoneNumber);
    
    //       const response = await api.patch(`/user/update`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
    //       setUser(response.data);
    //       setAlertContent("Cập nhật thông tin thành công!");
    //       // Lưu thông báo thành công vào localStorage
    //       localStorage.setItem('Cập nhật thông tin thành công!', 'true');
    //       console.log(response.data);
    //     } catch (err) {
    //       setError(err);
    //       console.log("Error: ", err.response?.data || err.message);
    //     }
    //   }
     
   
    //   const handleSubmit = (e) => {
    //     // e.preventDefault();
    //     updateUserProfile();
    //     getUserProfile();
 
     
    //   };

    

    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("UserID", userId);
            formData.append("fullName", values.fullName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
    
            const response = await api.patch(`/user/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setUser(response.data);
            console.log(response.data);
            setSubmitComplete(true);
            window.location.href = "/profile";
        } catch (err) {
            setError(err); // Hiển thị lỗi để debug
            console.log("Error: ", err.response?.data || err.message);
            // Hiển thị thông báo lỗi cho người dùng
            setAlertContent("Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.");
        }
    };
   
      const handleSubmit = (e) => {
         // Ngăn chặn mặc định của sự kiện form submit nếu chưa hoàn thành
    if (!submitComplete) {
        e.preventDefault();
       
    }
    // Thực hiện cập nhật thông tin
    updateUserProfile();

      };

    // render các mục lớn trong profile
    const renderContent = () => {
        if (!user) {
            return <div className={styles.loader} >Đang tải....</div>;
        }
        switch (activeTab) {
            case "Tài Khoản":
                return (
                    <div className={styles.infoSection} ref={contentRef}>
                        <h2 style={{ color: "#B18165", fontSize: "30px" }}>Điểm tích lũy: {user.point}</h2>
                        <label className={styles.fontstyle}>Biệt danh</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <UserOutlined />
                                </span>
                                {user.fullName}
                            </p>
                        </div>
                        <label className={styles.fontstyle}>Email</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <MailOutlined />
                                </span>
                                {user.email}
                            </p>
                        </div>
                        <label className={styles.fontstyle}>Số điện thoại</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <WhatsAppOutlined />
                                </span>
                                {user.phoneNumber}
                            </p>
                        </div>
                        <div className={styles.buttonPosition}>
                            <button className={styles.editButton} onClick={openEditForm}>
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                );
            case "Yêu Thích":
                return (
                    <div className={styles.favoritesSection}>
                        <h1>Sản phẩm yêu thích</h1>
                        <div className={styles.favoriteItem}>
                            <img
                                className={styles.favoriteItem_Img}
                                style={{ width: "200px", height: "170px" }}
                                src="https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg"
                                alt="ảnh"
                            />
                            <div className={styles.favoriteItem_Name_Item}>
                                <img
                                    style={{ marginBottom: "75px" }}
                                    src="./img/imgProfile/icon/ph_heart-thin.svg"
                                    alt="Heart icon"
                                />
                                <p>
                                    LEAFY CHAIN
                                    <br />
                                    <span>$80.00</span>
                                </p>
                            </div>
                            <div className={styles.favoriteItem_Info}>
                                <button
                                    className={styles.favoriteButton}
                                    onClick={() => {
                                        window.location.href = "/orderreview";
                                    }}
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "Đơn hàng":
                return (
                    <div className={styles.orderHistorySection}>
                        <div className={styles.orderFilter}>
                            <div style={{ width: 150, height: 50, marginRight: "10px" }}>
                                <button
                                    className={orderFilter === "All" ? styles.active : ""}
                                    onClick={() => handleFilterChange("All")}
                                >
                                    Tất cả
                                </button>
                            </div>
                            <div style={{ width:  150, height: 50, marginRight: "20px"}}>
                                <button
                                    className={orderFilter === "COMPLETED" ? styles.active : ""}
                                    onClick={() => handleFilterChange("COMPLETED")}
                                >
                                  Hoàn tất
                                </button>
                            </div>
                            <div style={{ width:  200, height: 50, marginRight: "20px"}}>
                                <button
                                    className={orderFilter === "PAID" ? styles.active : ""}
                                    onClick={() => handleFilterChange("PAID")}
                                >
                                    Đã thanh toán
                                </button>
                            </div>
                           

                            <div style={{ width:  150, height: 50, marginRight: "20px"}}>
                                <button
                                    className={orderFilter === "REFUND" ? styles.active : ""}
                                    onClick={() => handleFilterChange("REFUND")}
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </div>
                        {renderOrderContent()}
                    </div>
                );
            case "Khuyến mãi":
                return <div>Promotions content</div>;
            default:
                return null;
        }
    };

    const renderEditForm = () => {
        return (
            <div className={styles.infoSection}>
              
                <div>
                    <h2 style={{ color: '#B18165', fontSize: '40px' }}>Chỉnh sửa thông tin</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.editItem}>
                        <div >
                            <div>
                                <label className={styles.fontstyle}>Biệt danh</label>
                            </div>
                            <div className={styles.infoItemEditItem}>
                                <Input
                                    prefix={<UserOutlined />}
                                    type='text'
                                    className={styles.customInputEdit}
                                    showCount
                                    maxLength={50}
                                    name="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                />
                                
                            </div>
                            {touched.fullName && errors.fullName && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.fullName}</div>}
                        </div>
                        <div className={styles.infoItemEditItem}  >
                            <div>
                                <label className={styles.fontstyle}>Email</label>
                            </div>
                            <div>
                                <Input
                                    prefix={<MailOutlined />}
                                    type='text'
                                    className={styles.customInputEdit}
                                    showCount
                                    maxLength={64}
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>
                            {touched.email && errors.email && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.email}</div>}
                        </div>
                        <div >
                            <div>
                                <label className={styles.fontstyle}>Số điện thoại</label>
                            </div>
                            <div>
                                <Input
                                    prefix={<WhatsAppOutlined />}
                                    type='text'
                                    className={styles.customInputEdit}
                                    showCount
                                    maxLength={11}
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phoneNumber}
                                />
                            </div>
                            {touched.phoneNumber && errors.phoneNumber && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.phoneNumber}</div>}
                        </div>
                        <div className={styles.buttonPositionEdit}>
                            <button type="submit" className={styles.editButton} disabled={!isValid} >Lưu thay đổi</button>
                            <button type="button" className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
                        </div>
                    </div>

                </form>
                
            </div>
        );
    };


    const renderOrderContent = () => {
    

        const filteredOrders = orderHistory.filter(
            (order) => orderFilter === "All" || order.status === orderFilter
        );

        // Calculate total pages
        const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

        // Get current orders
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
                 
        return (
            <div>
              <div className={styles.ordersList}>
                {currentOrders.length > 0 ? (
                  currentOrders.map(order => (
                    <div key={order.id} className={styles.orderDetails}>
                      <img src={order.orderDetailsDto[0].productImgUrl} alt={order.orderDetailsDto[0].product} className={styles.orderImage} />
                      <div className={styles.orderInfo}>
                        <div>
                          <h2 className={styles.orderName}>{order.orderDetailsDto[0].product}</h2>
                          <p className={styles.orderQuantity}>Số Lượng: {order.orderDetailsDto[0].quantity}</p>
                          <p className={styles.orderPrice}>Giá: {order.orderDetailsDto[0].productCost}</p>
                          <p className={styles.orderTotalPrice}>Tổng tiền: {order.totalCost}</p>
                        </div>
                      </div>
                      <div className={styles.containerDateAndStatus}>
                        <p className={styles.orderDate}>Ngày: {new Date(order.pickupDate).toLocaleDateString()}</p>
                        <div className={`${styles.statusContainer} ${order.status === 'COMPLETED' ? styles.completed : ''} ${order.status === 'PAID' ? styles.processing : ''} ${order.status === 'REFUND' ? styles.cancelled : ''}`}>
                          <p className={styles.status}>{order.status}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.notFoundStatusHistory}>Không tìm thấy lịch sử giao dịch.</p>
                )}
              </div>
          
              {currentOrders.length > 0 && (
                <div className={styles.pagination}>
                  <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
                    Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? styles.active : ''}>
                      {index + 1}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages}>
                    Sau
                  </button>
                </div>
              )}
            </div>
          );
          
    };

    

    return (
        <div className={styles.container}>
            <button
                onClick={() => {
                    window.location.href = "/";
                }}
                className="pb-2 pt-7 text-gray-500 pl-5 text-lg"
            >
                Quay về
            </button>
            <h1
                className={styles.thongtin}
                style={{ display: isSidebarHidden ? "none" : "block" }}
            >
                Thông tin của tôi
            </h1>
            <div className={styles.row}>
                <div
                    className={styles.sidebar}
                    style={{ display: isSidebarHidden ? "none" : "block" }}
                >
                    <ul className={styles.listGroup}>
                        {["Tài Khoản", "Yêu Thích", "Đơn hàng", "Khuyến mãi"].map((tab) => (
                            <li
                                key={tab}
                                className={`${styles.listHover} ${styles.customList} ${activeTab === tab ? styles.active : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                <div
                    className={styles.divider}
                    style={{ display: isSidebarHidden ? "none" : "block" }}
                ></div>
                <div className={styles.content}>
                    {isEditing ? renderEditForm() : renderContent()}
                </div>
            </div>
        </div>
    );
}

const ProfileWithFormik = withFormik({
    mapPropsToValues: () => ({
        fullName: '',
        email: '',
        phoneNumber: '', 
    }),
    validationSchema: Yup.object().shape({
        fullName: Yup.string()
        .required('Biệt danh là bắt buộc')
        .max(50, 'Biệt danh tối đa 50 ký tự'),
    email: Yup.string()
        .email('Email không hợp lệ')
        .required('Email là bắt buộc')
        .max(64, 'Email tối đa 64 ký tự'),
    phoneNumber: Yup.string()
        .required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa ký tự số')
        .min(10, 'Số điện thoại tối thiểu 10 số')
        .max(15, 'Số điện thoại tối đa 15 số')
}),

// handleSubmit: (values, { props }) => {
//     props.updateUserProfile1(values); // Gọi hàm updateUserProfile từ props
// },
displayName: 'MyProfileForm',
})(Profile);

export default ProfileWithFormik;

