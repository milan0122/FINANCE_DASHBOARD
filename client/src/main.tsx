import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 import '@/index.css'
import App from '@/App.tsx'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {api} from "@/state/api";



export const store = configureStore({
  reducer : { [api.reducerPath]:api.reducer},
  middleware: (getDefault)=> getDefault().concat(api.middleware),
})
setupListeners(store.dispatch);
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store = {store}>
  <StrictMode>
    <App />
  </StrictMode>,
  </Provider>
)
// index.tsx
// import { createRoot } from "react-dom/client";
// import App from "@/App";


// const root = createRoot(document.getElementById("root")!);
// root.render(<App />);
