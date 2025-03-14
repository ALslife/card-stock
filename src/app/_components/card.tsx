import React from 'react'

interface CardProps {
    ImgUrl: string; 
}

const Card: React.FC<CardProps> = ({ ImgUrl }) => {
  return (
    <img src={ImgUrl} alt="" className='border-radius rounded-lg' loading="lazy"/>
  )
}

export default Card;