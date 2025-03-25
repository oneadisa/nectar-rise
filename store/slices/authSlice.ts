import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: {
    email: string;
    username?: string;
    id?: number;
  } | null;
  signupSuccess: boolean;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  user: null,
  signupSuccess: false,
};

interface SignupData {
  email: string;
  username: string;
  password: string;
  name?: {
    firstname: string;
    lastname: string;
  };
  phone?: string;
}

export const registerUser = createAsyncThunk<
  { email: string; username: string; id: number },
  SignupData,
  { rejectValue: string }
>("auth/register", async (userData: SignupData, { rejectWithValue }) => {
  try {
    const minimalUserData = {
      email: userData.email,
      username: userData.username,
      password: userData.password,
    };

    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(minimalUserData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return rejectWithValue(errorData || "Registration failed");
      } catch {
        return rejectWithValue(
          `Registration failed with status: ${response.status}`
        );
      }
    }

    const data = await response.json();

    return { ...data, email: userData.email, username: userData.username };
  } catch (error) {
    return rejectWithValue("Network error occurred");
  }
});

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          return rejectWithValue(errorData || "Login failed");
        } catch {
          return rejectWithValue(
            `Login failed with status: ${response.status}`
          );
        }
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue("Network error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: { email: string; username?: string; id?: number };
      }>
    ) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    resetSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = { email: action.meta.arg.username };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Login failed";
      })

      // Registration cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSuccess = true;
        state.error = null;
        // We don't log the user in automatically after registration
        // They need to login with their credentials
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = (action.payload as string) || "Registration failed";
      });
  },
});

export const { logout, setCredentials, resetSignupSuccess } = authSlice.actions;
export default authSlice.reducer;
