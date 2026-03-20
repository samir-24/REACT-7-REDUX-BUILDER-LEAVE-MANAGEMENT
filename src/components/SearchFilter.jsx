import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../features/leaveSlice';

const SearchFilter = () => {
  const dispatch = useDispatch();
  return (
    <div className="mb-4">
      <input type="text" placeholder="Search employee..." className="w-full border p-2 rounded shadow-sm"
        onChange={(e) => dispatch(setSearch(e.target.value))} />
    </div>
  );
};
export default SearchFilter;