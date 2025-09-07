function ContactPage() {
  return (
    <>
      <section className="hero hero-solid">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-title">Liên hệ</h2>
              <p className="hero-description">
                Liên hệ ngay để được tư vấn miễn phí 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Liên hệ với chúng tôi</h2>
            <div className="section-divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-phone">
                <a href="tel:0818292929" className="btn btn-primary btn-lg">
                  <i className="fas fa-phone-alt"></i> 0818.29.29.29
                </a>
              </div>
              <div className="contact-locations">
                <h3>📍 Khu vực phục vụ toàn Hà Nội:</h3>
                <ul className="locations-list">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Cầu Giấy: </strong> Toà N09B2 Thành Thái - Hà Nội
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Bắc Từ Liêm: </strong> 30 Hồ Tùng Mậu - Phú Diễn -
                    Hà Nội
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Bắc Từ Liêm: </strong> N1T6 Han Jardin - Khu Ngoại
                    Giao Đoàn - Hà Nội
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Thuỷ Nguyên: </strong> Dương Kinh - Kiến Thuỵ - Thuỷ
                    Nguyên - Hải Phòng
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Lê Chân: </strong> HD10 Vinhomes Marina - Lê Chân -
                    Hải Phòng
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    <strong>Kiến An: </strong> 101 Trần Thành Ngọ - Kiến An -
                    Hải Phòng
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-form">
              <h3>Yêu cầu tư vấn và gọi lại</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-submit">
                  <i className="fas fa-paper-plane"></i> Gửi Ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
