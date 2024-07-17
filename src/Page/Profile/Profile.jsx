
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import styles from './Profile.module.scss';
import { MailOutlined, UserOutlined, WhatsAppOutlined,HeartFilled, HeartOutlined, CopyOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Input, Space, Card } from 'antd';
// Formik này là để lấy dữ liệu từ ô mình nhập
import { withFormik, Form } from 'formik';
// Check validation
import * as Yup from 'yup';
import { display } from '@mui/system';
import api from "../../config/axios";
import { selectId } from "../../redux/features/counterSlice";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Profile(props) {
    
    const [activeTab, setActiveTab] = useState('Tài Khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const contentRef = useRef(null); // Tham chiếu tới phần nội dung
    const [user, setUser] = useState(null);//setState getUser
    const [submitComplete, setSubmitComplete] = useState(false); //setState submit complete
    const [orderFilter, setOrderFilter] = useState('All');
    const [promotions, setPromotions] = useState([]);//setState Promotion
    const [focusedItemId, setFocusedItemId] = useState(null); //set focus for 1 item when select copy
    const [copiedItemId, setCopiedItemId] = useState(null); // set color buttuon for copied
    const itemRefs = useRef({});
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteProducts, setFavoriteProducts] = useState([]); // set Heart favorites
    // Reset the current page to 1 when the filter changes  
    
    const handleFilterChange = (filter) => {   
        setOrderFilter(filter);       
         setCurrentPage(1);
    }; 
    const [orderHistory, setOrderHistory] = useState([]); // setState for order history
    const ordersPerPage = 3; // Số đơn hàng trên mỗi trang của page order
    const promotionsPerPage = 3; // Số đơn hàng trên mỗi trang của page promotion
    const productsPerPage = 3;
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

    const [isFocused, setIsFocused] = useState(false); // focues filter for promotion input
     
  
    //  Api get infor user
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
          const pageSize = 100; // Số lượng đơn hàng trên mỗi trang
      
          const response = await api.get(`/order/get-by-userID?PageNumber=${pageNumber}&PageSize=${pageSize}&UserID=${userId}`);
          setOrderHistory(response.data.data); // Assuming API returns the order history data
          console.log(response.data.data);
        } catch (err) {
          setError(err);
          console.log("Error: ", err.response?.data || err.message);
        }
      };
    
    //Api get promotion
    const getUserPromotion = async () => {
        try {
          const pageNumber = 1; // Trang đầu tiên
          const pageSize = 50; // Số lượng đơn hàng trên mỗi trang
          const response = await api.get(`/Promotion/get-by-userID?PageNumber=${pageNumber}&PageSize=${pageSize}&UserId=${userId}`);
          setPromotions(response.data.value.data); // Assuming API returns user data directly
          console.log(response.data.value.data);
        } catch (err) {
          setError(err);
        }
      };

    useEffect(() => {
        const delay = 1500; // Delay in milliseconds (adjust as needed)
    
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, delay));
            getUserProfile();
            getOrderHistory();
            getUserPromotion()
        };
    
        fetchData();
    }, [userId]);
    

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
            toast.success("Cập nhật thành công!");
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
                        <h1 className={styles.point} >Điểm tích lũy: {user.point}</h1>
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
                return <div>
                    <h1 className={styles.headerFavorites}>Sản phẩm yêu thích</h1>
                    {renderProductFavorites()}
                </div>
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
                                    className={orderFilter === "REFUNDED" ? styles.active : ""}
                                    onClick={() => handleFilterChange("REFUNDED")}
                                >
                                    Trả hàng
                                </button>
                            </div>
                            
                        </div>
                        {renderOrderContent()}
                    </div>
                );
            case "Khuyến mãi":
                return <div>
                 <h1 className={styles.headerPromotion}>Khuyến mãi</h1>   
                {renderPromotion()}
                </div>;
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

       
  useEffect(() => {
    const getFavoriteProducts = () => {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      return favorites.map(favorite => ({
        id: favorite.id,
        name: favorite.name,
        productCost: favorite.productCost,
        imageURL: favorite.imageURL
      }));
    };

    if (userId) {
      const products = getFavoriteProducts();
      setFavoriteProducts(products);
    }
  }, [userId]);
     

    const toggleFavorite = (productId) => {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      const itemIndex = favorites.findIndex(favorite => favorite.id === productId);
  
      let updatedFavorites;
      if (itemIndex !== -1) {
        // Remove the item if it's already in the favorites
        updatedFavorites = favorites.filter(favorite => favorite.id !== productId);
      } else {
        // Add the item to the favorites
        const productToAdd = favoriteProducts.find(product => product.id === productId);
        updatedFavorites = [...favorites, productToAdd];
      }
  
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
      setFavoriteProducts(updatedFavorites);
    };
  
    const checkFavoriteStatus = (productId) => {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      return favorites.some(favorite => favorite.id === productId);
    };

    const renderProductFavorites = () => {
      const totalPages = Math.ceil(favoriteProducts.length / productsPerPage);
  
      // Lấy sản phẩm hiện tại trên trang currentPage
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = favoriteProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
      return (
        <div>
          {currentProducts.length > 0 ? (
            <div>
              {currentProducts.map(product => (
                <div className={styles.favoritesSection} key={product.id}>
                  <div><img src={product.imageURL} alt={product.name} width="110" /></div>
                  

                  <div className={styles.favoriteInfor}>
                    <Space className="heart_icon text-xl" onClick={() => toggleFavorite(product.id)}>
                      {checkFavoriteStatus(product.id) ? (
                        <div class={styles.tooltip}>
                          
                        <HeartFilled className={styles.heartIcon}  />  
                        <span class={styles.tooltiptext}> Bỏ Thích</span>
                        </div>
                      ) : (
                        <HeartOutlined className={styles.heartIcon}/>
                      )}
                    </Space>
                    <h2>{product.name}</h2>
                    <p>Giá: {product.productCost}</p>
                  </div>
                  <div>
                    <button className={styles.favoriteButton} onClick={() => {
                        window.location.href = `/prodetail/${product.id}`;
                      }} >
                        Xem chi tiết sản phẩm
                    </button>
                  </div>
                </div>
              ))}
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
            </div>
          ) : (
            <p className={styles.notFoundStatusHistory}>Không tìm thấy sản phẩm yêu thích</p>
          )}
        </div>
      );
    };
  
    const renderOrderContent = () => {
    
        const filtered = orderHistory.filter(
            (order) => orderFilter === "All" || order.status === orderFilter
        );
    
        // Calculate total pages
        const totalPages = Math.ceil(filtered.length / ordersPerPage);
    
        // Get current orders
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders = filtered.slice(indexOfFirstOrder, indexOfLastOrder);
        
       
                 
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
                        <div className={`${styles.statusContainer} ${order.status === 'COMPLETED' ? styles.completed : ''} ${order.status === 'PAID' ? styles.processing : ''} ${order.status === 'REFUNDED' ? styles.cancelled : ''}`}>
                                  <p className={styles.status}>
                                      {order.status === 'COMPLETED' ? 'ĐÃ HOÀN THÀNH' :
                                       order.status === 'PAID' ? 'ĐÃ THANH TOÁN' :
                                       order.status === 'REFUNDED' ? 'ĐÃ HOÀN TRẢ' :
                                       order.status}
                                  </p>
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
   
    // Hàm tính toán và hiển thị các khuyến mãi hiện tại và phân trang
   
  const renderPromotion = () => {
    const totalPages = Math.ceil(promotions.length / promotionsPerPage);
    const indexOfLastPromotion = currentPage * promotionsPerPage;
    const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
    const currentPromotions = promotions.slice(indexOfFirstPromotion, indexOfLastPromotion);
    const copyIt = async (promotionId) => {
      const copyInput = document.querySelector(`#copyvalue-${promotionId}`);
    
      try {
        await navigator.clipboard.writeText(copyInput.value);
        setFocusedItemId(promotionId);
        setCopiedItemId(promotionId);
        setTimeout(() => {
          setCopiedItemId(null);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }; 
    return (
      <div>
        <div className={styles.promotionsList}>
          {currentPromotions.length > 0 ? (
            currentPromotions.map((promotion) => (
              <div 
                key={promotion.id} 
                className={styles.promotionSection}
                ref={el => itemRefs.current[promotion.id] = el}
              >
                <div className={styles.promotionCard}>
                  <div className={styles.promotionLogo}>
                    <img 
                      src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/00319_DIAMOND_Jewelry-03.png"
                      alt="Promotion Icon"
                      className={styles.promotionIcon}
                    /> 
                    <h2 className={styles.promotionLogoFont}>JeWellry</h2>
                  </div>
                  <div className={styles.promotionDetails}>
                    <h2>{promotion.description}</h2>
                    <h3>Cho đơn từ {promotion.conditionsOfUse}K</h3>
                    <p>Ngày hết hạn: {new Date(promotion.expiresTime).toLocaleDateString()}</p>
                  </div>
                  <div className={styles.promotionCodeSection}>
                    <div className={styles.codeContainer}>
                      <input
                        type="text"
                        id={`copyvalue-${promotion.id}`}
                        defaultValue={promotion.id}
                        readOnly
                        className={`${styles.copyInput} ${focusedItemId === promotion.id ? styles.focused : ''}`}
                      />
                      <button 
                        className={`${styles.applyButton} ${copiedItemId === promotion.id ? styles.copied : ''}`}
                        onClick={() => copyIt(promotion.id)}
                      >
                        {copiedItemId === promotion.id ? <CheckCircleOutlined /> : <CopyOutlined />}
                      </button>
                      <button onClick={() => {
                        window.location.href = "/cart";
                      }} className={styles.loctionCart}>Đi tới giỏ hàng</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.notFoundStatusHistory}>Không tìm thấy khuyến mãi.</p>
          )}
        </div>
        {currentPromotions.length > 0 && (
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
                style={{ display: isSidebarHidden ? "none" : "block" }}
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
        .test('Biệt danh là bắt buộc', value => {
          if (!value) {
              toast.err('Biệt danh là bắt buộc');
              return false;
          }
          return true;
      })
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
displayName: 'MyProfileForm',
})(Profile);

export default ProfileWithFormik;

