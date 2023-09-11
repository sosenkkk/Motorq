import vehiclemmyReducer from "./vehicle-slice"
import userReducer from "./user"
import { configureStore } from "@reduxjs/toolkit"
import requestsReducer from "./request-slice"
const store = configureStore({
    reducer:{vehiclemmy: vehiclemmyReducer, user:userReducer, requests:requestsReducer}
})

export default store;