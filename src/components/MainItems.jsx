import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, increase, decrease, calculateTotal, getCartItems } from '../features/cart/cartSlice';
import { openModal } from '../features/cart/modalSlice';
import {PuffLoader} from 'react-spinners'
const MainItems = () => {
    const { cartItems, total, isLoading } = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(calculateTotal())
    }, [cartItems])
    useEffect(() => {
        dispatch(getCartItems())
    }, [])
    const SingleProduct = ({ img, id, price, title, amount}) => {
        return  <div className="item justify-around w-full mb-8 flex">
        <div className="product flex">
        <div className="img">
            <img src={img} alt={title}
                className='object-cover w-[130px]' />
         </div>
            <div className="info gap-3 flex flex-col items-start justify-center">
            <h3>{title}</h3>
            <h3>${price}</h3>
            <button onClick={() => dispatch(removeItem(id))} className='text-indigo-700'>Remove</button>
            </div>
        </div>
        <div className="quantity flex flex-col justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => dispatch(increase(id))} stroke="currentColor" className="w-6 h-6 text-indigo-700 cursor-pointer">
         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
         </svg>
         <h2>{amount}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() =>  {
                    if (amount === 1) {
                        dispatch(removeItem(id))
                        return;
                    }
                    dispatch(decrease(id))
                }
                } stroke="currentColor" className="w-6 h-6 text-indigo-700 cursor-pointer">
         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
         </svg>
        </div>
     </div>
    }

    const Products = () => {

        return cartItems.map((item) => {
            return <SingleProduct key={item.id} {...item} />
        })
    }
    if (isLoading) {
        return <div className='w-full flex justify-center items-center h-screen'>
            <PuffLoader color="#4338ca" />
        </div>
    }
    if (cartItems.length < 1) {
        return <section className='w-full text-center'>
            <h1 className='text-3xl font-bold mt-5'>Nothing In Your Bag</h1>
        </section>
    }
  return (
      <section className='w-full h-[110vh] flex flex-col items-center '>
          <h1 className='text-4xl pt-11 font-bold text-center'>YOUR BAG</h1>
          <div className="products mt-20 w-[70%]">
            <Products />
          </div>
          <hr className='w-[60%] h-[2px] bg-slate-700' />
          <div className="total mt-6 w-[58%] flex justify-between">
            <h2>Total</h2>
            <div>${ total }</div>
          </div>
          <div className="clearCart mt-5">
              <button
                  onClick={() => dispatch(openModal())}
                  className='border border-red-600 text-red-600 px-5 py-1'>CLEAR CART</button>
          </div>
      </section>
  )
}

export default MainItems