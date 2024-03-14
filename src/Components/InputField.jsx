import React from 'react'

const InputField = ({ labelTop, label, name, id, type, placeholder, min, maxLength, value, onChange, onBlur, onInput, ref, checked }) => {
    return (

        <div>

            {
                labelTop ?

                    <div className='grid grid-rows-2 font-sans'>
                        <span className="text-lg text-left"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 sm:w-64 border border-slate-300 rounded text-black
                        transition duration-500 ease-in-out hover:scale-95"
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


                    <div className='grid sm:grid-cols-2 gap-2 font-sans'>
                        <span className="text-lg sm:text-right"><b>{label}:</b></span>

                        <input
                            className="py-1 pl-2 sm:w-64 border border-slate-300 rounded text-black
                        transition duration-500 ease-in-out hover:scale-95"
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