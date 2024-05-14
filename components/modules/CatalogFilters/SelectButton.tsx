import { ISelectButtonProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const SelectButton = ({
  open,
  toggle,
  dynamicText,
  defaultText,
  bgClassName,
}: ISelectButtonProps) => (
  <button
    className={`button-reset ${styles.catalog__filters__btn} ${
      open ? styles.is_open : ''
    } ${bgClassName || ''}`}
    onClick={toggle}
  >
    {dynamicText ? (
      <span className={styles.catalog__filters__btn__inner}>
        <span className={styles.catalog__filters__btn__text}>
          {defaultText}
        </span>
        <span className={styles.catalog__filters__btn__info}>
          {dynamicText}
        </span>
      </span>
    ) : (
      defaultText
    )}
  </button>
)

export default SelectButton