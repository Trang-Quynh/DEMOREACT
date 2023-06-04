import {createSlice} from "@reduxjs/toolkit";
import {loginService, signupService} from '../../service/userService'

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user'))
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(loginService.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        // builder.addCase(signup.fulfilled, (state, action) =>{
        //     console.log(action.payload)
        //     state.list.push(action.payload);
        // })
    }
})

export default userSlice.reducer;