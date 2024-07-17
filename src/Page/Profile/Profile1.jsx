import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectId } from "../../redux/features/counterSlice";
import { Space } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';

function Profile1() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Số sản phẩm hiển thị trên mỗi trang
  const userId = useSelector(selectId);

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
        <h2>Sản phẩm yêu thích</h2>
        {currentProducts.length > 0 ? (
          <div>
            {currentProducts.map(product => (
              <div className={styles.favoritesSection} key={product.id}>
                <img src={product.imageURL} alt={product.name} width="100" />
                <div className={styles.favoriteInfor}>
                  <Space className="heart_icon text-xl" onClick={() => toggleFavorite(product.id)}>
                    {checkFavoriteStatus(product.id) ? (
                      <HeartFilled style={{ color: "#B18165" }} />
                    ) : (
                      <HeartOutlined />
                    )}
                  </Space>
                  <h3>{product.name}</h3>
                  <p>Giá: {product.productCost}</p>
                </div>
                <div>
                  <button className={styles.favoriteButton}>Đi tới giỏ hàng</button>
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

  return (
    <div>
      {renderProductFavorites()}
    </div>
  );
}

export default Profile1;
