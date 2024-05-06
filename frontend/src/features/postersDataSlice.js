import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "posters/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk("getProduct", async (pid, { rejectWithValue }) => {
  try {
    console.log("pid: " + pid + " ," + typeof (pid));
    const response = await axios.get(`/api/getProduct?pid=${pid}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const postersData = createSlice({
  name: "posters",
  initialState: {
    posterData: [],
    filteredPosters: [],
    temp: [],
    isLoading: false,
    loading: false,
    error: null,
    zoomState: false,
    productDetails: {},
    sortPageState:false
  },
  reducers: {
    setfilteredPoster: (state, action) => {
      state.filteredPosters = action.payload,
        state.isLoading = true
    },
    revertPoster: (state) => {
      state.temp = state.posterData,
        state.isLoading = true
    },
    revertfilteredPoster: (state) => {
      state.temp = state.filteredPosters,
        state.isLoading = true
    },
    setZoomState: (state, action) => {
      state.zoomState = action.payload;
    },
    setSortPageState: (state, action) => {
      state.sortPageState= action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.posterData = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default postersData.reducer;
export const { setfilteredPoster, revertPoster, revertfilteredPoster, setZoomState,setSortPageState } = postersData.actions
