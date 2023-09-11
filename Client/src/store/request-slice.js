import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../helper/helper";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
    make: "",
    model: "",
    vin: "",
    year: "",
  },
  reducers: {
    getrequestData(state, action) {
      state.requests = action.payload.requests;
    },
  },
});

export const fetchrequestData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("pa");

      const response = await fetch(BASE_URL + "user-requests");
      if (!response.ok) {
        throw new Error("Fetch Failed!");
      }
      const data = await response.json();
      return data.requests;
    };
    try {
      const requestData = await fetchData();
      console.log(requestData);
      dispatch(
        requestActions.getrequestData({
          requests: requestData,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const requestActions = requestSlice.actions;
export default requestSlice.reducer;
