import { useSelector } from "react-redux";
import {FaCartShopping} from "react-icons/fa6"

const Navbar = () => {
    const {amount} = useSelector((store) => store.cart)
  return (
      <nav>
          <div className="Nav-Center w-full h-20 bg-indigo-700 flex items-center justify-around">
              <h3 className="text-3xl font-bold ">Redux Toolkit</h3>
              <div className="cart relative cursor-pointer">
                  <FaCartShopping className="text-3xl" color="white" />
                  <span className="absolute top-[-10px] right-[-10px] text-center text-white bg-slate-500 h-6 w-6 rounded-full">{ amount }</span>
             </div>
          </div>
    </nav>
  )
}

export default Navbar