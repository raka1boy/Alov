import { useUnit } from 'effector-react'
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common'
import { $showQuickViewModal } from '@/context/modals/state'

const AuthPopupClose = () => {
  const showQuickViewModal = useUnit($showQuickViewModal)

  const closePopup = () =>
    closeAuthPopupWhenSomeModalOpened(showQuickViewModal)

  return <button className='button-reset auth-popup__close' onClick={closePopup} />
}

export default AuthPopupClose