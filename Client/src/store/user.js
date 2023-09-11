import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../helper/helper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userid:"",
    firstName:"",
    isauthenticated:false,
    isAdmin:false
  },
  reducers: {
    isLoggedIn(state, action) {
      state.isauthenticated = action.payload;
    },
    setUserId(state, action){
        state.userid = action.payload
    },
    isAdmin(state, action) {
        state.isAdmin = action.payload;
      },

  },
});


export const userActions = userSlice.actions;
export default userSlice.reducer;
