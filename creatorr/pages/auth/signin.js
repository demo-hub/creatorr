import { providers, signIn } from 'next-auth/client'

export default function SignIn({ providers }) {
  return (
    <div className="signin-button">
      {Object.values(providers).map(provider => (
        <div className={provider.name} key={provider.name}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src={provider.name == 'Twitch' ? "https://assets.help.twitch.tv/Glitch_Purple_RGB.png" : "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"}/>
          </div>
          <p className="btn-text"><b>Sign in with {provider.name}</b></p>
        </div>
      ))}
    </div>
  )
}

SignIn.getInitialProps = async () => {
  return {
    providers: await providers()
  }
}