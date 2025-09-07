import { Link, NavLink } from 'react-router-dom'

function Header() {
	return (
		<header className="header" id="header">
			<div className="container">
				<nav className="navbar">
					<div className="logo">
						<h1>DichVuThe<span>UyTin</span></h1>
					</div>
					<div className="nav-menu" id="navMenu">
						<ul className="nav-list">
							<li><NavLink to="/">Trang chủ</NavLink></li>
							<li><NavLink to="/ve-chung-toi">Về chúng tôi</NavLink></li>
							<li><NavLink to="/dich-vu">Dịch vụ</NavLink></li>
							<li><NavLink to="/tin-tuc">Tin tức</NavLink></li>
							<li><NavLink to="/lien-he">Liên hệ</NavLink></li>
						</ul>
					</div>
					<div className="hamburger" id="hamburger" onClick={() => {
						const menu = document.getElementById('navMenu');
						const ham = document.getElementById('hamburger');
						menu?.classList.toggle('active');
						ham?.classList.toggle('active');
					}}>
						<span className="bar"></span>
						<span className="bar"></span>
						<span className="bar"></span>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header 