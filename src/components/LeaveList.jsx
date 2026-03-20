import React from 'react';
import { useSelector } from 'react-redux';
import LeaveCard from './LeaveCard';

const LeaveList = () => {
  const { items, searchQuery } = useSelector(state => state.leaves);
  const filtered = items.filter(i => i.employeeName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Leave Records</h2>
      {filtered.length > 0 ? filtered.map(item => <LeaveCard key={item.id} item={item} />) : <p>No records found.</p>}
    </div>
  );
};
export default LeaveList;