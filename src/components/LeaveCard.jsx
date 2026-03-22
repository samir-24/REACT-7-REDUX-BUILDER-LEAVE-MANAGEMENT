import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteLeaveAsync, updateStatusAsync } from '../features/leaveSlice';
import { Trash2, Check, X, Clock } from 'lucide-react';

const LeaveCard = ({ item }) => {
  const dispatch = useDispatch();

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'border-green-500 text-green-600';
    if (status === 'Rejected') return 'border-red-500 text-red-600';
    return 'border-amber-500 text-amber-600';
  };

  return (
    <div className={`bg-white p-5 rounded-xl shadow-sm mb-4 border-l-4 transition-all hover:shadow-md ${getStatusColor(item.status)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-800 text-lg">{item.employeeName}</h4>
          <p className="text-sm font-medium text-slate-500">{item.leaveType}</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold uppercase px-2 py-1 bg-slate-100 rounded">
          <Clock size={14} /> {item.status}
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        <p><strong>Duration:</strong> {item.startDate} to {item.endDate}</p>
        <p className="mt-1 italic">"{item.reason}"</p>
      </div>

      <div className="flex gap-3 mt-4 pt-3 border-t border-slate-50">
        <button 
          onClick={() => dispatch(updateStatusAsync({id: item.id, status: 'Approved'}))}
          className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:bg-green-50 px-3 py-1 rounded-lg transition-colors"
        >
          <Check size={16}/> Approve
        </button>
        <button 
          onClick={() => dispatch(updateStatusAsync({id: item.id, status: 'Rejected'}))}
          className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
        >
          <X size={16}/> Reject
        </button>
        <button 
          onClick={() => dispatch(deleteLeaveAsync(item.id))}
          className="ml-auto text-slate-400 hover:text-red-700 p-1 transition-colors"
        >
          <Trash2 size={20}/>
        </button>
      </div>
    </div>
  );
};

export default LeaveCard;