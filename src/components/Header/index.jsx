import Logo from '../../assets/img/logo.png';
import Favorites from '../../assets/img/favorites.png';
import User from '../../assets/img/user.svg';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <Link to="/blog">
        <div className={styles.headerLeft}>
          <img width={40} height={40} src={Logo} alt="logo" />
          <div>
            <h3>Posts</h3>
            <p>Посты на разные темы</p>
          </div>
        </div>
      </Link>

      <ul className={styles.headerRight}>
        <li onClick={props.onClickFavorite}>
          <img width={40} height={40} src={Favorites} alt="favorites" />
          <span>
            <b>{props.countFavoriteItems}</b>
          </span>
        </li>
        <li>
          <img width={40} height={40} src={User} alt="user" />
        </li>
      </ul>
    </header>
  );
}
export default Header;
