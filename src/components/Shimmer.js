import React from 'react';

const ShimmerCard = () => {
    // Generate an array of random length between 2 and 9
    const shimmerCards = Array(Math.floor(Math.random() * 8) + 2).fill("");

    return (
        <>
            {shimmerCards.map((el, idx) => (
                <div
                    key={"shimmerCard" + idx}
                    className='h-96 py-4 hover:-translate-y-1 hover:scale-90 transition-all gap-2'
                >
                    <div className='animate-pulse bg-gradient-to-r from-slate-50 rounded-lg cursor-pointer h-72 w-32 my-5'></div>
                    <p className='animate-pulse bg-gradient-to-r from-white font-semibold text-xs rounded-lg line-clamp-2 w-40 h-4 my-2'></p>
                    <p className='animate-pulse bg-gradient-to-r from-white font-semibold text-xs rounded-lg h-3 w-[75%]'></p>
                </div>
            ))}
        </>
    );
};

const Shimmer = () => {
    const ShimmerCols = Array(4).fill("");
    return (
        
        <>
            {ShimmerCols.map((el,idx)=>(
                <div key={"shimmer" + idx} className="p-6 mx-auto w-[93%] bg-black">
                    <h1 className='animate-pulse bg-gradient-to-r from-slate-100 text-2xl font-bold my-1 h-7 w-[60%]'></h1>
                    <div className='flex justify-start items-start gap-3 overflow-x-scroll w-full no-scrollbar-custom'>
                        <ShimmerCard />
                    </div>
                </div>

            ))
        }
        </>
    );
};

export default Shimmer;
