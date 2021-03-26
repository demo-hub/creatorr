import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Header() {
    const [ session, loading ] = useSession()
    const router = useRouter()
    return (
        <header className={session ? 'logged_in' : 'header'}>
            <div className="top">
                <div className="left">
                    <a href="/">
                        <img src="../img/logo_small.png" alt="" width="165"/>
                    </a>
                </div>
                <div className="right">
                    <div className="header_right_content">
                        <div className="search_box">
                            <input type="text" placeholder="Search profile"/>
                        </div>
                        {!session && <>
                            <a className="login_button" onClick={() => signIn()}>Sign in</a>
                        </>}
                        {session && <>
                            <div className="logged_in_profile">
                                <div className="submenu">
                                    <ul>
                                        <li>
                                            <a href="my_profile.html">
                                                <i className="fas fa-user-circle"></i> My profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="settings">
                                                <i className="fas fa-cogs"></i> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a className="active" onClick={() => signOut()}>LOG OUT</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="profile-icon">
                                    <img src={session.user.image} alt="" width="56"/>
                                </div>
                                <span className="name">
                                    <b>{session.user.name}</b>
                                </span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            {/* <a className="login_button" onClick={() => signOut()}>Sign out</a> */}
                        </>}
                        {/* <a href="creator_dashboard.html" className="login_button">Login</a> */}
                    </div>
                </div>
            </div>
            {router.pathname == '/' && <> <div className="center">
                <div className="image_wrap">
                    <img src="img/logo_large.png" alt=""/>
                </div>
                <div className="cta_buttons">
                    <div className="left">
                        <a href="#search_creator">FIND YOUR CREATORRR</a>
                    </div>
                    <div className="right">
                        <a href="#">CREATE ACCOUNT</a>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <img src="../img/bottom_header.png" alt=""/>
            </div> </>}
        </header>
    )
}