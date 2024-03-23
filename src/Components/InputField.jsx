import React from 'react'

const InputField = ({ labelTop, label, name, id, type, placeholder, min, maxLength, value, onChange, onBlur, onInput, ref, checked }) => {
    return (

        <div>

            {
                labelTop ?

                    <div className='grid grid-rows-2 font-sans text-slate-600'>
                        <span className="text-lg text-left"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 sm:w-64 border border-slate-300 rounded text-black
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


                    <div className='font-sans text-slate-600'>
                        <span className="sm:text-md text-right mr-2"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 sm:w-52 border border-slate-300 rounded text-black
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