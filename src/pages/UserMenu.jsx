import React from 'react'
import UserNavbar from '../components/UserNavbar'
import Footer from '../components/Footer'

const UserMenu = () => {
  return (
    <div className='bg-[#DCDEEA]'>
        <UserNavbar />
        <div class="flex">
            <div class="ml-8 w-60 h-screen p-4">
                <h2 class="text-lg font-bold text-[#1C359A] text  -center mb-4">Categories</h2>

                
                <ul class="space-y-3">
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/YCB LOGO (BLACK).png" alt="All" class="w-8 h-8 object-contain" />
                    <span class="text-sm font-bold">All</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/cafeviennaNobg.png" alt="Classic Coffees" class="w-8 h-8 object-contain" />
                    <span class="text-sm font-bold">Classic Coffees</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/SMOOTHIES AND FRAPPES/Strawberry Frappe.jpg" alt="Frappes" class="w-8 h-8 object-fill rounded-xl	" />
                    <span class="text-sm font-bold">Frappes</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/SMOOTHIES AND FRAPPES/Strawberry Smoothie.jpg" alt="Smoothies" class="w-8 h-8 object-fill rounded-xl" />
                    <span class="text-sm font-bold">Smoothies</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/REFRESHERS/BLUE BUTTERFLY PEA LEMONADE ICON.jpg" alt="Refreshers" class="w-8 h-8 object-fill rounded-xl" />
                    <span class="text-sm font-bold">Refreshers</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer ">
                    <img src="../img/MILK DRINKS/Mango Milk.jpg" alt="Milk Drinks" class="w-8 h-8 object-fill rounded-xl" />
                    <span class="text-sm font-bold">Milk Drinks</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/porkcurry.jpg" alt="Rice Meals" class="w-8 h-8 object-fill rounded-xl" />
                    <span class="text-sm font-bold">Rice Meals</span>
                </li>
                <li class="flex items-center space-x-3 p-3 bg-white shadow rounded-lg hover:bg-blue-100 cursor-pointer">
                    <img src="../img/seafoodpasta.jpg" alt="Snacks & Pasta" class="w-8 h-8 object-fill rounded-xl" />
                    <span class="text-sm font-bold">Snacks & Pasta</span>
                </li>
                </ul>
            </div>


            <div class="w-3/4 flex flex-col ml-9">
                <div className="w-full h-16 flex justify-between items-center px-4 relative">
                    <h1 className="text-[#1C359A] font-bold text-lg">All Menu</h1>
                        
                    {/* ✅ Wrap the cart in a div and add z-index */}
                    <div className="relative z-10">
                            <img src="../img/cart.png" alt="Cart" className="h-6 w-6"/>
                    </div>
                </div>

                <hr class="border-t border-black mx-4 my-2"/>

                
               
                <div class="container-fluid grid grid-cols-4">
                    <div class="bg-white flex flex-col items-center justify-center">
                    <img class="w-16 h-16 rounded-full" src="../img/2022-11-21 (2).jpg" alt=""/>
                    <div class="">
                        <span>tangina</span>
                    </div>
                </div>
            </div>
        </div>

        </div>        
        <Footer />
    </div>
  )
}

export default UserMenu