import React from 'react'

const ButtonMain = ({ buttonLable, name, onClick, disabled, size, color }) => {
    return (
        <div>
            <button
                className=
                {
                    size === "small" && color === "green" ?
                        "py-1 pl-2 pr-2 bg-gradient-to-r from-green-700 to-green-500 text-white text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white cursor-pointer rounded-lg sm:w-full w-full font-semibold"
                        : size === "small" ?
                            "py-1 pl-2 pr-2 bg-gradient-to-r from-indigo-950 to-cyan-700 text-slate-300 text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white cursor-pointer rounded-lg sm:w-full w-full font-semibold"
                            : color === "green" ?
                                "py-2 pl-4 pr-4 bg-gradient-to-r from-green-700 to-green-500 text-white text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white cursor-pointer rounded-lg sm:w-full w-full font-semibold"
                                : color === "red" ?
                                    "py-2 pl-4 pr-4 bg-gradient-to-r from-red-800 to-red-700 text-white text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white cursor-pointer rounded-lg sm:w-full w-full font-semibold"
                                    :
                                    "py-2 pl-4 pr-4 bg-gradient-to-r from-indigo-950 to-cyan-700 text-slate-300 text-sm transition duration-500 ease-in-out hover:scale-95 hover:bg-gradient-to-l hover:text-white cursor-pointer rounded-lg sm:w-full w-full font-semibold"
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