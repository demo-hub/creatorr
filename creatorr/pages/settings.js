import Header from "../components/Header"
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Settings() {
    const [ session, loading ] = useSession()
  return (
    <div>
          <Head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" href="css/main.css"/>
            <title>Creatorr | Creatorr dashboard</title>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link rel="icon" type="image/png" href="img/favicon.png" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
        </Head>
          <Header></Header>
          <main>
            <div className="container dashboard_page">
                    <div className="left">
                        <div className="profile_wrap">
                            <img src="img/im_doggo.png" alt="" width="165"/>
                            <span className="edit_this"><i className="fas fa-pencil-alt"></i></span>
                        </div>
                    </div>
                    <div className="center">
                        <h4>Tom <span className="edit_this"><i className="fas fa-pencil-alt"></i></span></h4>
                        <p><span className="edit_this"><i className="fas fa-pencil-alt"></i></span>
                            <span className="subtext">Twitch streamer</span>
                        </p>
                        <div className="divider_fourty"></div>
                        <p>
                            Creatorr is a platform on the blockchain which helps creators such as YouTubers Streamers and Artists receive financial support from their fans. Their fans in return earn unique dynamic NFT tokens from their favorite content creator.
                            <span className="edit_this"><i className="fas fa-pencil-alt"></i></span>
                        </p>
                    </div>
                    <div className="right">
                        <div className="earnings">
                            <b>
                                I EARNED
                            </b>
                            <h4>"$1240.44"</h4>
                            <b>
                                THIS MONTH
                            </b>
                        </div>
                        <div className="input_option">
                            <b>Payout option</b>
                            <div className="input_wrap">
                                <select name="" id="">
                                    <option value="eth" selected>ETH WALLET</option>
                                    <option value="wire">WIRE PAYMENT</option>
                                </select>
                            </div>
                            <div className="details_wrap">
                                <input type="text" placeholder="0xAa47bA01ff75ba16e222280fDa85f861DFdc3A4E"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gray_bar">
                    <div className="container creator_nft">
                        <div className="left">
                            <b>Current NFT'S for offering</b>
                            <div className="row">
                                <div className="circle">
                                    <img id="img1_dashboard" alt="" width="180" height="180"/>
                                    <div id="img1_icon" className="fab second">
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>
                                <div className="circle">
                                    <img id="img2_dashboard" alt="" width="180" height="180"/>
                                    <div id="img2_icon" className="fab second">
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>
                                <div className="circle">
                                    <img id="img3_dashboard" alt="" width="180" height="180" />
                                    <div id="img3_icon" className="fab second" >
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* <div className="input_option">
                                <b>Collection:</b>
                                <div className="input_wrap">
                                    <select name="" id="">
                                        <option value="MONTH" selected>Main collection</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="circle">
                                    <a onclick="uploadFile()">
                                        <img src="img/upload.png" alt="" width="180"/>
                                    </a>
                                    <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/png, image/jpeg" onChange={async (e) => {
                                        console.log(e);
                                    }} hidden/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
      </div>
  )
}