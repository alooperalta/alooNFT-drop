import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { sanityClient, urlFor } from '../../sanity';
import type { GetServerSideProps, NextPage } from 'next'
import { Collection } from '../../typings';
import { BigNumber } from 'ethers';
import toast, {Toaster} from 'react-hot-toast'
interface Props {
    collection: Collection
}
function NFTDropPage({ collection }: Props) {

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<BigNumber>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [priceInEth, setPriceInEth] = useState<String>();
    const nftDrop = useNFTDrop(collection.address);

    useEffect(() => {
        if(!nftDrop) return;

        const fetchPrice =async () => {
            const claimConditions = await nftDrop.claimConditions.getAll();
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
        }
        fetchPrice();
    }, [nftDrop])

    useEffect(() => {
        if(!nftDrop) return;

        const fetchNFTDropData = async () => {
            setIsLoading(true);
            const claimed = await nftDrop.getAllClaimed();
            const total = await nftDrop.totalSupply();

            setClaimedSupply(claimed.length);
            setTotalSupply(total)
            setIsLoading(false);
        }
        fetchNFTDropData();
    }, [nftDrop])
    
    const mintNFT = () => {
        if(!nftDrop || !address) return;

        setIsLoading(true);
        const notification = toast.loading('Minting NFTs...', {
            style:{
                background: 'white',
                color: 'green',
                fontSize: '17px',
                padding: '20px',
            }
        })
        const quantity = 1;
        nftDrop.claimTo(address, quantity).then( async (tx) => {
            const receipt = tx[0].receipt;
            const claimedTokenId = tx[0].id;
            const claimedNFT = await tx[0].data();

            console.log(claimedNFT);
            console.log(claimedTokenId);
            console.log(receipt);
            // toast('Yayy! You minted an NFT!', {
            //     duration: 8000,
            //     style:{
            //         background: 'green',
            //         color: 'white',
            //         fontSize: '17px',
            //         padding: '20px',
            //         fontWeight: 'bolder'
            //     }
            // })

            toast((t) => (
                <span>
                  <img src={claimedNFT.metadata.image} alt="Minted NFT" /> 
                  Successfully Minted! 
                </span>
              ), {
                duration: 8000,
                style:{
                    background: 'white',
                    color: 'green',
                    fontSize: '17px',
                    padding: '20px',
                    fontWeight: 'bolder'
                }});
        })
        .catch((error) => {
            console.log(error);
            toast('Oops! Something went wrong!', {
                style:{
                    background: 'red',
                    color: 'white',
                    fontSize: '17px',
                    padding: '20px',
                    fontWeight: 'bolder'
                }
            })
        })
        .finally(() => {
            setIsLoading(false);
            toast.dismiss(notification)
        });
    }

    //Auth 
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    //-----
  return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
        <Toaster position='bottom-right'/>
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
                {!isLoading
                    ?
                        <p className='pt-2 text-xl text-green-500'>
                            {claimedSupply} / {totalSupply?.toString()} NFTs claimed
                        </p>
                    :
                        <p className='animate-bounce pt-5 text-xl text-green-500'>Loading Supply...</p>
                }

                {isLoading && <img className='h-40 w-80 object-contain' src='/loaderGIF.gif' alt='Loading...' />}
            </div>
            {/* Mint Button */}
            <button onClick={mintNFT} disabled={isLoading || claimedSupply == totalSupply?.toNumber() || !address} className='disabled:bg-gray-400 h-16 w-full text-white bg-red-600 rounded-full font-bold'>
                {isLoading? (<>Loading...</>) : (claimedSupply == totalSupply?.toNumber()? (<>Sold Out!</>) : (!address?(<>Sign in to Mint</>):(<span className='font-bold'>Mint NFT {priceInEth} ETH</span>)))}
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