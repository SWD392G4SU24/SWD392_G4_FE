
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/features/counterSlice";
import api from "../../config/axios";
import styles from './Profile.module.scss';

function Profile1() {
  const userId = useSelector(selectId);
  const [promotions, setPromotions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const promotionsPerPage = 5;
  
  const [focusedItemId, setFocusedItemId] = useState(null);
  const [copiedItemId, setCopiedItemId] = useState(null);
  const itemRefs = useRef({});

  useEffect(() => {
    getUserPromotion();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userId]);

  const handleClickOutside = (event) => {
    if (focusedItemId) {
      const focusedItemElement = itemRefs.current[focusedItemId];
      if (focusedItemElement && !focusedItemElement.contains(event.target)) {
        setFocusedItemId(null);
      }
    }
  };

  const getUserPromotion = async () => {
    try {
      const pageNumber = 1;
      const pageSize = 50;
      const prom = await api.get(`/Promotion/get-by-userID?PageNumber=${pageNumber}&PageSize=${pageSize}&UserId=${userId}`);
      setPromotions(prom.data.value.data);
    } catch (err) {
      console.error(err);
    }
  };

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
                        {copiedItemId === promotion.id ? "Đã sao chép" : "Sao chép mã"}
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
    <div>
      {renderPromotion()}
    </div>
  );
}

export default Profile1;