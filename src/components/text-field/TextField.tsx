import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';
import clsx from 'clsx';

import styles from './TextField.module.scss';

interface TextFieldProps {
  value?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
}

const TextField: FC<TextFieldProps> = ({
  id,
  value,
  error,
  isDisabled,
  placeholder,
  onChange,
}) => {
  return (
    <input
      data-testid={id}
      className={clsx(styles['text-field'], error && styles['input-error'])}
      type="text"
      placeholder={placeholder}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
};

export default TextField;
