import '../css/Footer.css'

const Footer = () => {
  return (
        <div className="">
            

        <footer className="grid grid-cols-[500px_1fr] bottom-0 bg-[#1C359A] w-full h-auto p-8">
            
            <div className=" flex justify-start ">
            <img src="../img/YCB LOGO (CREAM) (1).png" alt="" className="w-96"/>

            </div>

            <div className="grid grid-rows-2"> 

            <div className=" flex flex-row items-center justify-between w-full"> 
            
                <div>
                <button
                    className="bg-white text-blue-900 py-2 px-6 h-14 w-48 text-sm rounded-full font-semibold hover:bg-gray-200 transition">
                    ORDER NOW
                </button>
                </div>

            
                <div className="flex items-center space-x-4 ml-auto">
                <a href="#" className="hover:opacity-80">
                    <img src="../img/communication.png" alt="Facebook" className="w-8 h-8"/>
                </a>
                <a href="#" className="hover:opacity-80">
                    <img src="../img/instagram.png" alt="Instagram" className="w-8 h-8 rounded-full"/>
                </a>
                </div>
            </div>

            <div className="mt-0 border-t border-white pt-6 flex flex-col md:flex-row justify-between"> 
            
                <div className="flex flex-col mb-6 md:mb-0">
                <h3 className="text-base underline text-white mb-2 font-bold">Info</h3>
                <a href="#" className="text-sm text-gray-300 hover:text-white mb-1">Company</a>
                <a href="#" className="text-sm text-gray-300 hover:text-white">Products</a>
                </div>

            
                <div className="flex flex-col mb-6 md:mb-0">
                <h3 className="text-base underline text-white mb-2 font-bold">Contact</h3>
                <p className="text-sm text-gray-300">0966 842 0683</p>
                <a href="mailto:studioyappari@gmail.com"
                    className="text-sm text-gray-300 hover:text-white">studioyappari@gmail.com</a>
                </div>

            
                <div className="flex flex-col mb-6 md:mb-0">
                <h3 className="text-base underline text-white mb-2 font-bold">Address</h3>
                <p className="text-sm text-gray-300">218 Target Range Blvd.</p>
                <p className="text-sm text-gray-300">Pembo, Makati City</p>
                </div>

            
                <div className="flex flex-col">
                <h3 className="text-base underline text-white mb-2 font-bold">Privacy Policy</h3>
                <p className="text-sm text-gray-300">&copy; 2024. All rights reserved</p>
                <a href="#" className="text-sm text-gray-300 hover:text-white">privacy policy</a>
                </div>
            </div>



            </div>
        </footer>
        </div>
  )
}

export default Footer