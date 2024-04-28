import React from 'react'

const InputField = ({ labelTop, label, name, id, type, placeholder, min, maxLength, value, onChange, onBlur, onInput, ref, checked }) => {
    return (

        <div>

            {
                labelTop ?

                    <div className='grid grid-rows-2 font-sans text-slate-600'>
                        <span className="text-sm md:text-base lg:text-lg text-left"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 w-50 md:w-54 lg:w-64 border border-slate-300 rounded text-black
                            transition duration-500 ease-in-out hover:scale-95 text-slate-600 font-semibold"
                            name={name}
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            min={min}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            onInput={onInput}
                            ref={ref}
                            maxLength={maxLength}
                            checked={checked}
                        />
                    </div>

                    :


                    <div className='font-sans text-slate-600 text-xs md-text-sm lg:text-base'>
                        <span className="text-right mr-2"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 w-full md:w-full lg:w-52 border border-slate-300 rounded text-black
                            transition duration-500 ease-in-out hover:scale-95 text-slate-600 font-semibold"
                            name={name}
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            min={min}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            onInput={onInput}
                            ref={ref}
                            maxLength={maxLength}
                        />
                    </div>
            }
        </div>
    )
}

export default InputField