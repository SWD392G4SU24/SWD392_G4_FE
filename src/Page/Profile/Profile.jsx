/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import styles from './Profile.module.scss';
import { HeartOutlined } from "@ant-design/icons";
function Profile() {
    const [activeTab, setActiveTab] = useState('Tài Khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const contentRef = useRef(null); // Tham chiếu tới phần nội dung

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
                            <p>Scarlett Fitzgerald Smith</p>
                        </div>
                        <label className={styles.fontstyle}>Email</label>
                        <div className={styles.infoItem}>
                            <p>Scarlett.smith@gmail.com</p>
                        </div>
                        <label className={styles.fontstyle}>Phone number</label>
                        <div className={styles.infoItem}>
                            <p>0123465987</p>
                        </div>
                        <div className={styles.buttonPosition}>
                            <button className={styles.editButton} onClick={openEditForm}>Chỉnh sửa thông tin</button>
                        </div>
                    </div>
                );
                case 'Yêu Thích':
                return (
                    <div className={styles.favoritesSection}>
                        <h2>Sản phẩm yêu thích</h2>
                        <div className={styles.favoriteItem}>
                            <img src="path_to_image" alt="Leafy Chain" />
                            <div>
                                <p>LEAFY CHAIN</p>
                                <span>$80.00</span>
                                <button className={styles.favoriteButton}>Mua ngay</button>
                            </div>
                        </div>
                                    
                    </div>
                );
            case 'Đơn hàng':
                return <div>Order history content</div>;
            case 'Khuyến mãi':
                return <div>Promotions content</div>;
            
            default:
                return null;
        }
    }

    const renderEditForm = () => {
        return (
            <div className={styles.infoSection}>
                <h2 style={{color:'#B18165'}}>Chỉnh sửa thông tin</h2>
                <form>
                    <div className={styles.infoItem}>
                        <label className={styles.fontstyle}>Preferred Name</label>
                        <input type="text" value="Scarlett Fitzgerald Smith" />
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.fontstyle}>Email</label>
                        <input type="text" value="Scarlett.smith@gmail.com" />
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.fontstyle}>Phone number</label>
                        <input type="text" value="0123465987" />
                    </div>
                    <div className={styles.buttonPosition}>
                        <button className={styles.editButton} onClick={closeEditForm}>Lưu thay đổi</button>
                        <button className={styles.cancelButton} onClick={closeEditForm}>Hủy</button>
                    </div>
                </form>
            </div>
        );
    }

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
