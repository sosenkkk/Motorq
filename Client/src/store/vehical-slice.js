import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./../helper/helper";

const vehicalSlice = createSlice({
  name: "vehicalmmy",
  initialState: {
    vehicalmmy: [],
    make:"",
    model:"",
    year:"",
    vin:""
  },
  reducers: {
    getvehicalData(state, action) {
      state.vehicalmmy = action.payload.vehicalmmy;
    },
    choseMake(state,action){
        state.make = action.payload;
    },
    choseModel(state, action){
        state.model = action.payload;
    },
    choseYear(state, action){
        state.year = action.payload;
    },
    choseVin(state, action){
        state.vin = action.payload;
    },
  },
});

export const fetchvehicalData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL + "get-vehicalmmy");
      if (!response.ok) {
        throw new Error("Fetch Failed");
      }
      const data = await response.json();
      
      return data.vehicalmmy;
    };
    try {
      const vehicalData = await fetchData();
      dispatch(
        vehicalActions.getvehicalData({
            vehicalmmy: vehicalData
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const vehicalActions = vehicalSlice.actions;
export default vehicalSlice.reducer;
