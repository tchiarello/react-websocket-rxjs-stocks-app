import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  id?: string;
  className?: string;
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  id,
  className,
  children,
  type = 'button',
  isDisabled,
  onClick,
}) => {
  return (
    <button
      data-testid={id}
      type={type}
      className={clsx(styles.button, className)}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className={styles['button-content']}>{children}</span>
    </button>
  );
};

export default Button;
