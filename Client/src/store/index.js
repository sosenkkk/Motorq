import vehiclemmyReducer from "./vehicle-slice"
import userReducer from "./user"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{vehiclemmy: vehiclemmyReducer, user:userReducer}
})

export default store;