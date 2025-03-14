import UserNavbar from '../components/UserNavbar'
import Footer from '../components/Footer'
import '../css/Home.css'
import React, { useEffect, useState } from "react";


const UserHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to track screen size and collapsed state
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle window resize and set appropriate states
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);

      // Only auto-collapse on small screens on initial load
      if (smallScreen && !isCollapsed && !document.hasOwnProperty('_feedbackExpanded')) {
        setIsCollapsed(true);
      } else if (!smallScreen) {
        // Auto-expand on larger screens
        setIsCollapsed(false);
      }
    };

    // Set initial states
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  // Function to toggle collapsed state
  const toggleCollapsed = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsCollapsed(!isCollapsed);
    // Mark that the user has explicitly toggled the feedback panel
    document._feedbackExpanded = true;
  };

  // Stop propagation for panel clicks
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };



  // Fetch user data to get names and profile pictures
  useEffect(() => {
    // First, fetch all users to create a lookup table
    fetch("https://yappari-coffee-bar.shop/api/getUser.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Create a lookup object with user_id as key
          const userLookup = {};
          data.users.forEach((user) => {
            userLookup[user.id] = user;
          });
          setUsers(userLookup);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Fetch feedback data
  useEffect(() => {
    setLoading(true);
    fetch("https://yappari-coffee-bar.shop/api/get_positive_feedback.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        if (data.success) {
          // Convert to array if it's not already
          const feedbackArray = Array.isArray(data.feedbacks)
            ? data.feedbacks
            : Object.values(data.feedbacks);

          setFeedbacks(feedbackArray);
        } else {
          setError(data.message || "Unknown error occurred");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Get the full user name
  const getFullName = (userId) => {
    if (users[userId]) {
      return `${users[userId].f_name} ${users[userId].l_name}`;
    }
    return "Anonymous";
  };

  // Get the profile image URL
  const getProfileImage = (userId) => {
    if (users[userId] && users[userId].profile_pic && users[userId].profile_pic !== "NULL") {
      return `https://yappari-coffee-bar.shop/${users[userId].profile_pic}`;
    }
    return null;
  };

  // Get the first letter for avatar placeholder
  const getInitial = (userId) => {
    if (users[userId] && users[userId].f_name) {
      return users[userId].f_name.charAt(0).toUpperCase();
    }
    return String(userId).charAt(0).toUpperCase();
  };

  return (
    <div className="md-overflow-y-hidden bg-[#DCDEEA] max-w-[100vw]">
      <img
        src="/img/coffee spill.png"
        className="absolute top-[50%] sm:top-[60%] md:top-[70%] left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 
    w-[100vw] sm:w-[100vw] md:w-[100vw] lg:w-[100vw] 
    h-auto object-cover z-0"
        alt="coffee background"
      />
      <UserNavbar></UserNavbar>

      {/**user positive feedback */}
      <div className={`fixed z-50 transition-all duration-300 ${isCollapsed
        ? 'bottom-4 left-4 w-12 h-12'
        : 'bottom-4 left-4 sm:bottom-6 sm:right-6 md:bottom-10 md:left-10 w-full max-w-xs sm:max-w-sm md:w-56'
        }`}
      >
        {isSmallScreen && isCollapsed && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all"
              aria-label="Show feedback"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>
        )}

        {/* Show the feedback panel when not collapsed or on larger screens */}
        {/* Only show the icon button on small screens when collapsed */}
        {isSmallScreen && isCollapsed && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={toggleCollapsed}
              className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all"
              aria-label="Show feedback"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </button>
          </div>
        )}

        {/* Show the feedback panel when not collapsed or on larger screens */}
        {(!isSmallScreen || !isCollapsed) && (
          <div
            className="fixed z-50 bg-white shadow-lg rounded-2xl p-4 
                    bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:left-10 
                    w-full max-w-xs sm:max-w-sm md:w-56"
            onClick={handlePanelClick} // Add click handler to prevent propagation
          >
            {/* Close button - only on small screens */}
            {isSmallScreen && (
              <button
                onClick={toggleCollapsed}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close feedback"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <h2 className="text-sm font-semibold text-center text-blue-700 mb-3">
              What are you waiting for?<br /> Come and get your coffee now!
            </h2>

            <div className="mt-2 space-y-3 overflow-y-auto max-h-48 md:max-h-42">
              {loading ? (
                <p className="text-gray-500 text-center py-2">Loading feedback...</p>
              ) : error ? (
                <p className="text-red-500 text-center text-sm py-2">{error}</p>
              ) : feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <div
                    key={feedback.orders_id || index}
                    className="flex items-center bg-white shadow-md p-3 rounded-xl"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{getFullName(feedback.user_id)}</p>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{feedback.order_feedback}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-2">No feedback available</p>
              )}
            </div>
          </div>
        )}
      </div>

      <main className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 w-full">

        <section className="w-full px-4 sm:px-6 md:px-8 overflow-hidden ">
          <div className="header flex flex-col items-center text-center py-2 sm:py-4 md:py-6 lg:py-8 relative">    {/* Header info - stack on mobile, flex on larger screens */}
            <div className="text-[#1C359A] text-xs sm:text-sm w-full mb-4">
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 md:space-x-8 lg:space-x-16 xl:space-x-32">
                <div className="mb-2 sm:mb-0">No Lines, Just Good Coffee</div>
                <div>Monday - Sunday 10:00 AM - 2:00 AM</div>
              </div>
            </div>

            <div className="title px-2">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1C359A] mb-2">
                Brewed Fresh, Ready to Go
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#000000]">
                Anytime, Anywhere!
              </div>
            </div>

            <button className="mt-4 sm:mt-6 mb-4 sm:mb-6 bg-[#ffffff] text-xs sm:text-sm font-semibold text-[#1C359A] py-2 sm:py-3 px-6 sm:px-10 rounded-full shadow-lg hover:bg-[#1C359A] hover:text-[#ffffff] cursor-pointer">
              ORDER NOW
            </button>

            {/* Image container with responsive heights */}
            <div className="relative w-full h-64 sm:h-96 md:h-[450px] lg:h-[550px] flex justify-center items-center">
              {/* Plate Image - Back Layer */}
              <img
                src="/img/plate.png"
                className="absolute bottom-[-20%] sm:bottom-[-30%] md:bottom-[-40%] lg:bottom-[-50%] w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-[800px] z-10 opacity-100"
                style={{ animation: "spin 10s linear infinite" }}
                alt="plate"
              />

              {/* Drink Image - Front Layer */}
              <img
                src="/img/frontdrink.png"
                className="absolute top-[5%] sm:top-[10%] md:top-[15%] left-1/2 transform -translate-x-1/2 w-[60%] sm:w-[50%] md:w-[40%] lg:w-[35%] max-w-[350px] z-20 animate-tilt-float"
                alt="Floating Drink"
              />
            </div>
          </div>
        </section>

        <section className="relative bg-white w-full h-auto flex flex-col justify-center items-center text-center py-6 z-10 px-2 sm:px-4 md:px-6 overflow-hidden">
          <div className="text-4xl sm:text-5xl font-black text-[#1C359A]">Welcome to Yappari!</div>
          <div className="lines mt-4">
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="mt-4 px-4 max-w-2xl">
            We are YCB! Our goal is to bring smile on your face with just one sip of our freshly brewed coffee.
          </div>

          <div id="best-seller" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4 w-full max-w-7xl">
            {/* Card 1 */}
            <div id="card1" className="bg-[#DCDEEA] flex flex-col pt-4 rounded-lg shadow-lg">
              <div className="justify-center flex items-center px-4">
                <img
                  src="/img/CLASSIC COFFEES/Cafe Vienna.jpg"
                  alt="Cafe Vienna"
                  className="w-full max-w-[213px] h-48 rounded-md object-cover"
                />
              </div>

              <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                <div className="text-[#1C359A] font-bold flex">Cafe Vienna</div>
                <div className="text-justify opacity-55">
                  Viannese Coffee that serves Americano topped with a heavy whipped
                  cream. Dashed with cocoa powder
                </div>

                <div className="flex flex-row-reverse justify-between mt-auto items-center pt-4">
                  <div className="price text-sm font-semibold">₱130 - ₱140</div>
                  <button
                    className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                    onClick={() => console.log('Add to cart')}>
                    <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div id="card2" className="bg-[#DCDEEA] flex flex-col pt-4 rounded-lg shadow-lg">
              <div className="justify-center flex items-center px-4">
                <img
                  src="/img/katsudon.jpg"
                  alt="Pork Katsudon"
                  className="w-full max-w-[213px] h-48 rounded-md object-cover"
                />
              </div>

              <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                <div className="text-[#1C359A] font-bold flex">Pork Katsudon</div>
                <div className="text-justify opacity-55">
                  Fried panko-breaded pork cutlet with egg cooked in japanese soy sauce over rice.
                </div>

                <div className="flex flex-row-reverse justify-between pt-4 top-0 mt-auto items-center">
                  <div className="price text-sm font-semibold">₱120</div>
                  <button
                    className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                    onClick={() => console.log('Add to cart')}>
                    <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div id="card3" className="bg-[#DCDEEA] flex flex-col pt-4 rounded-lg shadow-lg">
              <div className="justify-center flex items-center px-4">
                <img
                  src="/img/CLASSIC COFFEES/Caramel Macchiato.jpg"
                  alt="Caramel Macchiato"
                  className="w-full max-w-[213px] h-48 rounded-md object-cover"
                />
              </div>

              <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                <div className="text-[#1C359A] font-bold flex">Caramel Macchiato</div>
                <div className="text-justify opacity-55">
                  Milk espresso-based coffee with use of freshly steamed milk, caramel syrup and caramel drizzle on top.
                </div>

                <div className="flex flex-row-reverse justify-between mt-auto pt-4 items-center">
                  <div className="price text-sm font-semibold">₱125 - 135</div>
                  <button
                    className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                    onClick={() => console.log('Add to cart')}>
                    <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div id="card4" className="relative bg-[#DCDEEA] flex flex-col pt-4 rounded-lg shadow-lg">
              <div className="justify-center flex items-center px-4">
                <img
                  src="/img/2022-11-21 (2).jpg"
                  alt="Seafood Pasta"
                  className="w-full max-w-[213px] h-48 rounded-md object-cover"
                />
              </div>

              <div className="bg-white rounded-md h-full w-full mt-4 p-5 flex flex-col">
                <div className="text-[#1C359A] font-bold flex">Seafood Pasta</div>
                <div className="text-justify opacity-55">
                  A tomato based pasta that is served with shrimp.
                </div>

                <div className="flex flex-row-reverse justify-between items-center mt-auto pt-4">
                  <div className="price text-sm font-semibold">₱160</div>
                  <button
                    className="bg-[#DCDEEA] text-[#1C359A] text-sm font-bold py-2 px-6 rounded flex items-center gap-2"
                    onClick={() => console.log('Add to cart')}>
                    <img src="/img/cart.png" alt="Add Icon" className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-8 bg-[#1C359A] text-sm font-semibold text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700">
            More
          </button>
        </section>



        <section class="relative bg-white h-auto text-center py-6 mt-12 w-full px-2 sm:px-4 md:px-6 overflow-hidden">
          <div class="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C359A]">Why Yappari Coffee Bar?</div>

          <div class="flex flex-col md:flex-row justify-center mt-6 max-w-6xl mx-auto">
            <div class="hidden md:block md:w-1/3 lg:w-2/5">
              <img src="/img/pngwing.com (2).png" alt="Coffee illustration" class="max-w-full" />
            </div>

            <div class="flex flex-col justify-center mt-4 md:mt-0 md:ml-6 text-left w-full md:w-2/3 lg:w-3/5 space-y-4">
              <div class="p-2 border-l-4 border-[#1C359A] pl-4">
                <div class="text-[#1C359A] text-lg font-bold">QUALITY COFFEE</div>
                <p class="text-sm">
                  Experience our passion for coffee firsthand, with <span class="text-[#1C359A] font-bold">unique flavors and a warm ambiance</span> that make us the perfect spot for every coffee lover.
                </p>
              </div>

              <div class="p-2 border-l-4 border-[#1C359A] pl-4">
                <div class="text-[#1C359A] text-lg font-bold">ELEVATE YOUR MEAL</div>
                <p class="text-sm">
                  Not just coffee—savor our delicious rice meals, featuring authentic <span class="text-[#1C359A] font-bold">Japanese cuisine</span> and other mouthwatering options that perfectly complement your brew!
                </p>
              </div>

              <div class="p-2 border-l-4 border-[#1C359A] pl-4">
                <div class="text-[#1C359A] text-lg font-bold">RELAX AND RECHARGE: YOUR COZY COFFEE OASIS!</div>
                <p class="text-sm">
                  Join us for a delightful coffee experience in our <span class="text-[#1C359A] font-bold">cozy haven</span>, designed to help you relax, recharge, and savor every sip.
                </p>
              </div>

              <div class="p-2 border-l-4 border-[#1C359A] pl-4">
                <div class="text-[#1C359A] text-lg font-bold">SAFE SPACE CERTIFIED</div>
                <p class="text-sm">
                  This establishment has completed <span class="text-[#1C359A] font-bold">SOGIESC Inclusivity Training</span> with <span class="text-[#1C359A] font-bold">Queer Safe Spaces, Inc.</span>
                </p>
                <div class="text-[#1C359A] text-sm font-bold mt-2">
                  <a href="#" class="hover:underline">see more...</a>
                </div>
              </div>
            </div>
          </div>

          <button class="mt-8 bg-[#1C359A] text-sm font-semibold text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-700">
            About Us
          </button>
        </section>

        <section className="bg-white h-auto text-center py-6 mt-12 w-full px-2 sm:px-4 md:px-6 overflow-hidden">
          <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C359A] mb-6">Find Us & Our Hours</div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Content column */}
            <div className="flex flex-col text-center md:text-left justify-center max-w-md space-y-6 order-2 md:order-1">
              <div className="space-y-2">
                <div className="text-[#1C359A] text-lg font-bold">Location?</div>
                <p className="text-sm sm:text-base">Visit us at 218 Target Range Blvd, Pembo, Makati City – your cozy coffee haven awaits!</p>
              </div>

              <div className="space-y-2">
                <div className="text-[#1C359A] text-lg font-bold">Coffee Hours?</div>
                <p className="text-sm sm:text-base">We're open Monday to Sunday. Our operation starts from 10 AM and closes at 2 AM.</p>
              </div>
            </div>

            {/* Image column */}
            <div className="order-1 md:order-2 w-full md:w-auto flex justify-center">
              <img className="h-64 sm:h-80 md:h-96 object-contain" src="/img/pngwing.com (6).png" alt="" />
            </div>
          </div>
        </section>

      </main>
      <Footer></Footer>
    </div>
  )
}

export default UserHome