import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	num: 0,
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setNum: (state, value) => {
			state.num = value.payload;
		},
	},
});

export const { setNum } = postSlice.actions;

export default postSlice.reducer;
