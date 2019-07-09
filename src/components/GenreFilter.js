import React from 'react';

const GenreFilter = (props) => {
        return (
            <div>
                <h4> Filter By Genre </h4>
                <select placeholder="Filter by genre" onChange={props.handleGenreFilter}>
                <option>No Filter</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="strategy">Strategy</option>
                <option value="rpg">Rpg</option>
                <option value="shooter">Shooter</option>
                </select>
            </div>
        );
}

export default GenreFilter;