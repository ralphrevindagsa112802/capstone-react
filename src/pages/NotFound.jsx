import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen font-bold text-2xl text-black'>
        404 Not Found

        <Link to="/" className='font-bold text-2xl text-[#1C359A]'>Home</Link>
    </div>
  )
}

export default NotFound