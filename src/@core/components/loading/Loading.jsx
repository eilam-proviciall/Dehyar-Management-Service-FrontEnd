import React from 'react'

const Loading = () => {
    return (
        <div className='flex h-full w-full justify-center items-center'>
            <img className='w-[15%]' src="/images/icons/spier.svg" alt="در حال بارگذاری..." />
        </div>
    );
}

export default Loading