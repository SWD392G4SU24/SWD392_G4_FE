// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectId } from "../../redux/features/counterSlice";
// import api from "../../config/axios";
// import { Space, Card } from "antd";
// import { HeartFilled, HeartOutlined } from "@ant-design/icons";

// function Profile1() {
//   const userId = useSelector(selectId); // Lấy user ID từ Redux store nếu có
//   const [favoriteProducts, setFavoriteProducts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFavoriteProducts();
//   }, [userId]);

//   const fetchFavoriteProducts = async () => {
//     try {
//       const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
//       if (favorites.length === 0) {
//         setFavoriteProducts([]); // Nếu không có sản phẩm yêu thích
//         return;
//       }
//       const productRequests = favorites.map((productId) => api.get(`/Product/${productId}`));
//       const responses = await Promise.all(productRequests);
//       const products = responses
//         .map((response) => response.data)
//         .filter((product) => product); // Loại bỏ các sản phẩm không tìm thấy
//       setFavoriteProducts(products);
//     } catch (err) {
//       setError("Đã xảy ra lỗi khi lấy sản phẩm yêu thích");
//     }
//   };

//   const toggleFavorite = (productId) => {
//     const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
//     let newFavorites;
//     if (favorites.includes(productId)) {
//       newFavorites = favorites.filter((favId) => favId !== productId);
//     } else {
//       newFavorites = [...favorites, productId];
//     }
//     localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
//     fetchFavoriteProducts();
//   };

//   return (
//     <div>
//       {favoriteProducts.length > 0 ? (
//         favoriteProducts.map((product) => (
//           <Card key={product.id} style={{ marginBottom: 20 }}>
//             <h1>{product.name}</h1>
//             <img src={product.imageURL} alt={product.name} width="100" />
//             <p>{product.productCost} VNĐ</p>
//             <Space className="heart_icon text-xl" onClick={() => toggleFavorite(product.id)}>
//               {favoriteProducts.some((favProduct) => favProduct.id === product.id) ? (
//                 <HeartFilled style={{ color: "#B18165" }} />
//               ) : (
//                 <HeartOutlined />
//               )}
//             </Space>
//           </Card>
//         ))
//       ) : (
//         <p>Không tìm thấy sản phẩm yêu thích</p>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Profile1;




import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/features/counterSlice";
import api from "../../config/axios";
import { Space } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from './Profile.module.scss';

function Profile1() {
  const userId = useSelector(selectId); // Lấy user ID từ Redux store nếu có
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteProducts();
  }, [userId]);

  const fetchFavoriteProducts = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      if (favorites.length === 0) {
        setFavoriteProducts([]); // Nếu không có sản phẩm yêu thích
        return;
      }
      const productRequests = favorites.map((productId) => api.get(`/Product/${productId}`));
      const responses = await Promise.all(productRequests);
      const products = responses
        .map((response) => response.data)
        .filter((product) => product); // Loại bỏ các sản phẩm không tìm thấy
      setFavoriteProducts(products);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy sản phẩm yêu thích");
    }
  };

  const toggleFavorite = (productId) => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    let newFavorites;
    if (favorites.includes(productId)) {
      newFavorites = favorites.filter((favId) => favId !== productId);
    } else {
      newFavorites = [...favorites, productId];
    }
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(newFavorites));
    fetchFavoriteProducts();
  };

  const renderProductFavorites = () => {
    if (favoriteProducts.length > 0) {
      return favoriteProducts.map((product) => (
        <div key={product.id} className={styles.favoritesSection}>
          <img
            className={styles.favoriteItem_Img}
            src={product.imageURL}
            alt={product.name}
          />
          <div className={styles.favoriteItem_Name_Item}>
            <Space className="heart_icon text-xl" onClick={() => toggleFavorite(product.id)}>
              {favoriteProducts.some((favProduct) => favProduct.id === product.id) ? (
                <HeartFilled style={{ color: "#B18165" }} />
              ) : (
                <HeartOutlined />
              )}
            </Space>
            <p>{product.name}</p>
            <p>{product.productCost} VNĐ</p>
          </div>
          <button
            className={styles.favoriteButton}
            onClick={() => {
              window.location.href = "/orderreview";
            }}
          >
            Mua ngay
          </button>
        </div>
      ));
    } else {
      return <p>Không tìm thấy sản phẩm yêu thích</p>;
    }
  };

  return (
    <div>
      {renderProductFavorites()}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Profile1;
