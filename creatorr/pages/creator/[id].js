import Header from "../../components/Header"
import Head from 'next/head'
import { useState } from 'react'
import { getSession, useSession } from 'next-auth/client'
import axios from 'axios'
import { useRouter } from 'next/router'

function Profile({ userImages }) {
    const [ session, loading ] = useSession()
    const [images, setImages] = useState(userImages)

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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"></link>
        </Head>
          <Header></Header>
          <main>
            <div className="container dashboard_page">
                <div className="left">
                    <div className="profile_wrap">
                        <img id="profile_image" src="img/profile_pic_large.png" alt="" width="165"/>
                    </div>
                </div>
                <div className="center">
                    <h4 id="creator_name">

                    </h4>
                    <p>
                        <span id="profile_platform" className="subtext"></span>
                    </p>
                    <div className="divider_fourty"></div>
                    <p id="creator_bio">

                    </p>
                    <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="init()">SUPPORT THIS CREATORR</a>
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Support your favorite creator</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <button type="button" className="btn btn-primary" onclick="fillForm()">Prefill form</button>
                                <br/><br/>
                                <form>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Amount ($)</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Amount to donate"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput2" className="form-label">Card number</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="Your card number"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput3" className="form-label">CVV</label>
                                        <input type="password" className="form-control" id="exampleFormControlInput3" placeholder="CVV"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput4" className="form-label">Expiry</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput4" placeholder="MM/YY"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput5" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput5" placeholder="Optional description"/>
                                    </div>
                                    <p>Billing Details</p>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput6" className="form-label">Cardholder Name</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput6" placeholder="Cardholder name"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput7" className="form-label">Address Line 1</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput7" placeholder="Address Line 1"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput8" className="form-label">Address Line 2</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput8" placeholder="Address Line 2"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput9" className="form-label">Postalcode</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput9" placeholder="Postalcode"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput10" className="form-label">City</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput10" placeholder="City"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput11" className="form-label">District</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput11" placeholder="District"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput12" className="form-label">Country Code</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput12" placeholder="Country Code"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput13" className="form-label">Phone number</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput13" placeholder="Phone number with region indicative"/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput14" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleFormControlInput14" placeholder="customer@creatorr.com"/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onclick="exportImage()" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-dismiss="modal">Make payment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thank you! Here's your NFT</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <canvas id="myCanvas" width="500" height="500"></canvas>
                                <a id="imageLink" href="#"></a>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
            <div className="gray_bar">
                <div className="container creator_nft">
                    <div className="left">
                        <b>Their NFT'S up for offering</b>
                        <div className="row">
                            <div className="circle">
                                <img src="img/nft1.png" alt="" width="180"/>
                            </div>
                            <div className="circle">
                                <img src="img/nft2.png" alt="" width="180"/>
                            </div>
                            <div className="circle">
                                <img src="img/nft3.png" alt="" width="180"/>
                            </div>
                        </div>
                        <div className="right">

                        </div>
                    </div>
                </div>
                </div>
        </main>
      </div>
  )
}

// This function gets called at build time
/* export async function getServerSideProps({ req, res }) {
    const session = await getSession({ req })
    const router = useRouter()
    const { id } = router.query
    const response = (await axios.patch(`${process.env.NEXT_PUBLIC_APP_URL}/api/profile/images`, { id: id })).data;
    const userImages = response.reduce((a, o) => (a.push('https://ipfs.io/ipfs/' + o.cid + '/upload.png'), a), [])

    // By returning { props: { userImages } }, the Settings component
    // will receive `userImages` as a prop at build time
    return {
      props: {
        userImages,
      },
    }
  } */

export async function updateUserInfo(userInfo) {
    const response = (await axios.put('/api/profile/update', userInfo)).data

    return response
  }

export default Profile