import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../services/axiosInstance'

export const createLink = createAsyncThunk(
  'links/create',
  async (linkData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/links/create', linkData)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Create failed')
    }
  }
)

export const fetchLinks = createAsyncThunk(
  'links/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/links/my-links')
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed')
    }
  }
)

const linkSlice = createSlice({
  name: 'links',
  initialState: {
    links: [],
    fetchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: 'idle',
    error: null,
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Links
      .addCase(fetchLinks.pending, (state) => {
        state.fetchStatus = 'loading'
        state.error = null
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded'
        state.links = action.payload
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.fetchStatus = 'failed'
        state.error = action.payload
      })

      // Create Link
      .addCase(createLink.pending, (state) => {
        state.createStatus = 'loading'
        state.error = null
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        state.links.unshift(action.payload)
      })
      .addCase(createLink.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetCreateStatus } = linkSlice.actions

export default linkSlice.reducer
