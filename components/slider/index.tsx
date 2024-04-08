import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Image } from 'antd';
import React from 'react';
import Slider from 'react-slick';

interface Slide {
  image: string;
  text?:string;
}

interface MySliderProps {
  slides: Slide[];
}

const MySlider: React.FC<MySliderProps> = ({ slides }) => {
  return (
    <Slider
      slidesToShow={5}
      slidesToScroll={1}
      autoplay={true}
      speed={9100}
      cssEase={'linear'}
      pauseOnHover={false}
      className={'partners-slider'}
      prevArrow={<></>}
      nextArrow={<></>}
    >
      {slides.map((slide, index) => (
        <div className="outer" key={index}>
          <Image src={slide.image} alt={`Slide ${index}`} preview={false} />
        </div>
      ))}
    </Slider>
  );
};

export default MySlider;
