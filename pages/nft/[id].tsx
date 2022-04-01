import Head from 'next/head'
import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { sanityClient, urlFor } from '../../sanity';
import type { GetServerSideProps, NextPage } from 'next'
import { Collection } from '../../typings';

interface Props {
    collection: Collection
}
function NFTDropPage({ collection }: Props) {

    //Auth 
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    //-----
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
        <Head>
            <title>aloo NFT Drop</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='lg:col-span-4 bg-gradient-to-br from-cyan-500 to-rose-500'> {/* Left Side */}
            <div className='bg-gradient-to-br from-cyan-800 to-rose-500 flex flex-col items-center justify-center lg:min-h-screen'>
                <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                    <img 
                        className='object-cover w-44 rounded-xl lg:h-96 lg:w-72'
                        src={urlFor(collection.previewImage).url()}
                        alt="Ape" 
                    />
                </div>
                <div className='p-5 text-center space-y-2'>
                    <h1 className='text-4xl font-bold text-white'>
                        Aloogang Apes 
                    </h1>

                    <h2 className='text-xl text-gray-300'>
                        A collection of Aloogang Apes who live & breathe React!
                    </h2>
                </div>
            </div>
        </div>

        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>   {/* Right Side */}
            {/* Header */}

            <header className='flex items-center justify-between'>
                <a href='/'><h1 className='w-52 cursor-pointer font-extralight sm:w-80 text-xl'>The <span className='font-extrabold underline decoration-pink-600/50'>Aloogang</span> NFT Market Place</h1></a>
                <button onClick={()=> {address? disconnect() : connectWithMetamask()}} className='rounded-full bg-rose-400 text-white px-4 py-2 text-xs lg:px-5 lg:py-3 lg:text-base'>
                    {!address?"Sign in":"Sign Out"}
                </button>
            </header>
            <hr className='my-2 border' />
            {address && <p className='text-center text-sm text-rose-400'>You're logged in with the wallet {address.substring(0,5)}...{address.substring(address.length -5 ,)}</p>}

            {/* Content */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center'>
                <img 
                    className='w-80 object-cover pb-10 lg:h-40'
                    src={urlFor(collection.mainImage).url()} 
                    alt="" 
                />
                <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                    {collection.title}
                </h1>
                <p className='pt-2 text-xl text-green-500'>
                    13 / 21 NFT's claimed
                </p>
            </div>
            {/* Mint Button */}
            <button className='h-16 w-full text-white bg-red-600 rounded-full font-bold'>
                Mint NFT (0.01 ETH)
            </button>
        </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const query = `*[_type == "collection" && slug.current == $id][0]{
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage{
            asset
        },
        previewImage{
            asset
        },
        slug{
            current
        },
        creator-> {
            _id,
            name,
            address,
            slug{
                current
            },
        },
    }`

    const collection = await sanityClient.fetch(query, {id: params?.id});

    if(!collection) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            collection,
        }
    }
}