import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyLeave } from '../features/leaveSlice';
import { Calendar, User, FileText, Send } from 'lucide-react';

const AddLeave = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    employeeName: '', leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '', status: 'Pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛑 Date Validation Logic
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      alert("Error: 'To Date' cannot be before 'From Date'!");
      return; // Form submit nahi thay
    }

    const newLeave = { ...formData, id: Date.now(), appliedDate: new Date().toLocaleDateString() };
    dispatch(applyLeave(newLeave));
    alert("✅ Leave Application Submitted Successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Send className="text-indigo-600" size={24} /> Apply New Leave
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Employee Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input type="text" placeholder="Enter name" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={e => setFormData({...formData, employeeName: e.target.value})} required />
          </div>
        </div>

        {/* Leave Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Leave Type</label>
          <select className="w-full border border-gray-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
            onChange={e => setFormData({...formData, leaveType: e.target.value})}>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Emergency Leave</option>
            <option>Vacation Leave</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">From Date</label>
            <input type="date" className="w-full border border-gray-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              onChange={e => setFormData({...formData, startDate: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">To Date</label>
            <input type="date" className="w-full border border-gray-200 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
              onChange={e => setFormData({...formData, endDate: e.target.value})} required />
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea placeholder="Briefly explain the reason..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24" 
              onChange={e => setFormData({...formData, reason: e.target.value})} required></textarea>
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95">
          Submit Application
        </button>
      </form>
    </div>
  );
};
export default AddLeave;