import React from 'react';
import Header from './components/Header';
import Overlay from './components/Overlay';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([]);
  const [searchItems, setSearchItems] = React.useState([]);
  const [countItems, setCountItems] = React.useState(0);
  const [favoriteOpened, setFavoriteOpened] = React.useState(false);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [countFavoriteItems, setCountFavoriteItems] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [favoriteItemsResponse, itemsRespons] = await Promise.all([
          axios.get('https://684d1f0b65ed08713915240b.mockapi.io/favoriteItems'),
          axios.get(
            `https://684d1f0b65ed08713915240b.mockapi.io/items?page=${currentPage}&limit=3`,
          ),
        ]);
        setIsLoading(false);
        setFavoriteItems(favoriteItemsResponse.data);
        setCountFavoriteItems(favoriteItemsResponse.data.length);
        setItems(itemsRespons.data);
      } catch (error) {
        alert('ошибка при запросе данных');
      }
    }
    fetchData();
  }, [currentPage]);

  React.useEffect(() => {
    axios.get(`https://684d1f0b65ed08713915240b.mockapi.io/items`).then((res) => {
      setCountItems(res.data.length);
      setSearchItems(res.data);
    });
  }, []);

  const onAddToFavorites = async (obj) => {
    const { data } = await axios.post(
      'https://684d1f0b65ed08713915240b.mockapi.io/favoriteItems',
      obj,
    );
    setCountFavoriteItems((prev) => prev + 1);
    setFavoriteItems((prev) => [...prev, data]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== id));
    setCountFavoriteItems((prev) => prev - 1);
    axios.delete(`https://684d1f0b65ed08713915240b.mockapi.io/favoriteItems/${id}`);
  };

  const isAddedItem = (id) => {
    return favoriteItems.some((item) => item.parentId === id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        searchItems,
        favoriteItems,
        isAddedItem,
        favoriteOpened,
      }}>
      <div className="wrapper">
        <Routes>
          <Route path="/blog" element={<Navigate to="/blog/" />} />
        </Routes>
        <Overlay onClose={() => setFavoriteOpened(false)} onRemove={onRemoveItem} />

        <Header
          countFavoriteItems={countFavoriteItems}
          onClickFavorite={() => setFavoriteOpened(true)}
        />
        <Routes>
          <Route
            path="/blog/"
            element={
              <Home
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                searchItems={searchItems}
                favoriteItems={favoriteItems}
                onAddToFavorites={onAddToFavorites}
                onRemoveItem={onRemoveItem}
                items={items}
                countItems={countItems}
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
                currentPage={currentPage}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
