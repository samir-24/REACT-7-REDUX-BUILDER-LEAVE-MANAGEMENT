import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLeaves } from '../features/leaveSlice';
import AddLeave from '../components/AddLeave';
import LeaveList from '../components/LeaveList';
import SearchFilter from '../components/SearchFilter';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchLeaves()); }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Leave Management <span className="text-indigo-600">Portal</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Manage employee leaves and track records efficiently.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Side: Form */}
          <div className="lg:col-span-4 sticky top-10">
            <AddLeave />
          </div>

          {/* Right Side: Search and List */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <SearchFilter />
              <div className="mt-6">
                <LeaveList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;