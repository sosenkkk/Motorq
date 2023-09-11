import vehiclemmyReducer from "./vehicle-slice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{vehiclemmy: vehiclemmyReducer}
})

export default store;