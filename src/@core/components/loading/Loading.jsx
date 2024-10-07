import React from 'react'

const Loading = () => {
    return (
        <div className='flex h-full w-full justify-center items-center'>
            <img className='w-[25%]' src="/images/icons/logo-spiner.svg" alt="در حال بارگذاری..." />
        </div>
    );
}

export default Loading