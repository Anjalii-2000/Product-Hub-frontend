import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../LoginModal/LoginModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import sliderImg from "../../../assets/Images/sliderImg.jpg";
import slider2 from "../../../assets/Images/slider2.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const navigate = useNavigate();

  const requireAuth = (callback) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOpenLoginModal(true);
    } else {
      callback();
    }
  };

  return (
    <div className="w-[95%] mx-auto pt-[100px] mt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-2xl overflow-hidden"
      >
        <SwiperSlide>
          <div className="relative h-[50vh]">
            <img
              src={sliderImg}
              alt="slider"
              className="w-full h-full object-cover brightness-75"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <h5 className="text-white tracking-[3px] mb-2 uppercase">
                10% Off Your First Order
              </h5>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Fashionable Dress
              </h1>
              <button
                onClick={() => requireAuth(() => navigate("/shop"))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-[50vh]">
            <img
              src={slider2}
              alt="slider"
              className="w-full h-full object-cover brightness-75"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <h5 className="text-white tracking-[3px] mb-2 uppercase">
                10% Off Your First Order
              </h5>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Reasonable Price
              </h1>
              <button
                onClick={() => requireAuth(() => navigate("/shop"))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

     
      <LoginModal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        onLoginClick={() => navigate("/login")}
        onRegisterClick={() => navigate("/register")}
      />
    </div>
  );
};

export default Slider;