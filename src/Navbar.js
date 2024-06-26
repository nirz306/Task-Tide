import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center p-4 md:space-x-[400px] w-max max-md:space-x-[200px]">
        <h1 className="text-2xl font-extrabold text-rose-500 font-sans">Task Tide</h1>
        <div className="links flex space-x-6">
            <a href="/" className="relative group">
              <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
              <span className="relative z-10 transition-colors group-hover:text-white font-semibold">Home</span>
            </a>
            <a href="/create" className="relative group">
              <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
              <span className="relative z-10 transition-colors group-hover:text-white font-semibold">New Task</span>
            </a>
        </div>
    </div>
  )
}

export default Navbar
