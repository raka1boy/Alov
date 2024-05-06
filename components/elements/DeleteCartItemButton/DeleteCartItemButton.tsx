import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IDeleteCartItemButtonProps } from '@/types/cart'

const DeleteItemButton = ({
  btnDisabled,
  callback,
  className,
}: IDeleteCartItemButtonProps) => (
  <button
    className={`button-reset cart-list__item__delete ${className}`}
    onClick={callback}
    disabled={btnDisabled}
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#000' />
    ) : (
      <span />
    )}
  </button>
)

export default DeleteItemButton