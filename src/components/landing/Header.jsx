import { Link, NavLink } from 'react-router-dom'

function Header() {
	return (
		<header className="header" id="header">
			<div className="container">
				<nav className="navbar">
					<div className="logo">
						<Link to="/" className="brand">
							<img src="/assets/logo.png" alt="Mavic" className="brand-logo" />
							<div className="brand-text">
								<span className="brand-name">Mavic</span>
								<span className="brand-tagline" style={{color: '#000000'}}>Vững Tài Chính - Trọn Niềm Tin</span>
							</div>
						</Link>
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