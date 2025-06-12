import { createSlice } from '@reduxjs/toolkit';
import { logout } from './authSlice';

const initialState = {
  alert: {
    isOpen: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alert = {
        isOpen: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideAlert(state) {
    state.alert = initialState.alert;
    },
  },
   extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.alert = initialState.alert;
    });
  },
});

export const { showAlert, hideAlert } = uiSlice.actions;
export default uiSlice.reducer;