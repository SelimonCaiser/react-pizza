import React, { useState } from 'react';
import drinks from '../img/drinks.jpg'

const Background = () => {
  const [imageUrl, setImageUrl] = useState('../img/background.png');

  const changeBackground = () => {
    // Генерируем случайный путь к изображению
    const randomImage = '../img/drinks.jpg';
    setImageUrl(randomImage);
  };

  return (
    <div >
    </div>
  );
};

export default Background;
