import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
      <title>Creatorr | NFT from your favorite creator</title>
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link rel="icon" type="image/png" href="img/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
      </Head>

      <Header></Header>
      <main className={styles.main}>
      <div className="container what_is_it">
            <h4>Creatorr</h4>
            <p>
                <span className="subtext">What is creatorr?</span>
            </p>
            <div className="divider_fourty"></div>
            <p>
                Creatorr is a platform on the blockchain which helps creators such as YouTubers Streamers and Artists receive financial support from their fans. Their fans in return earn unique dynamic NFT tokens from their favorite content creator.
            </p>
            <div className="divider_eighty"></div>
        </div>
        <div className="container search_creator" id="search_creator">
            <div className="search_box">
                <input type="text" placeholder="Search your creator of choice"/>
            </div>
            <div className="search_results">
                <div className="card" onclick="window.location.href='profile.html?creator_name=Rosalie'">
                    <div className="top">
                        <div className="left">
                            <img src="img/profile_pic_rosa.png" alt=""/>
                        </div>
                        <div className="right">
                            <b>
                                Rosalie
                            </b>
                            <p>Tiktok</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Collectables</p>
                        <div className="row">
                            <div className="circle">
                                <img src="img/bbb.jpg" alt=""/>
                            </div>
                            <div className="circle">
                                <img src="img/littleporg.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" onclick="window.location.href='profile.html?creator_name=Andrew'">
                    <div className="top">
                        <div className="left">
                            <img src="img/profile_pic_andrew.png" alt=""/>
                        </div>
                        <div className="right">
                            <b>
                                Andrew
                            </b>
                            <p>Twitch</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Collectables</p>
                        <div className="row">
                            <div className="circle">
                                <img src="img/avira.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" onclick="window.location.href='profile.html?creator_name=Joao'">
                    <div className="top">
                        <div className="left">
                            <img src="img/profile_pic.png" alt=""/>
                        </div>
                        <div className="right">
                            <b>
                                    Joao "Mr beast"
                                </b>
                            <p>YouTube</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Collectables</p>
                        <div className="row">
                            <div className="circle">
                                <img src="img/nft1.jpg" alt=""/>
                            </div>
                            <div className="circle">
                                <img src="img/nft2.jpg" alt=""/>
                            </div>
                            <div className="circle">
                                <img src="img/nft3.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card" onclick="window.location.href='profile.html?creator_name=Jurjen'">
                    <div className="top">
                        <div className="left">
                            <img src="img/profile_pic_jur.png" alt=""/>
                        </div>
                        <div className="right">
                            <b>
                                Jurjen
                            </b>
                            <p>Instagram</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>Collectables</p>
                        <div className="row">
                            <div className="circle">
                                <img src="img/1_grey.png" alt=""/>
                            </div>
                            <div className="circle">
                                <img src="img/1_yellow.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="divider_purple_top">
            <img src="img/divider_top_purple.png" alt=""/>
        </div>
        <div className="purple_bg">
            <div className="container how_does_it_work">
                <div className="left">
                    <h4>Creatorr</h4>
                    <p>
                        <span className="subtext">What is it?</span>
                    </p>
                    <div className="divider_fourty"></div>
                    <p>
                        On Creatorr, your fans can become active participants in the work and creatorr that they love by offering them direct donations thought the Creatorr program.
                        <br/><br/> In exchange the creator will get the direct payment and the fan get a unique dynamic NFT as reward.
                    </p>
                    <a href="#">
                        create account
                    </a>
                </div>
                <div className="right">
                    <img src="img/graphic1.png" alt=""/>
                </div>
            </div>
        </div>
        <div className="divider_gradient_ten"></div>
      </main>
      <Footer></Footer>
    </div>
  )
}
