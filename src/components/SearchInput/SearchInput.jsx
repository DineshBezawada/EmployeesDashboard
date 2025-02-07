import { useState } from "react";
import "./searchInput.css";

const SearchInput = ({handleSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleSearch(searchQuery);
  }

  return (
    <div className="search-input">
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="search ...."
        />
        <button>search</button>
      </form>
    </div>
  );
};

export default SearchInput;
