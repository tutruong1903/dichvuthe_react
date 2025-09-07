import { Link } from 'react-router-dom'
import { newsItems } from '../assets/newsData.js'

function NewsPage() {
	return (
		<>
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Tin tức</h2>
							<p className="hero-description">Cập nhật thông tin hữu ích về thẻ tín dụng và ưu đãi ngân hàng.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="news">
				<div className="container">
					<div className="section-header">
						<h2>Bài viết mới</h2>
						<div className="section-divider"></div>
					</div>

					<div className="grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'24px'}}>
						{newsItems.map(item => (
							<article key={item.id} className="card" style={{background:'#fff',borderRadius:'12px',boxShadow:'0 4px 14px rgba(0,0,0,0.06)',overflow:'hidden',display:'flex',flexDirection:'column',height:'100%'}}>
								{item.coverImage && (
									<div style={{height:220,background:'#f2f3f5'}}>
										<img src={item.coverImage} alt={item.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
									</div>
								)}
								<div style={{padding:'16px',display:'flex',flexDirection:'column',flexGrow:1}}>
									<h3 style={{margin:'0 0 8px'}}>{item.title}</h3>
									<p style={{margin:'0 0 12px',color:'var(--text-light)'}}>{item.excerpt}</p>
									<div style={{display:'flex',justifyContent:'space-between',fontSize:14,color:'var(--text-light)'}}>
										<span>{item.author}</span>
										<time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
									</div>
									<div style={{marginTop:'auto',paddingTop:12}}>
										<Link to={`/tin-tuc/${item.slug}`} className="btn btn-primary" style={{width:'fit-content'}}>Đọc tiếp</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</>
	)
}

export default NewsPage 