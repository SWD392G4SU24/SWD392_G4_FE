import React from "react";
import "./index.scss";

function BuyTutorial() {
  return (
    <div className="tutorial w-10/12 block m-auto mb-20">
      <h1>Hướng dẫn mua hàng và thanh toán</h1>
      <h2>I. Hướng dẫn mua hàng</h2>
      <h3>Cách 1. Mua hàng qua hotline</h3>
      <p>
        Quý khách hàng vui lòng liên hệ hotline (miễn phí) của JeWellry
        <strong> 0123 456 789</strong> được phục vụ một cách tốt nhất. Thời gian
        từ 8h – 21h (kể cả chủ nhật & trừ ngày lễ), đội ngũ chuyên viên tư vấn
        tại Bảo Tín Mạnh Hải luôn sẵn sàng phục vụ.
      </p>
      <br />
      <h3>Cách 2: Mua hàng qua website JeWellry</h3>
      <img src="https://i.imgur.com/tRnQaJP.jpeg" />
      <br />
      <p>
        Bước 1: Khách hàng truy cập vào website của Bảo Tín Mạnh Hải theo đường
        link:{" "}
        <a className="text-blue-600" href="/">
          https://JeWellry.vn/
        </a>
        <br />
        <br />
        Bước 2: Trên các phần công cụ của website, Khách hàng tiến hành chọn vào
        mục sản phẩm đã được khoanh đỏ ở dưới hình minh họa.
        <br />
        <br />
      </p>
      <img src="https://i.imgur.com/EYhgnhD.jpeg" />
      <p>
        Bước 3: Khách hàng kéo xuống để thấy được mục phân loại sản phẩm ấn vào
        để có thể xem được toàn bộ sản phẩm.
        <br /> <br />
        Bước 4: khách hàng tiến hành tìm kiếm và lựa chọn sản phẩm mà khách hàng
        ưng ý. Sau khi tìm được sản phẩm ứng ý, Khách hàng click vào sản phẩm để
        website chuyển hướng sang.
        <br />
        <br />
      </p>
      <img src="https://i.imgur.com/GqMuOuA.jpeg" />
      <br />
      <p>
        Bước 5: Khách hàng bấm vào nút `Thêm vào giỏ hàng` để đưa vào giỏ của
        mình. Sau khi ấn nút sẽ thấy icon Giỏ hàng tăng lên 1 số
      </p>
      <br />
      <img src="https://i.imgur.com/FHLZ5if.jpeg" />
      <img src="https://i.imgur.com/uSxz5v6.jpeg" />
      <br />
      <p>
        Bước 6: Vào giỏ hàng chọn sản phẩm và mình muốn mua, rồi ấn nút `Mua
        hàng`
        <br />
        <br />
      </p>
      <img src="https://i.imgur.com/oD1g4ta.jpeg" />
      <br />
      <p>
        Bước 7: Khách hàng kiểm tra lại số lượng sản phẩm và ấn nút `Điền thông
        tin` <br />
        <br />
      </p>
      <img src="https://i.imgur.com/hwCDWap.jpeg" />

      <h2>II. Hướng dẫn thanh toán</h2>
      <p>
        Bước 1: Khách hàng tìm kiếm mục giỏ hàng và chọn thanh công cụ "Thanh
        Toán" để chuyển qua phần điền thông tin khách hàng.
        <br /> <br />
        Bước 2: Khách hàng điền đầy đủ thông tin cá nhân và lựa chọn hình thức
        giao hàng.
        <br />
        <br />
      </p>
      <img src="https://i.imgur.com/Z0KJniK.jpeg" />
      <br />
      <p>
        Bước 3: Khách hàng kiểm tra thông tin đơn hàng một lần nữa, sau đó lựa
        chọn các hình thức thanh toán có sẵn tại website.
      </p>
      <br />
      <p>
        Trường hợp khách hàng không thanh toán được thì Quý khách hàng vui lòng
        liên hệ hotline (miễn phí) của JeWellry 0123 456 789 được phục vụ một
        cách tốt nhất. Thời gian từ 8h – 21h (kể cả chủ nhật & trừ ngày lễ), đội
        ngũ chuyên viên tư vấn tại JeWellry luôn sẵn sàng phục vụ.
      </p>
    </div>
  );
}

export default BuyTutorial;
