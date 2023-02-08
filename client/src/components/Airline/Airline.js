import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from "react-router-dom";
import Header from './Header';
import styled from 'styled-components'
import ReviewForm from './ReviewForm';
import Review from './Review';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: -8px;
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll; 

  &::-webkit-scrollbar {
    display: none;
  }

  &:last-child {
    background: #000
  }
`

const Column1 = styled.div`
  background: #fff;
  height: 100vh;
  overflow: hidden;

  &:last-child {
    background: #000
  }
`
const Main = styled.div`
  padding-left: 50px;
`

function Airline(props) {

  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({}) 
  const [loaded, setLoaded] = useState(false)
  const slug = useParams().slug;

  useEffect(()=> {
    // const slug = props.match.params.slug
    
    axios.get(`/api/v1/airlines/${slug}`)
    .then( (resp)  => {
      setAirline(resp.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp) )
  }, [])

  const handleChange = (e) => {
    e.preventDefault();

    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

    console.log('review:', review)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // const csrfToken = document.querySelector('[name=csrf-token]').content
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id
    axios.post('/api/v1/reviews', {review, airline_id})
    .then(resp => {
      const included  = [...airline.included, resp.data.data]
      setAirline({...airline, included})
      setReview({title: '', description: '', score: 0})

    })
    .catch(resp => {})
  }

  const setRating = (score, e) => {
    e.preventDefault();
    
    setReview({...review, score})
  }
  
  let reviews
  if(loaded && airline.included) {
    reviews = airline.included.map( (item, index) => {
      return (
        <Review
          key={index}
          attributes={item.attributes}
        />
      )
    })
  }
  return (
    <Wrapper>
      
      { loaded &&
      <Fragment>
      <Column>
        <Main>
        

        <Header
          attributes={airline.data.attributes}
          reviews={airline.included}
        />

        {reviews}
        </Main>   
      </Column>
      <Column1>
        <ReviewForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setRating={setRating}
          attributes={airline.data.attributes}
          review={review}
        />
      </Column1>
      </Fragment>
}
    </Wrapper>
  )
}

export default Airline
