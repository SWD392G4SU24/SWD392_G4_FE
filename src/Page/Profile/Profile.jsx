/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import styles from './Profile.module.scss';
import customStyles from './CustomStyles.module.scss'; 
import { HeartOutlined, MailOutlined, PhoneOutlined, UserOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Flex, Input,ColorPicker } from 'antd';
function Profile() {
    const [activeTab, setActiveTab] = useState('Tài Khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const contentRef = useRef(null); // Tham chiếu tới phần nội dung
    const [orderFilter, setOrderFilter] = useState('All');

    const [orders, setOrders] = useState([
        {
            id: 1,
            name: 'RING OF LEAVES',
            date: '15.01.2023',
            price: '200,000 VND',
            status: 'Đã thanh toán',
            image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
        },
        {
            id: 2,
            name: 'SIGNET RING',
            date: '15.05.2024',
            price: '100,000 VND',
            status: 'Chưa thanh toán',
            image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
        },
    ]);
    

    const { TextArea } = Input;
    const onChange = (e) => {
        console.log('Change:', e.target.value);
      };
 

    const openEditForm = () => {
        setIsEditing(true);
        setIsSidebarHidden(true);
    };

    const closeEditForm = () => {
        setIsEditing(false);
        setIsSidebarHidden(false);
        if (contentRef.current) {
          // Cuộn trang đến vị trí nội dung sau khi đóng form chỉnh sửa
          contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
  

    const renderContent = () => {
        switch(activeTab) {
            case 'Tài Khoản':
                return (
                    <div className={styles.infoSection} ref={contentRef}>
                        <h2 style={{color:'#B18165'}}>Accumulated Points</h2>
                        <label className={styles.fontstyle}>Preferred Name</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p}>
                                 <span className={styles.infoItem_span}><UserOutlined/></span>
                                 Scarlett Fitzgerald Smith
                             </p>
                        </div>
                        <label className={styles.fontstyle}>Email</label>
                        <div className={styles.infoItem}>
                            <p className={styles.infoItem_p} >
                                <span className={styles.infoItem_span}><MailOutlined/></span> 
                                Scarlett.smith@gmail.com
                            </p>
                        </div>
                        <label className={styles.fontstyle}>Phone number</label>
                        <div className={styles.infoItem}>
                            <p  className={styles.infoItem_p}>
                                 <span className={styles.infoItem_span}><WhatsAppOutlined/></span>
                                 0123465987
                           </p>
                        </div>
                        <div className={styles.buttonPosition}>
                            <button className={styles.editButton} onClick={openEditForm}>Chỉnh sửa thông tin</button>
                        </div>
                    </div>
                );
                case 'Yêu Thích':
                return (
                    <div className={styles.favoritesSection}>
                        <h1>Sản phẩm yêu thích</h1>
                        <div className={styles.favoriteItem}>
                            <img className={styles.favoriteItem_Img} style={{width:'200px',height:'170px'}} src="https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg" alt="ảnh" />
                            
                            <div className={styles.favoriteItem_Name_Item} >
                            <img style={{marginBottom:'75px'}} src="./img/imgProfile/icon/ph_heart-thin.svg" alt="Heart icon" />
                             
                            <p > 
                                LEAFY CHAIN 
                                <br/>
                                <span>$80.00</span>
                                </p>
                            </div>
                            
                            <div className={styles.favoriteItem_Info}>
                                <button className={styles.favoriteButton}>Mua ngay</button>
                            </div>
                        </div>
                                    
                    </div>
                );
            case 'Đơn hàng':
                
                    return (
                        <div className={styles.orderHistorySection}>
                            <h1>Order History</h1>
                            <div className={styles.orderFilter}>
                                <div style={{width:100, height:50 , marginRight:'10px'}}>
                                    <button className={orderFilter === 'All' ? styles.active : ''} onClick={() => setOrderFilter('All')}>All</button>
                                </div>
                                <div style={{width:100, height:50 , marginRight:'70px'}}>
                                <button  className={orderFilter === 'Processing' ? styles.active : ''} onClick={() => setOrderFilter('Processing')}>Processing</button>
                                </div>
                                <div style={{width:100, height:50 , marginRight:'70px'}}>
                                <button className={orderFilter === 'Completed' ? styles.active : ''} onClick={() => setOrderFilter('Completed')}>Completed</button>
                                </div>
                                
                                
                            </div>
                            {renderOrderContent()}
                        </div>
                    );
            case 'Khuyến mãi':
                return <div>Promotions content</div>;
            
            default:
                return null;
        }
    }

    const renderEditForm = () => {
        return (
            <div className={styles.infoSection}>
                <h2 style={{color:'#B18165', fontSize:'40px'}}>Chỉnh sửa thông tin</h2>
                <form>
                    <div className={styles.infoItem}>
                        <div>
                            <label className={styles.fontstyle}>Preferred Name</label>
                        </div>
                        <div>
                            <Input prefix={<UserOutlined/>}   type='text'   className={customStyles.customInput} showCount maxLength={50} onChange={onChange} />
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div>
                            <label className={styles.fontstyle}>Email</label>
                        </div>
                        <div>
                          <Input prefix={<MailOutlined />} type='text' className={customStyles.customInput} showCount maxLength={64} onChange={onChange} />
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <div>
                            <label className={styles.fontstyle}>Phone number</label>
                        </div>
                        <div>
                        <Input prefix={<WhatsAppOutlined />} type='text' className={customStyles.customInput}  showCount maxLength={11} onChange={onChange} />
                        </div>
                    </div>
                    <div className={styles.buttonPosition}>
                        <button className={styles.editButton} onClick={closeEditForm}>Lưu thay đổi</button>
                        <button className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
                    </div>
                </form>
            </div>
        );
    }

    const renderOrderContent = () => {
        const orders = [
            {
                id: 1,
                name: 'RING OF LEAVES',
                date: '15.01.2023',
                price: '200,000 VND',
                status: 'Completed',
                image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
            },
            {
                id: 2,
                name: 'SIGNET RING',
                date: '15.05.2024',
                price: '100,000 VND',
                status: 'Processing',
                image: 'https://www.pnj.com.vn/blog/wp-content/uploads/2023/05/top-5-trang-suc-ecz-pnj-hot-nhat-thang-5-2023-than-nhien-net-yeu-thuong-2-1024x768.jpg',
            },
        ];

        const filteredOrders = orders.filter(order => orderFilter === 'All' || order.status === orderFilter);

        return (
            <div className={styles.ordersList}>
                {filteredOrders.map(order => (
                    <div key={order.id} className={styles.orderDetails}>
                        <img src={order.image} alt={order.name} className={styles.orderImage} />
                        <div>
                            <h2>{order.name}</h2>
                            <p>Ngày: {order.date}</p>
                            <p>Giá: {order.price}</p>
                            <p>Trạng thái: {order.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    

    return (
        <div className={styles.container}>
            <h1 className={styles.thongtin} style={{ display: isSidebarHidden ? 'none' : 'block' }}>Thông tin của tôi</h1>
            <div className={styles.row}>
                <div className={styles.sidebar} style={{ display: isSidebarHidden ? 'none' : 'block' }}>  
                    <ul className={styles.listGroup}>
                        {['Tài Khoản', 'Yêu Thích', 'Đơn hàng', 'Khuyến mãi'].map(tab => (
                            <li
                                key={tab}
                                className={`${styles.listHover} ${styles.customList} ${activeTab === tab ? styles.active : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className={styles.divider} style={{ display: isSidebarHidden ? 'none' : 'block' }}></div>
                <div className={styles.content}>
                    {isEditing ? renderEditForm() : renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Profile;





