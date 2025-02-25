import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Menu = () => {
  return (
    <div className="bg-[#DCDEEA]">

    <Navbar/>

        <div className="flex">
        <div className="ml-8 w-60 h-screen p-4">
            <h2 className="text-lg font-bold text-[#1C359A] text-center mb-4">Categories</h2>

            
            <ul className="space-y-3">
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/YCB LOGO (BLACK).png" alt="All" className="w-8 h-8 object-contain" />
                <span className="text-sm font-bold">All</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/cafeviennaNobg.png" alt="Classic Coffees" className="w-8 h-8 object-contain" />
                <span className="text-sm font-bold">Classic Coffees</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg" alt="Frappes" className="w-8 h-8 object-fill rounded-xl	" />
                <span className="text-sm font-bold">Frappes</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg" alt="Smoothies" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Smoothies</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg" alt="Refreshers" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Refreshers</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer ">
                <img src="img/MILK DRINKS/Mango Milk.jpg" alt="Milk Drinks" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Milk Drinks</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/porkcurry.jpg" alt="Rice Meals" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Rice Meals</span>
            </li>
            <li className="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                <img src="img/seafoodpasta.jpg" alt="Snacks & Pasta" className="w-8 h-8 object-fill rounded-xl" />
                <span className="text-sm font-bold">Snacks & Pasta</span>
            </li>
            </ul>
        </div>


        <div className="w-3/4 flex flex-col ml-9">
            <div className="w-full h-16 flex justify-between items-center px-4">
            <h1 className="text-[#1C359A] font-bold text-lg">All Menu</h1>
            <div className="relative">
                <img src="img/cart.png" alt="Cart" className="h-6 w-6"/>
            </div>
            </div>

            <hr className="border-t border-black mx-4 my-2"/>

            <div className="p-4 grid grid-cols-2 gap-4">
         
            </div>
        </div>
        </div>

    <Footer/>
    </div>
  )
}

export default Menu