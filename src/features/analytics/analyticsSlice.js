import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAnalytics } from './analyticsAPI';

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetch',
  async ({ shortCode, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await getAnalytics(shortCode, page, limit);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load analytics');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalytics: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
