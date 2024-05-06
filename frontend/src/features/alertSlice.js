import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'userDetail',
    initialState: {
        condition:false
    }
    , reducers:{
        setAlert:(state,action) =>{
            state.condition=true;
        },
        removeAlert:(state,action)=>{
            state.condition=false
        }
    }
})

export default alertSlice.reducer;