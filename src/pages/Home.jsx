import Card from '../components/Card';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

function Home({
  searchValue,
  onChangeSearchInput,
  searchItems,
  favoriteItems,
  onAddToFavorites,
  onRemoveItem,
  items,
  countItems,
  currentPage,
  setCurrentPage,
  isLoading,
}) {
  const renderItems = () => {
    return (isLoading ? [...Array(3)] : items).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorites(obj)}
        removeItem={onRemoveItem}
        isLoading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="underHeader">
        <h1>Все посты</h1>
        <Search value={searchValue} onChange={onChangeSearchInput} />
      </div>
      <div className="cards">
        {searchValue.toLowerCase().trim()
          ? searchItems
              .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj) => (
                <Card
                  key={obj.title}
                  img={obj.img}
                  title={obj.title}
                  text={obj.text}
                  id={obj.id}
                  items={favoriteItems}
                  onFavorite={(obj) => onAddToFavorites(obj)}
                  removeItem={(obj) => onRemoveItem(obj)}
                />
              ))
          : renderItems()}
      </div>
      <div>
        {searchValue.toLowerCase().trim() ? null : (
          <Pagination
            countPages={countItems}
            currentPage={currentPage}
            onChangePage={(number) => setCurrentPage(number)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
