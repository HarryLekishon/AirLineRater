import React from 'react'
import styled from 'styled-components'
import './airline.css'

function Header(props) {
    const { name, image_url, avg_score} = props.attributes
    const total = props.reviews.length
  return (
    <div className='wrapper'>
    <h1><img src={image_url} alt={name} />{name}</h1>
    <div>
        <div className='totalReviews'>{total} User Reviews</div>
        <div className='startRating'></div>
        <div className='totaloutOf'>{avg_score} out of 5</div>
    </div>
    </div>
  )
}

export default Header
