import React from 'react'
import { closeModal } from '../features/cart/modalSlice'
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
const Modal = () => {
    const dispatch = useDispatch();
  return (
      <aside style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}
          className='modal-container h-[120vh] flex justify-center items-center absolute w-full'>
          <div className="div bg-white w-42 h-36 flex flex-col justify-center p-3 rounded-md">
              <h2 className='text-1xl'>Remove All Items From Your Shopping Cart?</h2>
              <div className="btns flex w-full mt-11 justify-around">
              <div className="btn">
                      <button type='button' onClick={() => {
                          dispatch(clearCart())
                          dispatch(closeModal())
                  }} className='py-2 px-5 border text-indigo-700 border-indigo-700'>
                      Confirm
                  </button>
            </div>
              <div className="btn">
                  <button type='button' onClick={() => dispatch(closeModal())} className='py-2 px-5 border border-red-600 text-red-600'>
                      Cancel
                  </button>
            </div>
                </div>
          </div>
      </aside>
  )
}

export default Modal