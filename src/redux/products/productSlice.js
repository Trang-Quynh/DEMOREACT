import {createSlice} from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    getOneProduct, getSearchProducts,
    getProducts,
    updateOneProduct
} from "../../service/productService";

const initialState = {
    list: [],
    listSearch: [],
    currentProduct: null
}

const productSlice = createSlice(
    {
        name: 'product',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getProducts.fulfilled, (currentState, action)=>{
                console.log(action.payload)
                     currentState.list = action.payload
            })
            builder.addCase(addProduct.fulfilled, (currentState, action)=>{
                console.log(action.payload, 111)
                currentState.list.push(action.payload)
            })
            builder.addCase(deleteProduct.fulfilled, (currentState, action)=>{
                    let id = action.payload;
                    let index = -1;
                    for (let i = 0; i < currentState.list.length; i++) {
                        if(currentState.list[i].id === id){
                            index = i;
                        }
                    }
                    currentState.list.splice(index, 1)
            })
            builder.addCase(getOneProduct.fulfilled, (currentState, action)=>{
                   currentState.currentproduct = action.payload;
            })
            builder.addCase(updateOneProduct.fulfilled, (currentState, action) =>{
                  let product = action.payload;
                  let id = product.id;
                  let index = -1;
                  for (let i = 0; i < currentState.list.length; i++) {
                      if(currentState.list[i].id === id){
                          index = i;
                      }
                  }
                  currentState.list[index] = product;
            })
            builder.addCase(getSearchProducts.fulfilled, (currentState, action)=>{
                currentState.listSearch = action.payload;
            })

        }
    }
)
export default productSlice.reducer