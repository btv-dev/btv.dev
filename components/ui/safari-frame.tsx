import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import type { SVGProps } from 'react'
import { ChevronLeft, ChevronRight, Copy, Plus, Search } from 'lucide-react'

export interface SafariProps {
  src: StaticImport
  urlText: string
  width?: number
  height?: number
  svgProps?: Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>
  imageProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'alt'>
}

export function SafariFrame({ src, urlText, width = 1200, height = 680, svgProps, imageProps }: SafariProps) {
  return (
    <div className="w-full">
      <section className="shadow-xl rounded-md bg-white w-full">
        <header className="flex justify-between items-center py-1 px-5">
          <div className="flex flex-row items-center">
            <div className="bg-red-400 text-white rounded-full p-1 mr-2 cursor-pointer size-2" />
            <div className="bg-yellow-400 text-white rounded-full p-1 mr-2 cursor-pointer size-2" />
            <div className="bg-green-400 text-white rounded-full p-1 mr-5 cursor-pointer size-2" />
            
            <div className="flex flex-col justify-center items-center p-1 m-1 rounded-full text-gray-400">
              <ChevronLeft className="size-4" {...svgProps} />
            </div>
            
            <div className="flex flex-col justify-center items-center p-1 m-1 rounded-full text-gray-400">
              <ChevronRight className="size-4" {...svgProps} />
            </div>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="size-4" {...svgProps} />
            </div>
            <input
              type="text"
              value={urlText}
              readOnly
              className="bg-gray-100 placeholder-gray-400 text-gray-400 text-sm py-1 pl-10 pr-4 rounded-md outline-none w-full"
            />
          </div>
          
          <div className="flex flex-row items-center text-gray-400">
            <div className="flex flex-col justify-center items-center p-1 m-1 rounded-full">
              <Copy className="size-4" {...svgProps} />
            </div>
            
            <div className="flex flex-col justify-center items-center p-1 m-1 rounded-full">
              <Plus className="size-4" {...svgProps} />
            </div>
          </div>
        </header>
        
        <main className="rounded-b-md overflow-hidden">
          <Image
            src={src}
            alt={urlText}
            width={width}
            height={height}
            className="w-full object-cover"
            placeholder='blur'
            {...imageProps}
          />
        </main>
      </section>
    </div>
  )
}

export default SafariFrame