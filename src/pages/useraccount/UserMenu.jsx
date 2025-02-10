import React from 'react'
import UserNavbar from '../../components/UserNavbar'
import Footer from '../../components/Footer'

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

            <div id="best-seller" className="w-full flex flex-col space-y-4 mt-4 py">
                <div className="w-3/4 flex flex-col ml-9">
                    <div className="w-full h-16 flex justify-between items-center px-4 relative">
                    <h1 className="text-[#1C359A] font-bold text-lg">All Menu</h1>
                    <div className="relative z-10">
                        <img src="../img/cart.png" alt="Cart" className="h-6 w-6"/>
                    </div>
                    </div>

                    <hr className="border-t border-black mx-4 my-2"/>

                    {/* 🔹 Make the cards display in a row */}
                    <div className="container-fluid grid grid-cols-3 gap-4 p-5">
                    
                    {/* 🔹 Card 1 */}
                    <div id="card1" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                        <div className="w-full flex flex-wrap justify-center gap-4">
                        <img src="../img//CLASSIC COFFEES/Cafe Vienna.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                        </div>
                        <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                        <div className="text-[#1C359A] font-bold flex">Cafe Vienna</div>
                        <div className="text-justify opacity-55"> 
                            Viannese Coffee that serves Americano topped with a heavy whipped
                            cream. Dashed with cocoa powder
                        </div>
                        <div className="flex flex-row-reverse justify-between pt-4 mt-auto items-center">
                            <div className="price text-sm font-semibold">₱130 - ₱140</div>
                            <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2">
                            <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                            <span>Add</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* 🔹 Card 2 */}
                    <div id="card2" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                        <div className="w-full flex flex-wrap justify-center gap-4">
                        <img src="../img/katsudon.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                        </div>
                        <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                        <div className="text-[#1C359A] font-bold flex">Pork Katsudon</div>
                        <div className="text-justify opacity-55"> 
                            Fried panko-breaded pork cutlet with egg cooked in japanese soy sauce over rice.
                        </div>
                        <div className="flex flex-row-reverse justify-between pt-4 mt-auto items-center">
                            <div className="price text-sm font-semibold">₱120</div>
                            <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2">
                            <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                            <span>Add</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* 🔹 Card 2 */}
                    <div id="card3" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg"> 
                        <div className="w-full flex flex-wrap justify-center gap-4"> 
                        <img src="../img/CLASSIC COFFEES/Caramel Macchiato.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover" />
                        </div>
                        <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                        <div className="text-[#1C359A] font-bold flex">Caramel Macchiato</div>
                        <div className="text-justify opacity-55">
                            Milk espresso-based coffee with use of freshly steamed milk, caramel syrup and caramel drizzle on top.
                        </div>
                        <div className="flex flex-row-reverse justify-between mt-auto pt-4 items-center">
                            <div className="price text-sm font-semibold">₱125 - 135</div>
                            <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2">
                            <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                            <span>Add</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* 🔹 Card 3 */}
                    <div id="card3" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                        <div className="justify-center flex items-center">
                        <img src="../img/2022-11-21 (2).jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                        </div>
                        <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                        <div className="text-[#1C359A] font-bold flex">Seafood Pasta</div>
                        <div className="text-justify opacity-55">
                            A tomato-based pasta that is served with shrimp.
                        </div>
                        <div className="flex flex-row-reverse justify-between mt-auto pt-4 items-center">
                            <div className="price text-sm font-semibold">₱160</div>
                            <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2">
                            <img src="../img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                            <span>Add</span>
                            </button>
                        </div>
                        </div>
                    </div>

                    </div> {/* 🔹 End of row container */}
                </div>
            </div>

        
    </div>        
        <Footer />
    </div>
  )
}

export default UserMenu