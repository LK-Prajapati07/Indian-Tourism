import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState={
    user:null,
    isAuthenticated:false,
    loading:true
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user=action.payload, //action.payload means jo data backend se aa rah hain usko user main dal do
            state.isAuthenticated=true;
            state.loading=false
        },
        LogOut:(state)=>{
            state.user=null,
            state.isAuthenticated=false,
            state.loading=true
        },
        setLoading:(state)=>{
            state.loading=true
        }

        
    }
})
export const { setUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;