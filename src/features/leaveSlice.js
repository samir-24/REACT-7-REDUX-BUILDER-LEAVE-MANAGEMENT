import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for Async operations (Simulating API)
export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async () => {
  const data = localStorage.getItem('leaves');
  return data ? JSON.parse(data) : [];
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    items: [],
    loading: false,
    searchQuery: '',
  },
  reducers: {
    applyLeave: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('leaves', JSON.stringify(state.items));
    },
    deleteLeave: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('leaves', JSON.stringify(state.items));
    },
    updateLeaveStatus: (state, action) => {
      const { id, status } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) item.status = status;
      localStorage.setItem('leaves', JSON.stringify(state.items));
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => { state.loading = true; })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export const { applyLeave, deleteLeave, updateLeaveStatus, setSearch } = leaveSlice.actions;
export default leaveSlice.reducer;