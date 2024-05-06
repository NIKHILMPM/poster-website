import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserOrders = createAsyncThunk("getUserOrders", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/orders");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const cancelUserOrder = createAsyncThunk("cancelUserOrder", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/cancelOrder', { id: data });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getUserOrderHistory = createAsyncThunk("getUserOrdersHistory", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/getOrderHistory");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeUserOrderHistory = createAsyncThunk("removeUserOrdersHistory", async (data, { rejectWithValue }) => {
    try {
        console.log("2 :" + data);
        const response = await axios.post("/api/removeOrderHistory", {id:data});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading: false,
        error: null,
        orderHistory: [],
        viewState:false,
        viewOrder:null
    },
    reducers:{
        setViewOrder:(state,action)=>{
            state.viewState=action.payload.status;
            state.viewOrder=action.payload.order;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelUserOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelUserOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loading = false;
            })
            .addCase(cancelUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserOrderHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserOrderHistory.fulfilled, (state, action) => {
                state.orderHistory = action.payload;
                state.loading = false;
            })
            .addCase(getUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeUserOrderHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeUserOrderHistory.fulfilled, (state, action) => {
                state.orderHistory = action.payload;
                state.loading = false;
            })
            .addCase(removeUserOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;
export const{setViewOrder} = orderSlice.actions
