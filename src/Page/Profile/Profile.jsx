
/* eslint-disable no-unused-vars */

import React, { useState, useRef } from "react";
import styles from "./Profile.module.scss";
import customStyles from "./CustomStyles.module.scss";
import {
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Flex, Input, ColorPicker } from "antd";
function Profile() {
  const [activeTab, setActiveTab] = useState("Tài Khoản");
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const contentRef = useRef(null); // Tham chiếu tới phần nội dung
  const [orderFilter, setOrderFilter] = useState("All");


/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import styles from './Profile.module.scss';
import customStyles from './CustomStyles.module.scss';
import { MailOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Input } from 'antd';
// Formik này là để lấy dữ liệu từ ô mình nhập
import { withFormik, Form } from 'formik';
// Check validation
import * as Yup from 'yup';

function Profile(props) {
    const [activeTab, setActiveTab] = useState('Tài Khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const contentRef = useRef(null); // Tham chiếu tới phần nội dung
    const [orderFilter, setOrderFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3; // Số đơn hàng trên mỗi trang

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    const openEditForm = () => {
        setIsEditing(true);
        setIsSidebarHidden(true);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setIsSidebarHidden(false);
        if (contentRef.current) {
            // Cuộn trang đến vị trí nội dung sau khi đóng form chỉnh sửa
            contentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Tài Khoản":
                return (
                    <div className={styles.infoSection} ref={contentRef}>
                        <h2 style={{ color: "#B18165", fontSize: "30px" }}>Điểm tích lũy</h2>
                        <label className={styles.fontstyle}>Biệt danh</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <UserOutlined />
                                </span>
                                Scarlett Fitzgerald Smith
                            </p>
                        </div>
                        <label className={styles.fontstyle}>Email</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <MailOutlined />
                                </span>
                                Scarlett.smith@gmail.com
                            </p>
                        </div>
                        <label className={styles.fontstyle}>Số điện thoại</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                <span className={styles.infoItem_span}>
                                    <WhatsAppOutlined />
                                </span>
                                0123465987
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
                        <h1>Order History</h1>
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
                <h2 style={{ color: '#B18165', fontSize: '40px' }}>Chỉnh sửa thông tin</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.infoItemEditItem}>
                        <div>
                            <label className={styles.fontstyle}>Biệt danh</label>
                        </div>
                        <div>
                            <Input
                                prefix={<UserOutlined />}
                                type='text'
                                className={customStyles.customInput}
                                showCount
                                maxLength={50}
                                name="preferredName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.preferredName}
                            />
                        </div>
                        {touched.preferredName && errors.preferredName && <div style={{ color: 'red', fontWeight: 'bold' }}>{errors.preferredName}</div>}
                    </div>
                    <div className={styles.infoItemEditItem}>
                        <div>
                            <label className={styles.fontstyle}>Email</label>
                        </div>
                        <div>
                            <Input
                                prefix={<MailOutlined />}
                                type='text'
                                className={customStyles.customInput}
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
                    <div className={styles.infoItemEditItem}>
                        <div>
                            <label className={styles.fontstyle}>Số điện thoại</label>
                        </div>
                        <div>
                            <Input
                                prefix={<WhatsAppOutlined />}
                                type='text'
                                className={customStyles.customInput}
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
                    <div className={styles.buttonPosition}>
                        <button type="submit" className={styles.editButton}>Lưu thay đổi</button>
                        <button type="button" className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
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
        status: "Processing",
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
                            <h2>{order.name}</h2>
                            <p>Ngày: {order.date}</p>
                            <p>Giá: {order.price}</p>
                        </div>
                        <div className={styles.statusContainer}>
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

export default Profile;
// ========
// import React, { useState, useRef } from 'react';
// import styles from './Profile.module.scss';
// import customStyles from './CustomStyles.module.scss';
// import { HeartOutlined, MailOutlined, PhoneOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
// import { Flex, Input,ColorPicker } from 'antd';
// function Profile() {
//     const [activeTab, setActiveTab] = useState('Tài Khoản');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isSidebarHidden, setIsSidebarHidden] = useState(false);
//     const contentRef = useRef(null); // Tham chiếu tới phần nội dung
//     const [orderFilter, setOrderFilter] = useState('All');

//     const [orders, setOrders] = useState([
//         {
//             id: 1,
//             name: 'RING OF LEAVES',
//             date: '15.01.2023',
//             price: '200,000 VND',
//             status: 'Đã thanh toán',
//             image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
//         },
//         {
//             id: 2,
//             name: 'SIGNET RING',
//             date: '15.05.2024',
//             price: '100,000 VND',
//             status: 'Chưa thanh toán',
//             image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
//         },
//     ]);

//     const { TextArea } = Input;
//     const onChange = (e) => {
//         console.log('Change:', e.target.value);
//       };

//     const openEditForm = () => {
//         setIsEditing(true);
//         setIsSidebarHidden(true);
//     };

//     const closeEditForm = () => {
//         setIsEditing(false);
//         setIsSidebarHidden(false);
//         if (contentRef.current) {
//           // Cuộn trang đến vị trí nội dung sau khi đóng form chỉnh sửa
//           contentRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//     };

//     const renderContent = () => {
//         switch(activeTab) {
//             case 'Tài Khoản':
//                 return (
//                     <div className={styles.infoSection} ref={contentRef}>
//                         <h2 style={{color:'#B18165'}}>Accumulated Points</h2>
//                         <label className={styles.fontstyle}>Preferred Name</label>
//                         <div className={styles.infoItem}>
//                             <p className={styles.infoItem_p}>
//                                  <span className={styles.infoItem_span}><UserOutlined/></span>
//                                  Scarlett Fitzgerald Smith
//                              </p>
//                         </div>
//                         <label className={styles.fontstyle}>Email</label>
//                         <div className={styles.infoItem}>
//                             <p className={styles.infoItem_p} >
//                                 <span className={styles.infoItem_span}><MailOutlined/></span>
//                                 Scarlett.smith@gmail.com
//                             </p>
//                         </div>
//                         <label className={styles.fontstyle}>Phone number</label>
//                         <div className={styles.infoItem}>
//                             <p  className={styles.infoItem_p}>
//                                  <span className={styles.infoItem_span}><WhatsAppOutlined/></span>
//                                  0123465987
//                            </p>
//                         </div>
//                         <div className={styles.buttonPosition}>
//                             <button className={styles.editButton} onClick={openEditForm}>Chỉnh sửa thông tin</button>
//                         </div>
//                     </div>
//                 );
//                 case 'Yêu Thích':
//                 return (
//                     <div className={styles.favoritesSection}>
//                         <h1>Sản phẩm yêu thích</h1>
//                         <div className={styles.favoriteItem}>
//                             <img className={styles.favoriteItem_Img} style={{width:'200px',height:'170px'}} src="https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg" alt="ảnh" />

//                             <div className={styles.favoriteItem_Name_Item} >
//                             <img style={{marginBottom:'75px'}} src="./img/imgProfile/icon/ph_heart-thin.svg" alt="Heart icon" />

//                             <p >
//                                 LEAFY CHAIN
//                                 <br/>
//                                 <span>$80.00</span>
//                                 </p>
//                             </div>

//                             <div className={styles.favoriteItem_Info}>
//                                 <button className={styles.favoriteButton}>Mua ngay</button>
//                             </div>
//                         </div>

//                     </div>
//                 );
//             case 'Đơn hàng':

//                     return (
//                         <div className={styles.orderHistorySection}>
//                             <h1>Order History</h1>
//                             <div className={styles.orderFilter}>
//                                 <div style={{width:100, height:50 , marginRight:'10px'}}>
//                                     <button className={orderFilter === 'All' ? styles.active : ''} onClick={() => setOrderFilter('All')}>All</button>
//                                 </div>
//                                 <div style={{width:100, height:50 , marginRight:'70px'}}>
//                                 <button  className={orderFilter === 'Processing' ? styles.active : ''} onClick={() => setOrderFilter('Processing')}>Processing</button>
//                                 </div>
//                                 <div style={{width:100, height:50 , marginRight:'70px'}}>
//                                 <button className={orderFilter === 'Completed' ? styles.active : ''} onClick={() => setOrderFilter('Completed')}>Completed</button>
//                                 </div>

//                             </div>
//                             {renderOrderContent()}
//                         </div>
//                     );
//             case 'Khuyến mãi':
//                 return <div>Promotions content</div>;

//             default:
//                 return null;
//         }
//     }

//     const renderEditForm = () => {
//         return (
//             <div className={styles.infoSection}>
//                 <h2 style={{color:'#B18165', fontSize:'40px'}}>Chỉnh sửa thông tin</h2>
//                 <form>
//                     <div className={styles.infoItem}>
//                         <div>
//                             <label className={styles.fontstyle}>Preferred Name</label>
//                         </div>
//                         <div>
//                             <Input prefix={<UserOutlined/>}   type='text'   className={customStyles.customInput} showCount maxLength={50} onChange={onChange} />
//                         </div>
//                     </div>
//                     <div className={styles.infoItem}>
//                         <div>
//                             <label className={styles.fontstyle}>Email</label>
//                         </div>
//                         <div>
//                           <Input prefix={<MailOutlined />} type='text' className={customStyles.customInput} showCount maxLength={64} onChange={onChange} />
//                         </div>
//                     </div>
//                     <div className={styles.infoItem}>
//                         <div>
//                             <label className={styles.fontstyle}>Phone number</label>
//                         </div>
//                         <div>
//                         <Input prefix={<WhatsAppOutlined />} type='text' className={customStyles.customInput}  showCount maxLength={11} onChange={onChange} />
//                         </div>
//                     </div>
//                     <div className={styles.buttonPosition}>
//                         <button className={styles.editButton} onClick={closeEditForm}>Lưu thay đổi</button>
//                         <button className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
//                     </div>
//                 </form>
//             </div>
//         );
//     }

//     const renderOrderContent = () => {
//         const orders = [
//             {
//                 id: 1,
//                 name: 'RING OF LEAVES',
//                 date: '15.01.2023',
//                 price: '200,000 VND',
//                 status: 'Completed',
//                 image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
//             },
//             {
//                 id: 2,
//                 name: 'SIGNET RING',
//                 date: '15.05.2024',
//                 price: '100,000 VND',
//                 status: 'Processing',
//                 image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
//             },
//         ];

//         const filteredOrders = orders.filter(order => orderFilter === 'All' || order.status === orderFilter);

//         return (
//             <div className={styles.ordersList}>
//                 {filteredOrders.map(order => (
//                     <div key={order.id} className={styles.orderDetails}>
//                         <img src={order.image} alt={order.name} className={styles.orderImage} />
//                         <div>
//                             <h2>{order.name}</h2>
//                             <p>Ngày: {order.date}</p>
//                             <p>Giá: {order.price}</p>
//                             <p>Trạng thái: {order.status}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.thongtin} style={{ display: isSidebarHidden ? 'none' : 'block' }}>Thông tin của tôi</h1>
//             <div className={styles.row}>
//                 <div className={styles.sidebar} style={{ display: isSidebarHidden ? 'none' : 'block' }}>
//                     <ul className={styles.listGroup}>
//                         {['Tài Khoản', 'Yêu Thích', 'Đơn hàng', 'Khuyến mãi'].map(tab => (
//                             <li
//                                 key={tab}
//                                 className={`${styles.listHover} ${styles.customList} ${activeTab === tab ? styles.active : ''}`}
//                                 onClick={() => setActiveTab(tab)}
//                             >
//                                 {tab}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className={styles.divider} style={{ display: isSidebarHidden ? 'none' : 'block' }}></div>
//                 <div className={styles.content}>
//                     {isEditing ? renderEditForm() : renderContent()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Profile;

=======
const ProfileWithFormik = withFormik({
    mapPropsToValues: () => ({
        preferredName: '',
        email: '',
        phoneNumber: '',
    }),
    validationSchema: Yup.object().shape({
        preferredName: Yup.string().required('Yêu cầu phải có biệt danh !').max(50, 'Biệt danh phải ít hơn 50 kí tự.'),
        email: Yup.string().required('Yêu cầu phải có email !').email('Email không hợp lệ!'),
        phoneNumber: Yup.string()
            .required('Yêu cầu phải có số điện thoại !')
            .matches(/^[0-9]*$/, 'Yêu cầu số điện thoại chỉ chứa chữ số.')
            .min(10, 'Số điện thoại phải có ít nhất 10 chữ số.')
            .max(11, 'Số điện thoại phải có tối đa 11 chữ số.'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        console.log(values);
    },
    validateOnChange: true,
    validateOnBlur: true,
    displayName: 'ProfileForm',
})(Profile);

export default ProfileWithFormik;
