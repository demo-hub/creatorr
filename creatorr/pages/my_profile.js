import Header from "../components/Header"
import Head from 'next/head'
import { useState } from 'react'
import { getSession, useSession } from 'next-auth/client'
import axios from 'axios'

function MyProfile({ userImages }) {
    const [ session, loading ] = useSession()
    const [images, setImages] = useState(userImages)
    const [editName, setEditName] = useState(false)
    const [editShortDesc, setEditShortDesc] = useState(false)
    const [editLongDesc, setEditLongDesc] = useState(false)

  return (
    <div>
          <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" href="css/main.css"/>
            <title>Creatorr | Profile</title>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link rel="icon" type="image/png" href="img/favicon.png" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
        </Head>
          <Header></Header>
          <main>
            <div className="container dashboard_page">
                    <div className="left">
                        <div className="profile_wrap">
                            <img className="round-image" src={session ? session.user.image : ''} alt="" width="165"/>
                        </div>
                    </div>
                    <div className="center">
                        <h4>{session ? session.user.name : ''}</h4>
                        <p>
                            <span className="subtext">{session ? (session.shortDesc ? session.shortDesc : 'Short description') : 'Short description'}</span>
                        </p>
                        <div className="divider_fourty"></div>
                        <p>
                            <span className="subtext">{session ? (session.longDesc ? session.longDesc : 'Long description') : 'Long description'}</span>
                        </p>
                        <div className="divider_fourty"></div>
                    </div>
                </div>
                <div className="gray_bar">
                    <div className="container creator_nft">
                        <div className="left">
                            <b>My NFT'S</b>
                            <div className="row">
                                {images ? images.map(imgSrc=><div key={imgSrc} className="circle">
                                    <img src={imgSrc} alt="" width="180" height="180"/>
                                    {/* <div className="fab second" onClick={async () => {
                                        await axios.put('/api/profile/images', {cid: imgSrc.split('/')[4]});
                                        Router.reload();
                                    }}>
                                        <i className="fas fa-times"></i>
                                    </div> */}
                                </div>) : <></>}
                            </div>
                        </div>
                        <div className="right">
                        </div>
                    </div>
                </div>
        </main>
      </div>
  )
}

// This function gets called at build time
export async function getServerSideProps({ req, res }) {
    const session = await getSession({ req })
    const response = (await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/profile/images`, { id: session.id })).data;
    const userImages = response.reduce((a, o) => (a.push('https://ipfs.io/ipfs/' + o.cid + '/upload.png'), a), [])

    // By returning { props: { userImages } }, the Settings component
    // will receive `userImages` as a prop at build time
    return {
      props: {
        userImages,
      },
    }
  }

export async function updateUserInfo(userInfo) {
    const response = (await axios.put('/api/profile/update', userInfo)).data

    return response
  }

export default MyProfile