import Search_img from '../../src/assets/img/search.svg';

function Search(props) {
  return (
    <div>
      <img src={Search_img} alt="Search"></img>
      <input value={props.value} onChange={props.onChange} placeholder="Поиск..." />
    </div>
  );
}

export default Search;
