/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser , login, fetchAuthUser } from "../requests/auth.requests";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (formData, thunkAPI) => {
    try {
      const response = await registerUser(formData);
      const data = response;

      if (response.status_code === 200) {
        return {
          ...data,
          userdetails: data,
          fullname: data?.full_name,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (formData, thunkAPI) => {
    try {
      const response = await login(formData);
      const data = response;
      if (response?.access_token) {
        localStorage.setItem('urs-authtoken', data?.access_token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserProfileWithToken = createAsyncThunk(
  'users/fetchUserProfileWithToken',
  async ( thunkAPI) => {
    try {
      const response = await fetchAuthUser();
      const data = response;

      if (response?.status_code === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);





export const userSlice = createSlice({
  name: "user",
  initialState: {
    userdetails: {},
    fullname: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    status: "",
    access_token: "",
    expires_in: 0,
    authUser: {},
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.userdetails = payload.result;
      state.email = payload.result.email;
      state.fullname = payload.result.full_name;
      state.status = payload.status_code;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },

    // login section
    [loginUser.fulfilled]: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.expires_in = payload.expires_in;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },


    // get profile details
    [fetchUserProfileWithToken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserProfileWithToken.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.authUser = payload.result;
    },
    [fetchUserProfileWithToken.rejected]: (state) => {
      console.log('fetchUserProfileWithToken');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

export default userSlice.reducer;
