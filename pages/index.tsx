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
        <h1 className='text-rose-400 text-4xl font-bold'>Hey Sonny, click on this text to go to the NFT Drop page :)</h1>
      </a>
    </div>
  )
}

export default Home
