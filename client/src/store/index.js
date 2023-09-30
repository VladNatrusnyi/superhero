import {configureStore} from "@reduxjs/toolkit"
import {superheroesSlice} from "./superheroes/superheroesSlice"
import {superheroesApi} from "./queries/superheroesApi"

export const store = configureStore({
  reducer: {
    superheroes: superheroesSlice,
    [superheroesApi.reducerPath]: superheroesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(superheroesApi.middleware)
})
