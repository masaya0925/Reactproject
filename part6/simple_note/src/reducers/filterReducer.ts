import { createSlice } from "@reduxjs/toolkit";

const initialState = 'ALL';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action: {type: string, payload: string}) { 
      console.log(state);
      return action.payload;
    }
  }
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;