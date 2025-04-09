import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createShortLink, getAllLinks } from "./linkAPI";

const initialState = {
  links: [],
  fetchStatus: "idle",
  createStatus: "idle",
  error: null,
};

export const createLink = createAsyncThunk(
  "links/create",
  async (linkData, { rejectWithValue }) => {
    try {
      return await createShortLink(linkData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const fetchLinks = createAsyncThunk(
  "links/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllLinks();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.links = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      .addCase(createLink.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.links.unshift(action.payload);
      })
      .addCase(createLink.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCreateStatus } = linkSlice.actions;
export default linkSlice.reducer;
