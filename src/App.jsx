import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import MainItems from './components/MainItems'
import Modal from './components/Modal'
import { useSelector } from 'react-redux'

function App() {
  const {isOpen} = useSelector((store) => store.modal)
  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <MainItems />
    </>
  )
}

export default App
