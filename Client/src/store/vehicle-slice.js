import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../helper/helper";

const vehicleSlice = createSlice({
  name: "vehiclemmy",
  initialState: {
    vehiclemmy: [],
    make:"",
    model:"",
    vin:"",
    year:""
  },
  reducers: {
    getvehicleData(state, action) {
      state.vehiclemmy = action.payload.vehiclemmy;
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

export const fetchvehicleData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL + "get-vehiclemmy");
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      return data.vehiclemmy;
    };
    try {
      const vehicleData = await fetchData();
      dispatch(
        vehicleActions.getvehicleData({
            vehiclemmy: vehicleData
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const vehicleActions = vehicleSlice.actions;
export default vehicleSlice.reducer;
