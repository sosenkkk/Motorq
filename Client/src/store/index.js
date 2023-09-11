import vehicalmmyReducer from "./vehical-slice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{vehicalmmy: vehicalmmyReducer}
})

export default store;