import styles from '../styles/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <div className="purple_bg">
            <div className="container navigate_yourself">
                <h4>Navigate yourself</h4>
                <ul>
                    <li>
                        <a href="index.html" className="subtext">Homepage</a>
                    </li>
                    <li>
                        <a href="profile.html" className="subtext">Public profile</a>
                    </li>
                    <li>
                        <a href="creator_dashboard.html" className="subtext">Creatorr dashboard</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="bottom_bar">
            <div className="container">
                <div className="left">
                    <a href="index.html">
                        <img src="img/logo_small.png" alt="" width="165"/>
                    </a>
                </div>
                <div className="right">
                    <b>NFT Hackaton <small>2021</small></b>
                </div>
            </div>
        </div>
    </footer>
  )
}