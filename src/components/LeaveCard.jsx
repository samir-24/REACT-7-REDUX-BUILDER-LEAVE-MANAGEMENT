import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteLeave, updateLeaveStatus } from '../features/leaveSlice';
import { Trash2, Check, X } from 'lucide-react';

const LeaveCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-4 rounded shadow mb-3 border-l-4 border-indigo-500">
      <div className="flex justify-between items-center">
        <h4 className="font-bold">{item.employeeName}</h4>
        <span className="text-xs bg-gray-100 p-1 rounded">{item.status}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{item.leaveType} ({item.startDate} to {item.endDate})</p>
      <div className="flex gap-2 mt-3">
        <button onClick={() => dispatch(updateLeaveStatus({id: item.id, status: 'Approved'}))} className="text-green-600 hover:bg-green-50 p-1 rounded"><Check size={18}/></button>
        <button onClick={() => dispatch(updateLeaveStatus({id: item.id, status: 'Rejected'}))} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={18}/></button>
        <button onClick={() => dispatch(deleteLeave(item.id))} className="ml-auto text-gray-400 hover:text-red-700"><Trash2 size={18}/></button>
      </div>
    </div>
  );
};
export default LeaveCard;