import Logo from '../images/Logo';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/">
        <Logo />
      </a>
    </header>
  );
};

export default Header;
