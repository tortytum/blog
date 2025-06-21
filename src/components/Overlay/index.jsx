import styles from './Overlay.module.scss';
import React from 'react';
import AppContext from '../../context';

function Overlay({ onClose, onRemove }) {
  const { favoriteItems, favoriteOpened } = React.useContext(AppContext);

  return (
    <div className={`${favoriteOpened ? styles.visibility : styles.hidden}`}>
      <div onClick={onClose} className={styles.overlay}></div>
      <div className={styles.drawer}>
        <h2>Избранное</h2>
        {favoriteItems.map((obj) => (
          <div key={obj.title} className={styles.favoriteItem}>
            <img width={100} height={100} src={obj.img} alt="pic" />
            <div className={styles.item}>
              <p>
                <b>{obj.title}</b>
              </p>
              <p className={styles.text}>{obj.text}</p>
            </div>
            <img
              onClick={() => onRemove(obj.id, obj.title)}
              className={styles.removeBtn}
              width={25}
              height={25}
              src="post_img/plus.svg"
              alt="remove"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Overlay;
