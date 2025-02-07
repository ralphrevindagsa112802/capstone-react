import React from 'react'

const CheckOut = () => {
  return (
    <div className='bg-[#DCDEEA]'>
  
    <div class="flex items-center justify-center md:justify-start w-full md:w-auto shadow-md px-12 py-4 bg-white">
      <img src="../img/YCB LOGO (BLUE).png" alt="Logo" class="h-20 w-auto object-contain block"/>
    </div>

    
      <div class="min-h-screen p-6">
        <div class="max-w-6xl mx-auto  rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
        
              <div class="mb-6">
                <h2 class="text-xl font-bold text-blue-800 mb-4">Checkout</h2>
                <div class="p-4 rounded-lg border border-gray-200">
                  <p class="font-semibold">
                   
                    <span id="customer-name"></span>
                  </p>
                  <p class="text-sm text-gray-600">
                  
                    <span id="customer-address"></span>
                  </p>
                  <p class="text-sm text-gray-600">
                    Order number: 
                   
                    <span id="order-number"></span>
                  </p>
                  <a href="#" class="text-blue-500 text-sm mt-2 block">Edit</a>
                </div>
              </div>
             
              <div class="mb-6">
                <h2 class="text-xl font-bold text-blue-800 mb-4">Shipping Information</h2>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2 border-[#1C359A] border rounded-lg p-4 w-full active:bg-white">
                    <input type="radio" name="shipping-method" value="delivery" class="accent-blue-600"/>
                    <div>
                      <p class="font-semibold text-sm">Delivery</p>
                    </div>
                  </label>
                  
                  <label class="flex items-center gap-2 border-[#1C359A] border rounded-lg p-4 w-full">
                    <input type="radio" name="shipping-method" value="pickup" class="accent-blue-600"/>
                    <div>
                      <p class="font-semibold text-sm">Pick up</p>
                    </div>
                  </label>
                </div>
                <p class="text-sm text-gray-500 mt-2">
                  *For pick-up customers, please arrive 20–30 minutes after receiving your order status "READY TO PICK-UP."
                </p>
              </div>
      
         
              <div>
                <h2 class="text-xl font-bold text-blue-800 mb-4">Payment Details</h2>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                  <div>
                    <p class="text-sm font-semibold">Payment method</p>
                
                    <p id="payment-method" class="text-sm text-gray-600"></p>
                    <a href="#" class="text-blue-500 text-sm mt-2 block">Edit</a>
                  </div>
                  <div class="text-blue-600">
              
                    <span id="payment-icon"></span>
                  </div>
                </div>
              </div>
            </div>
      
          
            <div>
              <h2 class="text-xl font-bold text-blue-800 mb-4">Your order</h2>
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div id="order-items" class="space-y-4">
                
                </div>
                <div class="border-t pt-4 mt-4">
                  <div class="flex justify-between font-semibold text-gray-800">
                    <p>Total</p>
         
                    <p id="total-price"></p>
                  </div>
                </div>
              </div>
              <button class="mt-6 bg-blue-800 text-white w-full py-3 rounded-lg text-lg font-bold">
                Pay <span id="pay-amount"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckOut