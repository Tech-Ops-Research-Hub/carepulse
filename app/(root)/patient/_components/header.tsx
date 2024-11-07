import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <Image
        src="/assets/icons/logo-full.svg"
        height={1000}
        width={1000}
        alt="patient"
        className="mb-12 h-10 w-fit"
      />
    </div>
  )
};

export default Header