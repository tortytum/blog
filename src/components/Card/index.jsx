import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

function Card({ onFavorite, removeItem, img, id, title, text, isLoading = false }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const inProgress = React.useRef(false);
  const [isLoadToFavorite, setIsLoadToFavorite] = React.useState(false);

  const { isAddedItem, favoriteItems } = React.useContext(AppContext);

  const onClickHeart = async () => {
    if (inProgress.current) return;
    inProgress.current = true;
    setIsLoadToFavorite(true);

    if (isAddedItem(id)) {
      removeItem(favoriteItems.find((item) => item.parentId === id).id);
      inProgress.current = false;
      setIsLoadToFavorite(false);
    } else {
      await onFavorite({ img, title, text, id, parentId: id });
      inProgress.current = false;
      setIsLoadToFavorite(false);
    }
  };

  return isLoading ? (
    <ContentLoader
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      speed={2}
      width={280}
      height={418}
      viewBox="0 0 290 418"
      backgroundColor="#dedcdc"
      foregroundColor="#ecebeb">
      <rect x="0" y="224" rx="10" ry="10" width="290" height="49" />
      <rect x="0" y="7" rx="20" ry="20" width="290" height="200" />
      <rect x="0" y="282" rx="10" ry="10" width="290" height="25" />
      <rect x="0" y="315" rx="10" ry="10" width="290" height="25" />
      <rect x="0" y="348" rx="10" ry="10" width="160" height="25" />
    </ContentLoader>
  ) : (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <img width={250} height={180} src={img} alt="pic" />
      <p>
        <b>{title}</b>
      </p>
      <div className={styles.Text}>
        <p>{text}</p>
      </div>
      {(isHovered || isAddedItem(id) || isLoadToFavorite) &&
        (isLoadToFavorite ? (
          <div className={styles.loader}></div>
        ) : (
          <img
            className={styles.favorite}
            onClick={() => onClickHeart()}
            width={30}
            height={30}
            src={isAddedItem(id) ? 'post_img/heart2.svg' : 'post_img/heart1.svg'}
            alt="Heart"></img>
        ))}
    </div>
  );
}

export default Card;
