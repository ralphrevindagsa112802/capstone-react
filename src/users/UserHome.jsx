import UserNavbar from '../components/UserNavbar'
import Footer from '../components/Footer'

const UserHome = () => {
  return (
    <div className='md-overflow-y-hidden bg-[#484952]'>
      <UserNavbar />

      <main className="mt-32"> 
          <section className="">
            <img src="" alt="" />

            <div className="header flex flex-col items-center text-center py-8 relative">
              
              <div className="text-[#04091b] text-sm flex justify-center w-full space-x-[290px]">
                <div>No Lines, Just Good Coffee</div>
                <div>Monday - Sunday 10:00 AM - 2:00 AM</div>
              </div>

              <div className="title">
                <div className="text-4xl sm:text-5xl font-black text-[#9da4db] mb-2">Brewed Fresh, Ready to Go</div>
                <div className="text-3xl sm:text-4xl font-black text-black">Anytime, Anywhere!</div>
              </div>

             
              <button
                className="mt-6 mb-6 bg-[#1C359A] text-sm font-semibold text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700">
                ORDER NOW
              </button>

              <div className="relative">
               
                <div className="absolute inset-0">
                  <img src="/img/FLAVORED LATTES/SPANISH LATTE.jpg" alt="Coffee Splash" className="w-full h-auto" />
                </div>

               
                <div className="relative flex flex-col items-center">
                  
                  <div id='gradient-container'
                    className="w-full bg-gradient-to-b from-brown-700 to-brown-500 rounded-t-full relative mt-48 overflow-hidden shadow-xl">


                    <div className="relative flex justify-around items-center mt-20 px-10">
                      
                      <div className="w-36 h-36 rounded-full shadow-md flex items-center justify-center">
                        <img src="/img/CLASSIC COFFEES/Cafe Vienna.jpg" alt="Food Item 1"
                          className="w-32 h-32 rounded-full object-cover" />
                      </div>

                      
                      <div className="w-48 h-48  rounded-full shadow-lg flex items-center justify-center">
                        <img src="/img/FLAVORED LATTES/CARAMEL LATTE ICON.jpg" alt="Drink"
                          className="w-44 h-44 rounded-full object-cover" />
                      </div>

                    
                      <div className="w-36 h-36 rounded-full shadow-md flex items-center justify-center">
                        <img src="/img/SMOOTHIES AND FRAPPES/Mango Tango.jpg" alt="Food Item 2"
                          className="w-32 h-32 rounded-full object-cover"/>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="absolute top-10 left-10">
                  <img src="coffee-beans.png" alt="Coffee Beans" className="w-16 h-auto"/>
                </div>
                <div className="absolute top-10 right-10">
                  <img src="coffee-beans-2.png" alt="Coffee Beans" className="w-16 h-auto"/>
                </div>
              </div>
            </div>
          </section>


          
          <section className=" bg-white w-full h-auto flex flex-col justify-center items-center text-center py-6">
            <div className="text-4xl sm:text-5xl font-black text-[#1C359A]"> Welcome to Yappari!</div>
            <div className="lines mt-4">
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="mt-4">We are YCB! Our goal is to bring smile on your face with just one sip of our freshly brewed
              coffee.</div>

            <div id="best-seller" className="flex flex-row space-x-4 mt-4">

              <div id="card1" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                <div className="justify-center flex items-center"> 
                  <img src="/img/CLASSIC COFFEES/Cafe Vienna.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                </div>

                <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col "> 
                  <div className="text-[#1C359A] font-bold flex">Cafe Vienna</div> 
                  <div className="text-justify opacity-55	"> 
                    Viannese Coffee that serves Americano topped with a heavy whipped
                    cream. Dashed with cocoa powder
                  </div>

                  <div className="flex flex-row-reverse justify-between mt-auto items-center pt-4">
                 
                    <div className="price text-sm font-semibold">₱130 - ₱140</div>
                    <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                      onClick={ () => window.location.href()}>
                      <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              <div id="card2" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                <div className="justify-center flex items-center"> 
                  <img src="/img/katsudon.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                </div>

                <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                  <div className="text-[#1C359A] font-bold flex">Pork Katsudon</div>
                  <div className="text-justify opacity-55	"> 
                    Fried panko-breaded pork cutlet with egg cooked in japanese soy sauce over rice.
                  </div>

                  <div className="flex flex-row-reverse justify-between pt-4 top-0 mt-auto items-center ">
                    
                    <div className="price text-sm font-semibold">₱120</div>
                    <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                      onClick={ () => window.location.href('your-page-url-here.html')}>
                      <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              <div id="card3" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg"> 
                <div className="justify-center flex items-center"> 
                  <img src="/img/CLASSIC COFFEES/Caramel Macchiato.jpg" alt="" className="w-[213px] h-48 rounded-md object-cover" />
                </div>

                <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col"> 
                  <div className="text-[#1C359A] font-bold flex">Caramel Macchiato</div>
                  <div className="text-justify opacity-55	">
                    Milk espresso-based coffee with use of freshly steamed milk, caramel syrup and caramel drizzle on top.
                  </div>

                  <div className="flex flex-row-reverse justify-between mt-auto pt-4 items-center">
                  
                    <div className="price text-sm font-semibold">₱125 - 135</div>
                    <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                      onClick={ () => window.location.href('your-page-url-here.html')}>
                      <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              <div id="card4" className="w-72 bg-[#DCDEEA] flex flex-col pt-4 h-auto rounded-lg shadow-lg">
                <div className="justify-center flex items-center">
                  <img src="/img/2022-11-21 (2).jpg" alt="" className="w-[213px] h-48 rounded-md object-cover"/>
                </div>

                <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                  <div className="text-[#1C359A] font-bold flex">Seafood Pasta</div>
                  <div className="text-justify opacity-55	">
                    A tomato based pasta that is served with shrimp.
                  </div>

                  <div className="flex flex-row-reverse justify-between items-center mt-auto pt-4">
                    
                    <div className="price text-sm font-semibold">₱160</div>
                    <button className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                      onClick={ () => window.location.href('your-page-url-here.html')}>
                      <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4"/>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mt-6 bg-[#1C359A] text-sm font-semibold text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700">
              More
            </button>
          </section>


          
          <section className="bg-white w-full h-auto text-center py-6 mt-6">
            <div className="text-4xl sm:text-5xl font-black text-[#1C359A]">Why Yappari Coffee Bar ?</div>
            <div className="flex flex-row justify-center mt-6">
              <div className="float-left">
                <img src="/img/pngwing.com (2).png" alt=""/>
              </div>
              <div className="flex flex-col justify-center mt-4 sm:mt-0 sm:ml-6 text-left max-w-md space-y-6">

                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">Quality Coffee</div>
                  <p className="text-sm">Experience our passion for coffee firsthand, with <span
                      className="text-[#1C359A] font-bold">unique flavors and a warm ambiance</span> that make us the perfect spot
                    for every coffee lover.</p>
                </div>

                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">Elevate your Meal</div>
                  <p className="text-sm">Not just coffee—savor our delicious rice meals, featuring authentic <span
                      className="text-[#1C359A] font-bold">Japanese cuisine</span> and other mouthwatering options that perfectly
                    complement your brew!</p>
                </div>


                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">RELAX AND RECHARGE: YOUR COZY COFFEE OASIS!</div>
                  <p className="text-sm">Join us for a delightful coffee experience in our <span
                      className="text-[#1C359A] font-bold">cozy haven</span>, designed to help you relax, recharge, and savor
                    every sip</p>
                </div>


                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">SAFE SPACE CERTIFIED</div>
                  <p className="text-sm">This establishment has completed <span className="text-[#1C359A] font-bold">SOGIESC
                      Inclusivity Training</span> with <span className="text-[#1C359A] font-bold">Queer Safe Spaces, Inc.</span>
                  </p>
                  <div className="text-[#1C359A] text-sm font-bold "><a href="">see more...</a></div>
                </div>

              </div>


            </div>

            <button
              className="mt-6 bg-[#1C359A] text-sm font-semibold text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700">
              About Us
            </button>

          </section>


          
          <section className="bg-white w-full h-auto text-center py-6 mt-6">
            <div className="text-4xl sm:text-5xl font-black text-[#1C359A] h-auto">Find Us & Our Hours</div>

            <div className="flex flex-row justify-center">

              <div className="flex flex-col text-center justify-center sm:mt-0 sm:ml-6 max-w-md space-y-6">
                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">Location</div>
                  <p className="text-sm">Visit us at 218 Target Range Blvd, Pembo, Makati City – your cozy coffee haven awaits!
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-[#1C359A] text-lg font-bold">Coffee hours</div>
                  <p className="text-sm">Not just coffee—savor our delicious rice meals, featuring authentic <span
                      className="text-[#1C359A] font-bold" />We’re open Monday to Sunday. Our operation starts from 10 AM and closes
                      at 2 AM.</p>
                </div>
              </div>

              <div className="float-left">
                <img className="h-96" src="/img/pngwing.com (6).png" alt="" />
              </div>

            </div>

          </section>
        </main>
      <Footer/>
    </div>
  )
}

export default UserHome