import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- Thunks for Async Operations ---

export const fetchLeaves = createAsyncThunk('leaves/fetch', async () => {
  const data = localStorage.getItem('leaves');
  return data ? JSON.parse(data) : [];
});

export const addLeaveAsync = createAsyncThunk('leaves/add', async (newLeave) => {
  const data = JSON.parse(localStorage.getItem('leaves') || '[]');
  const updated = [...data, newLeave];
  localStorage.setItem('leaves', JSON.stringify(updated));
  return newLeave;
});

export const updateStatusAsync = createAsyncThunk('leaves/updateStatus', async ({ id, status }) => {
  const data = JSON.parse(localStorage.getItem('leaves') || '[]');
  const updated = data.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem('leaves', JSON.stringify(updated));
  return { id, status };
});

export const deleteLeaveAsync = createAsyncThunk('leaves/delete', async (id) => {
  const data = JSON.parse(localStorage.getItem('leaves') || '[]');
  const updated = data.filter(item => item.id !== id);
  localStorage.setItem('leaves', JSON.stringify(updated));
  return id;
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: { items: [], loading: false, error: null, searchQuery: '' },
  reducers: {
    setSearch: (state, action) => { state.searchQuery = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchLeaves.pending, (state) => { state.loading = true; })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // Add
      .addCase(addLeaveAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateStatusAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) state.items[index].status = action.payload.status;
      })
      // Delete
      .addCase(deleteLeaveAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      });
  }
});

export const { setSearch } = leaveSlice.actions;
export default leaveSlice.reducer;