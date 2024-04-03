import React from 'react'

const NavContent = ({ title, onClick, selectedContent }) => {
    return (
        <div onClick={onClick}>
            <p className={'sm:text-lg text-slate-100 font-bold mb-2 py-1 border-b border-slate-400 rounded-md transition duration-500 ease-in-out hover:scale-95 cursor-pointer hover:translate-x-2'}>
                {title}
            </p>
        </div>
    )
}

export default NavContent