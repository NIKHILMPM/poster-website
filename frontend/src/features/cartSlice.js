import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCartItems = createAsyncThunk("getCartItems", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/cartitems");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addCartItem = createAsyncThunk("addCartItem", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/addcart', { pid: data });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const changeQuantity = createAsyncThunk("changeQuantity", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/changequantity', { pid: data.pid, quantity: data.quantity });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteCartItem = createAsyncThunk("deleteCartItem", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/dropitem', { pid: data });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const cartItemsSlice = createSlice({
    name: "cartItems",
    initialState: {
        cart: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.cart = action.payload.cartItem;
                }
                state.loading = false;
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changeQuantity.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(changeQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartItemsSlice.reducer;
