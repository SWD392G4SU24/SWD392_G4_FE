import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.scss";

function AboutUs() {
  const [about, setAbout] = useState([]);

  const fetchAU = async () => {
    const rs = await axios.get(
      "https://665aa0df003609eda45e5ea3.mockapi.io/JeWellry"
    );

    setAbout(rs.data);
    console.log(rs.data);
  };

  useEffect(() => {
    fetchAU();
  }, []);

  const filterPic = about.find((au) => au.id === "1");

  return (
    <div>
      {/* {about.map((au) => (
        <img key={au.id} src={au.poster_path} />
      ))} */}
      <div className="pic_au">
        <div className="pic_text">
          <h1 className="text-3xl ">{filterPic?.content} </h1>
          <h3>
            <hr className="pb-12"/>
            Jewelry là một trang web bán trang sức trực tuyến đáng tin cậy và
            đáng để khám phá. Với một bộ sưu tập đa dạng gồm các loại trang sức
            từ vàng, bạc đến kim cương và ngọc trai, Jewelry cung cấp cho người
            dùng những lựa chọn tuyệt vời để tạo điểm nhấn cho phong cách cá
            nhân. Với giao diện trực quan và dễ sử dụng, việc tìm kiếm và mua
            sắm trên Jewelry trở nên đơn giản và tiện lợi. Bạn có thể dễ dàng
            duyệt qua các danh mục sản phẩm, tìm kiếm theo kiểu dáng, chất liệu
            và mức giá phù hợp. Ngoài ra, Jewelry cũng cung cấp thông tin chi
            tiết về mỗi sản phẩm, bao gồm hình ảnh chất lượng cao và mô tả chi
            tiết, giúp bạn có cái nhìn rõ ràng trước khi quyết định mua hàng.{" "}
            <br />
            <br />
            Với chất lượng sản phẩm cao cấp và thiết kế đẹp mắt, mỗi món trang
            sức trên trang web đều được chế tác tỉ mỉ và tỏa sáng với sự tinh
            tế. Jewelry cam kết đảm bảo chất lượng và sự hài lòng của khách hàng
            thông qua dịch vụ chăm sóc khách hàng tận tâm và giao hàng nhanh
            chóng. Với việc đảm bảo an toàn và bảo mật thông tin cá nhân,
            Jewelry tạo điều kiện thuận lợi cho việc thanh toán trực tuyến an
            toàn và vận chuyển hàng hóa nhanh chóng đến tận nhà. Bạn cũng có thể
            tận hưởng lợi ích của chính sách đổi trả và bảo hành linh hoạt, đảm
            bảo sự hài lòng và tin tưởng tuyệt đối khi mua sắm trên trang web.{" "}
            <br />
            <br />
            Hãy truy cập vào Jewelry ngay hôm nay để khám phá và mua sắm những
            món trang sức tuyệt đẹp cho bản thân hoặc để tặng cho những người
            thân yêu trong cuộc sống của bạn. Thể hiện phong cách và cá nhân của
            bạn với những món trang sức tinh tế và đẳng cấp từ Jewelry!
          </h3>
        </div>
        <img src={filterPic?.poster_path} className="w-full" />
      </div>
    </div>
  );
}

export default AboutUs;
