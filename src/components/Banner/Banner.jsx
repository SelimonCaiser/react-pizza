import React from 'react'
import'./Banner.scss'

const Banner = ({img}) => {
  return (
    <div className={'banner'}>
        <img className='banner__image' src={img} alt="banner"/>
    </div>
  )
}

export default Banner