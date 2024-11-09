import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
      <Image
        src="/assets/icons/logo-full.svg"
        height={200}
        width={200}
        alt="logo"
        className="mb-12"
      />
    </div>
  )
};

export default Header