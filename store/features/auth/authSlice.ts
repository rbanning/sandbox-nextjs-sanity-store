
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService, LoginArgs, StorageService } from '@/lib';
import { UserDTO } from '@/types/user.model';
import { AsyncActionStatus } from '@/types/async-action-status.type';
import { reject, rejectionToString } from '@/store/reject-helper';


export interface AuthState {
  isAuthenticated: boolean;
  user: UserDTO | null;
  status: AsyncActionStatus;
  error?: string;
  initialized?: boolean;
}

const isUserAuthenticated = (user: UserDTO | null) => typeof(user) !== undefined && typeof(user?.id) === 'string';

const AUTH_KEY = 'auth';

//do not attempt to get user from local storage here...
//use the `initialize()` action
export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle'
};



export const login = createAsyncThunk(
  'auth/login',
  async (args: LoginArgs, { rejectWithValue }) => {
    try {
      const result = await (new AuthService()).login(args);
      if (result) {
        (new StorageService()).setItem(AUTH_KEY, result)
      } else {
        (new StorageService()).removeItem(AUTH_KEY)
      }
      return result;
    } catch (error: any) {
      return reject(rejectWithValue, error);
    }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const result = await (new AuthService()).logout();
      (new StorageService()).removeItem(AUTH_KEY)
      return result;
    } catch (error: any) {
      return reject(rejectWithValue, error);
    }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialize: (state) => {
      if (!state.initialized) {
        //prevent running on server
        if (!StorageService.isStorageAvailable()) {
          throw new Error("Auth - can only initialize on the client");
        }
        const user = (new StorageService()).getItem<UserDTO>(AUTH_KEY); 
        state.user = user;
        state.isAuthenticated = isUserAuthenticated(user);
        state.initialized = true;
      }
    },
    reset: (state) => {
      state.error = undefined;
      state.isAuthenticated = isUserAuthenticated(state.user);
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'working';
      state.error = undefined;   //clear
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload;
      state.isAuthenticated = isUserAuthenticated(action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'error';
      console.warn("Rejected", {state, action});
      state.error = rejectionToString(action);
      state.isAuthenticated = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.status = 'working';
      state.error = undefined;   //clear
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = 'error';
      console.warn("Rejected", {state, action});
      state.error = rejectionToString(action);
      state.isAuthenticated = false;
    });
  }
});

export const { initialize, reset } = authSlice.actions;

const authSliceReducer = authSlice.reducer;

export default authSliceReducer;

