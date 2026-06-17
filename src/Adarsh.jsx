import React from 'react'

function Adarsh(props) {
  return (
    <div className="Adarsh-info">
      <h2> Name:{props.name}</h2>
      <p> Course:{props.course}</p>
      <p> Marks:{props.marks}</p>
    </div>
  )
}

export default Adarsh


