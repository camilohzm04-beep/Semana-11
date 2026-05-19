import PropTypes from 'prop-types';
import '../styles/main.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
