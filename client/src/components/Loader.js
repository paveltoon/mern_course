import React from 'react'

export const Loader = () => {
  return (
    <div className="spinner-layer spinner-red" style={{display: 'flex', justifyContent: 'center', paddingTop: '2rem'}}>
    <div className="circle-clipper left">
      <div className="circle"></div>
    </div><div className="gap-patch">
      <div className="circle"></div>
    </div><div className="circle-clipper right">
      <div className="circle"></div>
    </div>
  </div>
  )
}