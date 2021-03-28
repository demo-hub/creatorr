import Header from "../components/Header"
import Head from 'next/head'
import { useState } from 'react'
import { getSession, useSession } from 'next-auth/client'
import axios from 'axios'
import Router from 'next/router'

function Settings({ userImages }) {
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
            <title>Creatorr | Creatorr dashboard</title>
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
                            <span className="edit_this" onClick={() => {
                                document.getElementById('profilePic').click()
                            }}><i className="fas fa-pencil-alt"></i></span>
                            <input type="file" className="form-control-file" id="profilePic" accept="image/png, image/jpeg" onChange={event => {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    // connect with the nft.storage api and save image on ipfs
                                    const http = new XMLHttpRequest();
                                    http.open('POST', 'https://nft.storage/api/upload')
                                    http.setRequestHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`)
                                    var formData = new FormData();
                                    const dataURL = e.target.result.replace(/^data:image\/(png|jpeg);base64,/, "");
                                    const byteCharacters = atob(dataURL);
                                    const byteArrays = [];

                                    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                        const slice = byteCharacters.slice(offset, offset + 512);

                                        const byteNumbers = new Array(slice.length);
                                        for (let i = 0; i < slice.length; i++) {
                                            byteNumbers[i] = slice.charCodeAt(i);
                                        }

                                        const byteArray = new Uint8Array(byteNumbers);
                                        byteArrays.push(byteArray);
                                    }
                                    formData.append("file", new File(byteArrays, 'profile.png'));
                                    http.onload = async function() {
                                        if (http.readyState == 4 && http.status == "200") {
                                            await updateUserInfo({
                                                name: session.user.name,
                                                email: session.user.email,
                                                image: 'https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/profile.png',
                                                shortDesc: session.shortDesc,
                                                longDesc: session.longDesc,
                                                monthlyEarnings: session.monthlyEarnings,
                                                ethWallet: session.ethWallet
                                            });
                                            session.user.image = 'https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/profile.png';
                                        } else {
                                            console.error("error", http.responseText);
                                        }
                                    }
                                    http.send(formData);
                                };

                                reader.readAsDataURL(document.getElementById("profilePic").files[0]);
                            }} hidden />
                        </div>
                    </div>
                    <div className="center">
                        {!editName ? <h4>{session ? session.user.name : ''} <span className="edit_this" onClick={() => {
                            setEditName(true);
                        }}><i className="fas fa-pencil-alt"></i></span></h4> : <><p> <span className="edit_this" onClick={async () => {
                            await updateUserInfo({
                                name: document.getElementById('editName').value,
                                email: session.user.email,
                                image: session.user.image,
                                shortDesc: session.shortDesc,
                                longDesc: session.longDesc,
                                monthlyEarnings: session.monthlyEarnings,
                                ethWallet: session.ethWallet
                            });
                            session.user.name = document.getElementById('editName').value;
                            setEditName(false)
                        }}><i className="fas fa-check"></i></span> <input id="editName" type="text" defaultValue={session ? session.user.name : ''}/></p><div className="divider_fourty"></div></>}
                        {!editShortDesc ? <><p><span className="edit_this" onClick={() => {
                            setEditShortDesc(true);
                        }}><i className="fas fa-pencil-alt"></i></span>
                            <span className="subtext">{session ? (session.shortDesc ? session.shortDesc : 'Short description') : 'Short description'}</span>
                        </p>
                        <div className="divider_fourty"></div></> : <><p> <span className="edit_this" onClick={async () => {
                            await updateUserInfo({
                                name: session.user.name,
                                email: session.user.email,
                                image: session.user.image,
                                shortDesc: document.getElementById('editShortDesc').value,
                                longDesc: session.longDesc,
                                monthlyEarnings: session.monthlyEarnings,
                                ethWallet: session.ethWallet
                            });
                            session.shortDesc = document.getElementById('editShortDesc').value;
                            setEditShortDesc(false)
                        }}><i className="fas fa-check"></i></span> <input id="editShortDesc" type="text" defaultValue={session.shortDesc ? session.shortDesc : 'Short description'}/></p><div className="divider_fourty"></div></>}
                        {!editLongDesc ? <><p><span className="edit_this" onClick={() => {
                            setEditLongDesc(true);
                        }}><i className="fas fa-pencil-alt"></i></span>
                            <span className="subtext">{session ? (session.longDesc ? session.longDesc : 'Long description') : 'Long description'}</span>
                        </p>
                        <div className="divider_fourty"></div></> : <><p> <span className="edit_this" onClick={async () => {
                            await updateUserInfo({
                                name: session.user.name,
                                email: session.user.email,
                                image: session.user.image,
                                shortDesc: session.shortDesc,
                                longDesc: document.getElementById('editLongDesc').value,
                                monthlyEarnings: session.monthlyEarnings,
                                ethWallet: session.ethWallet
                            });
                            session.longDesc = document.getElementById('editLongDesc').value;
                            setEditLongDesc(false)
                        }}><i className="fas fa-check"></i></span> <textarea rows="4" id="editLongDesc" type="text" defaultValue={session.longDesc ? session.longDesc : 'Short description'}/></p><div className="divider_fourty"></div></>}
                    </div>
                    <div className="right">
                        <div className="earnings">
                            <b>
                                I EARNED
                            </b>
                            <h4>{session ? (session.monthlyEarnings ? '$' + session.monthlyEarnings : '$0') : '$0'}</h4>
                            <b>
                                THIS MONTH
                            </b>
                        </div>
                        <div className="input_option">
                            <b>Payout option</b>
                            <div className="input_wrap">
                                <select name="" id="">
                                    <option key="eth">ETH WALLET</option>
                                    <option key="wire">WIRE PAYMENT</option>
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
                                {images ? images.map(imgSrc=><div key={imgSrc} className="circle">
                                    <img src={imgSrc} alt="" width="180" height="180"/>
                                    <div className="fab second" onClick={async () => {
                                        await axios.put('/api/profile/images', {cid: imgSrc.split('/')[4]});
                                        Router.reload();
                                    }}>
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>) : <></>}
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
                                    <a onClick={async (e) => {
                                        document.getElementById('fileInput').click();
                                    }}>
                                        <img src="img/upload.png" alt="" width="180"/>
                                    </a>
                                    <input type="file" className="form-control-file" id="fileInput" accept="image/png, image/jpeg" onChange={event => {
                                        var reader = new FileReader();

                                        reader.onload = function(e) {
                                            // connect with the nft.storage api and save image on ipfs
                                            const http = new XMLHttpRequest();
                                            http.open('POST', 'https://nft.storage/api/upload')
                                            http.setRequestHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`)
                                            var formData = new FormData();
                                            const dataURL = e.target.result.replace(/^data:image\/(png|jpeg);base64,/, "");
                                            const byteCharacters = atob(dataURL);
                                            const byteArrays = [];

                                            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                                const slice = byteCharacters.slice(offset, offset + 512);

                                                const byteNumbers = new Array(slice.length);
                                                for (let i = 0; i < slice.length; i++) {
                                                    byteNumbers[i] = slice.charCodeAt(i);
                                                }

                                                const byteArray = new Uint8Array(byteNumbers);
                                                byteArrays.push(byteArray);
                                            }
                                            formData.append("file", new File(byteArrays, 'upload.png'));
                                            http.onload = async function() {
                                                if (http.readyState == 4 && http.status == "200") {
                                                    const res = await axios.post('/api/profile/images', {id: session.id, cid: JSON.parse(http.responseText).value.cid});

                                                    setImages(images => [...images, 'https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/upload.png'])
                                                } else {
                                                    console.error("error", http.responseText);
                                                }
                                            }
                                            http.send(formData);
                                        };

                                        reader.readAsDataURL(document.getElementById("fileInput").files[0]);
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

export default Settings