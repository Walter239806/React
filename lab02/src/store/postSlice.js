import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../service/apiClient';

const initialState = {
	num: 0,
	post: {
		name: '',
	},
	list: [],
	isLoading: false,
	isError: false,
	errorMessage: '',
};

export const readAll = createAsyncThunk(
	'post/readAll',
	async (input, thunkAPI) => {
		try {
			const { list } = thunkAPI.getState().postSlice;
			console.log('list', list);
			if (list.length) {
				console.log('list exist', list);
				return list;
			}
			const response = await apiClient.get('/post/readAll');
			console.log('from fetch 😁', response);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.toString());
		}
	}
);

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setNum: (state, value) => {
			state.num = value.payload;
		},
	},
	extraReducers: {
		[readAll.pending]: (state) => {
			state.isLoading = true;
			state.isError = false;
		},
		[readAll.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.isError = false;
			state.list = action.payload;
		},
		[readAll.rejected]: (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
	},
});

export const { setNum } = postSlice.actions;

export default postSlice.reducer;
