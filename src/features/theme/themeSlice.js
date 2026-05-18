import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theme: localStorage.getItem("theme") || "light"
}