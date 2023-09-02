import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";
const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItem', async (name, thunkAPI) => {
    try {
        const res = await axios(url)
        return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue("SomeThing Went Error")
    }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
             state.cartItems = state.cartItems.filter((item) => {
                  return  item.id !== itemId
            })
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => {
                return item.id === payload
            })
            cartItem.amount += 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => {
                return item.id === payload
            })
            cartItem.amount -= 1
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price 
            })
            return {...state, amount: amount, total: Math.ceil(JSON.parse(total))}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        })
        .addCase(getCartItems.rejected, (state) => {
            state.isLoading = false
        })
    }

})

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;