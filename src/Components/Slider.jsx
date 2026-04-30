import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Slider = ({ reviewData }) => {
  return (
    <div>
      <Swiper 
        spaceBetween={30}
        slidesPerView={3}
      >
        {reviewData?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="pb-3 m-4 px-3 border border-gray-200 shadow shadow-gray-200 rounded-2xl bg-white">

              <p className="font-semibold text-left text-gray-400 text-[19px] m-2">
                👥 {review.reviewerName}
              </p>

              <p className="font-thin text-left text-black text-[14px]">
                {review.reviewerEmail}
              </p>

              <div className="flex justify-start mt-2 mb-4">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-semibold"
                  style={{
                    backgroundColor: review.rating >= 3 ? "green" : "orange",
                  }}
                >
                  {review.rating}★
                </span>
              </div>

              <p className="text-black text-[20px] text-left mt-4 p-1">
                {review.comment}
              </p>

              <p className="text-gray-400 text-[13px] text-right m-1 p-1">
                {review.date}
              </p>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Slider;