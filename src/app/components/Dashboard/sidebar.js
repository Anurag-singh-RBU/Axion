import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Sidebar = () => {
  return (
    <aside className='h-full bg-neutral-50 p-4 w-full border-r border-gray-100'>
        <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-blue-200 via-indigo-100 to-violet-100 p-[6px] rounded-lg">
            <div className="flex items-center bg-white/90 p-2 rounded-lg">
                <Image 
                    src="/logo.png" 
                    alt="Axion Logo" 
                    width={36} 
                    height={36} 
                    className="object-cover"
                />
                <Link 
                    href="/"
                    className={`
                        ml-3 
                        bg-gradient-to-r 
                        from-blue-500 via-purple-400 to-indigo-400 
                        bg-clip-text 
                        text-transparent 
                        font-bold 
                        font-JBM 
                        text-xl 
                        tracking-widest
                    `}
                >
                    AXION
                </Link>
            </div>
        </div>
    </aside>
  )
}
