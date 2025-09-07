import { useParams, Link } from 'react-router-dom'
import { getNewsBySlug } from '../assets/newsData.js'

function NewsDetailPage() {
	const { slug } = useParams()
	const item = getNewsBySlug(slug)

	if (!item) {
		return (
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">Không tìm thấy bài viết</h2>
							<p className="hero-description">Bài viết có thể đã bị xóa hoặc đường dẫn không đúng.</p>
							<Link to="/tin-tuc" className="btn btn-primary">Quay lại trang Tin tức</Link>
						</div>
					</div>
				</div>
			</section>
		)
	}

	return (
		<>
			<section className="hero hero-solid">
				<div className="container">
					<div className="hero-content">
						<div className="hero-text">
							<h2 className="hero-title">{item.title}</h2>
							<p className="hero-description">{item.excerpt}</p>
							<div style={{marginTop:12,color:'var(--text-light)'}}>
								<span>{item.author}</span>
								<span> • </span>
								<time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="news-detail">
				<div className="container" style={{display:'grid',gridTemplateColumns:'1fr',gap:32,maxWidth:980}}>
					<figure style={{borderRadius:16,overflow:'hidden',boxShadow:'0 6px 20px rgba(0,0,0,0.08)',margin:0}}>
						<img src={item.coverImage} alt={item.title} loading="lazy" style={{width:'100%',height:'auto',display:'block'}} />
						<figcaption style={{padding:'10px 14px',fontSize:14,color:'var(--text-light)',background:'#fafafa'}}>Ảnh minh họa</figcaption>
					</figure>

					<article style={{lineHeight:1.9,fontSize:18,color:'var(--text)',letterSpacing:0.2}}>
						<div style={{display:'grid',gap:16}}>
							<p style={{margin:0,whiteSpace:'pre-wrap'}}>{item.content}</p>
						</div>
						<hr style={{margin:'24px 0',border:'none',borderTop:'1px solid #eee'}} />
						<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
							<Link to="/tin-tuc" className="btn btn-secondary">← Quay lại Tin tức</Link>
							<div style={{fontSize:14,color:'var(--text-light)'}}>
								Tác giả: <strong>{item.author}</strong> • Cập nhật: <time dateTime={item.date}>{new Date(item.date).toLocaleDateString('vi-VN')}</time>
							</div>
						</div>
					</article>
				</div>
			</section>
		</>
	)
}

export default NewsDetailPage 