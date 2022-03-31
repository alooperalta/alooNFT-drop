import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Aloo NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a href="./nft/aloogangxpapafam">
        {/* <h1 className='text-rose-400 text-4xl font-bold'>Hey Sonny, click on this text to go to the NFT Drop page :)</h1> */}
        

        <Head>
            <title>Aloo NFT Drop</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='lg:col-span-4 bg-gradient-to-br from-cyan-500 to-rose-500'> {/* Left Side */}
            <div className='bg-gradient-to-br from-cyan-800 to-rose-500 flex flex-col items-center justify-center lg:min-h-screen'>
                <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                    <img 
                        className='object-cover w-44 rounded-xl lg:h-96 lg:w-72'
                        src="/nftpanda.png" 
                        alt="Ape" 
                    />
                </div>
                <div className='p-5 text-center space-y-2'>
                    <h1 className='text-4xl font-bold text-white'>
                        Aloogang Pandas
                    </h1>

                    <h2 className='text-xl text-gray-300'>
                        A collection of Aloogang Pandas who live & breathe React!
                    </h2>
                </div>
                <button className='mt-4 h-16 w-full max-w-lg text-white bg-red-600 rounded-full font-bold'>
                    Mint NFTs
                </button>
            </div>
        </div>
      </a>
    </div>
  )
}

export default Home
