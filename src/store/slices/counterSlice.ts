import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'window',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
