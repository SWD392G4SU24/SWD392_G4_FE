
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
    const [orderFilter, setOrderFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
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
          console.log(userInfor.data);
        } catch (err) {
          setError(err);
        }
    };
    

    useEffect(() => {
        getUserProfile();
    }, [])
   

    const updateUserProfile = async () => {
        try {
          const formData = new FormData();
          formData.append("UserID", userId); // Thêm UserID vào dữ liệu gửi đi
          formData.append("fullName", values.fullName);
          formData.append("email", values.email);
          formData.append("phoneNumber", values.phoneNumber);
    
          const response = await api.patch(`/user/update`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setUser(response.data);
          setAlertContent("Cập nhật thông tin thành công!");
          // Lưu thông báo thành công vào localStorage
          localStorage.setItem('Cập nhật thông tin thành công!', 'true');
          console.log(response.data);
        } catch (err) {
          setError(err);
          console.log("Error: ", err.response?.data || err.message);
        }
      }
      useEffect(() => {
        // Kiểm tra nếu có thông báo thành công trong localStorage
        const storedMessage = localStorage.getItem('Cập nhật thông tin thành công!');
        if (storedMessage === 'true') {
            setAlertContent("Cập nhật thông tin thành công!");
            // Xóa thông báo thành công sau khi hiển thị
            localStorage.removeItem('Cập nhật thông tin thành công!');
        }
    }, []);
   
      const handleSubmit = (e) => {
        updateUserProfile();
      };
    
    const renderContent = () => {
        if (!user) {
            return <div>Loading...</div>;
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
                            <div style={{ width: 100, height: 50, marginRight: "10px" }}>
                                <button
                                    className={orderFilter === "All" ? styles.active : ""}
                                    onClick={() => setOrderFilter("All")}
                                >
                                    All
                                </button>
                            </div>
                            <div style={{ width: 100, height: 50, marginRight: "70px"}}>
                                <button
                                    className={orderFilter === "Processing" ? styles.active : ""}
                                    onClick={() => setOrderFilter("Processing")}
                                >
                                    Processing
                                </button>
                            </div>
                            <div style={{ width: 100, height: 50, marginRight: "70px"}}>
                                <button
                                    className={orderFilter === "Completed" ? styles.active : ""}
                                    onClick={() => setOrderFilter("Completed")}
                                >
                                    Completed
                                </button>
                            </div>

                            <div style={{ width: 100, height: 50, marginRight: "70px"}}>
                                <button
                                    className={orderFilter === "Cancel" ? styles.active : ""}
                                    onClick={() => setOrderFilter("Cancel")}
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
                            <button type="submit" className={styles.editButton}>Lưu thay đổi</button>
                            <button type="button" className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
                        </div>
                    </div>

                </form>
                
            </div>
        );
    };


    const renderOrderContent = () => {
        const orders = [
            {
                id: 1,
                name: "RING OF LEAVES",
                date: "15.01.2023",
                price: "200,000 VND",
                status: "Completed",
                image:
                    "https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg",
            },
            {
                id: 2,
                name: "SIGNET RING",
                date: "15.05.2024",
                price: "100,000 VND",
                status: "Processing",
                image:
                    "https://www.pnj.com.vn/blog/wp-content/uploads/2022/03/Xay-dung-hinh-anh-moi-cho-ban-than-voi-nhung-mon-trang-suc-mau-sac-ruc-ro-1-1024x768.jpg",
            },
            {
              id: 3,
              name: "SIGNET RING",
              date: "15.05.2024",
              price: "100,000 VND",
              status: "Processing",
              image:
                  "https://cdn.pnj.io/images/detailed/183/on-bo-trang-suc-cuoi-vang-24k-pnj-trau-cau-00360-02848-1.jpg",
          },
          {
            id: 4,
            name: "SIGNET RING",
            date: "15.05.2024",
            price: "100,000 VND",
            status: "Processing",
            image:
                "https://cdn.pnj.io/images/detailed/38/bo-trang-suc-pnj-vang-18k-dinh-da-ruby-71605.600-71606.600-71607.600.jpg",
        },
        {
          id: 5,
          name: "SIGNET RING",
          date: "15.05.2024",
          price: "100,000 VND",
          status: "Processing",
          image:
              "https://www.pnj.com.vn/blog/wp-content/uploads/2023/04/top-5-trang-suc-y-pnj-duoc-ua-chuong-nhat-thang-4-2023-1-1024x768.jpg",
      },
      {
        id: 6,
        name: "SIGNET RING",
        date: "15.05.2024",
        price: "100,000 VND",
        status: "Cancel",
        image:
            "https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg",
    },
        ];

        const filteredOrders = orders.filter(
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
            {currentOrders.map(order => (

                <div key={order.id} className={styles.orderDetails}>
                        <img src={order.image} alt={order.name} className={styles.orderImage} />
                        <div className={styles.orderInfo}>
                            <div>
                                <h2 className={styles.orderName}>{order.name}</h2>
                                <p className={styles.orderQuantity}>Số Lượng: 1 </p>
                                <p className={styles.orderPrice}>Giá: {order.price}</p>
                                <p className={styles.orderTotalPrice}>Tổng tiền: {order.price}</p>
                            </div>
                        </div>
                        <div className={styles.containerDateAndStatus}>
                            <p className={styles.orderDate}>Ngày: {order.date}</p>
                            <div className={`${styles.statusContainer} ${order.status === 'Completed' ? styles.completed : ''} ${order.status === 'Processing' ? styles.processing : ''} ${order.status === 'Cancel' ? styles.cancelled : ''}`}>
                                <p className={styles.status}>{order.status}</p>
                            </div>
                        </div>
                </div>

            ))}
        </div>
                <div className={styles.pagination}>
                    <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? styles.active : ''}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
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

