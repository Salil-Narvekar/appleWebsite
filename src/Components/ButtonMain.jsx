import React from 'react'

const ButtonMain = ({ buttonLable, name, onClick, disabled, size, color }) => {
    return (
        <div className='text-xs md:text-xs lg:text-sm cursor-pointer font-semibold'>
            <button
                className=
                {
                    size === "small" && color === "green" ?
                        "py-1 pl-2 pr-2  bg-green-600 text-white transition duration-500 ease-in-out hover:scale-95 hover:bg-green-800 hover:text-white rounded-lg sm:w-full w-full"
                        : size === "small" ?
                            "py-1 pl-2 pr-2 bg-cyan-700 text-slate-300 transition duration-500 ease-in-out hover:scale-95 hover:bg-cyan-900 hover:text-white rounded-lg sm:w-full w-full"
                            : color === "green" ?
                                "py-2 pl-4 pr-4 bg-green-600 text-white transition duration-500 ease-in-out hover:scale-95 hover:bg-green-800 hover:text-white rounded-lg sm:w-full w-full"
                                : color === "red" ?
                                    "py-2 pl-4 pr-4 bg-red-800 text-white transition duration-500 ease-in-out hover:scale-95 hover:bg-red-900 hover:text-white rounded-lg sm:w-full w-full"
                                    :
                                    "py-2 pl-4 pr-4 bg-cyan-700 text-slate-300 transition duration-500 ease-in-out hover:scale-95 hover:bg-cyan-900 hover:text-white rounded-lg sm:w-full w-full"
                }

                name={name}
                onClick={onClick}
                disabled={disabled}
                size={size}
            >
                {buttonLable}
            </button>
        </div>
    )
}

export default ButtonMain