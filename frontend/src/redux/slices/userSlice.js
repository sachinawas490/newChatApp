import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        selectedUser: null,
        otherUsers: null,
        userMessages: []  // Initialize with an empty array
    },
    reducers: {
        setAuthUser: (state, action) => {console.log(action.payload);
            state.authUser = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOtherUser: (state, action) => {
            state.otherUsers = action.payload;
        },
        setUserMessages: (state, action) => {
            state.userMessages = action.payload;
        },
        setNewMessage: (state, action) => {
            state.userMessages = [...state.userMessages, action.payload]; // Ensure immutability
        }
    },
});

export const { setAuthUser, setSelectedUser, setOtherUser, setUserMessages, setNewMessage } = userSlice.actions;
export default userSlice.reducer;
