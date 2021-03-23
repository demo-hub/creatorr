import styles from '../styles/Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className="top">
            <div className="left">
                <a href="">
                    <img src="../img/logo_small.png" alt="" width="165"/>
                </a>
            </div>
            <div className="right">
                <div className="header_right_content">
                    <div className="search_box">
                        <input type="text" placeholder="Search profile"/>
                    </div>
                    <a href="creator_dashboard.html" className="login_button">Login</a>
                </div>
            </div>
        </div>
        <div className="center">
            <div className="image_wrap">
                <img src="img/logo_large.png" alt=""/>
            </div>
            <div className="cta_buttons">
                <div className="left">
                    <a href="#search_creator">FIND YOUR CREATORR</a>
                </div>
                <div className="right">
                    <a href="#">CREATE ACCOUNT</a>
                </div>
            </div>
        </div>
        <div className="bottom">
            <img src="../img/bottom_header.png" alt=""/>
        </div>
    </header>
  )
}