import React from 'react'

const ErrorPage = () => {
  return (
    <div>
      <div className=" absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      <div className=" border border-zinc-400 p-3 rounded-lg">
        <h1 className='text-[9vw] -my-7 font-extrabold text-center'>404</h1>
        <p className='text-center font-bold text-3xl mb-3'>Not Found</p>
        <p className='capitalize font-bold text-2xl text-center'>the resouce requested could not be found on this server !</p>
      
      
      </div>
      </div>
    </div>
  )
}

export default ErrorPage
