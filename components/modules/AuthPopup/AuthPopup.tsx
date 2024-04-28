import { useState } from 'react'
import AuthPopupRegistration from './AuthPopupRegistration'
import AuthPopupLogin from './AuthPopupLogin'
import clsx from 'clsx'

const AuthPopup = () => {
  const [isAuthSwitched, setIsAuthSwitched] = useState(false)
  const [isSignInActive, setIsSignInActive] = useState(false)
  const [isSignupActive, setIsSignupActive] = useState(true)

  const toggleAuth = () => {
    setIsAuthSwitched(!isAuthSwitched)
    setIsSignInActive(!isSignInActive)
    setIsSignupActive(!isSignupActive)
  }

  return (
    <div className='container auth-popup'>
      <div>
        <div className='starsec' />
        <div className='starthird' />
        <div className='starfourth' />
        <div className='starfifth' />
      </div>
			<div className={clsx({
				[`auth-popup__card`]: true,
				[`switched`]: isAuthSwitched,
			})}>
        <div className='auth-popup__card__inner'>
          <AuthPopupRegistration
            toggleAuth={toggleAuth}
            isSideActive={isSignupActive}
          />
          <AuthPopupLogin
            toggleAuth={toggleAuth}
            isSideActive={isSignInActive}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthPopup