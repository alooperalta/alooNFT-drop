import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import {Collection} from '../typings'

type props = {
  collections: Collection[]
}

const Home = ({collections}: props) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col min-h-screen py-20 px-10 2xl:px-0">
      <Head>
        <title>aloo NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <a href="./nft/aloogangxpapafam"> */}
        {/* <h1 className='text-rose-400 text-4xl font-bold'>Hey Sonny, click on this text to go to the NFT Drop page :)</h1> */}
        {/* <div className='lg:col-span-4 bg-gradient-to-br from-cyan-500 to-rose-500'>
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
        </div> */}
      {/* </a> */}
      <h1 className='mb-10 text-4xl font-extralight '>The <span className='font-extrabold underline decoration-pink-600/50'>Aloogang</span> NFT Market Place</h1>
      <main className='bg-slate-100 p-10 shadow-xl shadow-rose-400/20 '>
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {collections.map(collection => (
            <Link href={`/nft/${collection.slug.current}`}>
            <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
              <img className='h-96 w-60 rounded-2xl object-cover' src={urlFor(collection.mainImage).url()} alt="mainImage" />

              <div className='p-5'>
                <h2 className='text-3xl'>{collection.title}</h2>
                <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    circleImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
     },
    },
  }`

  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    }
  }
}