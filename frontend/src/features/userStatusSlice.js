import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserStatus = createAsyncThunk("userStatus", async (args, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/auth");
        if (response.data.valid === true) {
            return response.data;
        } else {
            return false;
        }
    } catch (err) {
        // If request fails or response status is not successful (e.g., 404)
        return rejectWithValue(err.response.data);
    }
});

export const userStatus = createSlice({
    name: "userStatus",
    initialState: {
        userStatus: false,
        userId:null,
        userName: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserStatus.fulfilled, (state, action) => {
                state.loading = false;
                if(!action.payload){
                    state.userStatus = false;
                }else{
                    state.userId=parseInt(action.payload.id);
                    state.userStatus = true;
                    state.userName=action.payload.username.charAt(0).toUpperCase();
                }
            })
            .addCase(getUserStatus.rejected, (state, action) => {
                state.error = action.payload; 
            });
    }
});

export default userStatus.reducer