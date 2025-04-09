import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authAPI";

// Initial state with hydration flag
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isHydrated: false,
};

// Thunk to handle login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isHydrated = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    hydrate(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      state.token = token || null;
      state.user = user ? JSON.parse(user) : null;
      state.isHydrated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isHydrated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isHydrated = true;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;