import React from 'react'
import Loader from './Loader';


const LoadingPlate = () => {
    return (
        <div className='grid gap-2 mt-2'>

            <div className="shadow p-4 w-full mx-auto rounded-lg bg-slate-200 sm:h-24 transition duration-500 ease-in-out hover:scale-95 shadow-md">
                <div className="animate-pulse flex space-x-5">

                    <span className='mt-2 text-sm font-semibold'>
                        <Loader />
                        <span className='text-cyan-900'>Fetching list...</span>
                    </span>

                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-2 bg-slate-500 rounded"></div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-500 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow p-4 w-full mx-auto rounded-lg bg-slate-100 sm:h-24 transition duration-500 ease-in-out hover:scale-95 shadow-md">
                <div className="animate-pulse flex space-x-5">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-2 bg-slate-500 rounded"></div>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-500 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingPlate