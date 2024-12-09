import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { InView } from 'react-intersection-observer';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Event() {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    const [mobil4, GetMobile4] = useState(window.innerWidth < 547)
    useEffect(() => {
        const hundleSize = () => {
            GetMobile4(window.innerWidth < 547)
        }
        window.addEventListener('resize', hundleSize)
        return () => window.removeEventListener('resize', hundleSize)
    }, [])

    const [visibleItems, setVisibleItems] = useState([]);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
        };

        const handleIntersection = (position) => {
            setVisibleItems((prev) => [...prev, position]);
        };
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const position = parseInt(entry.target.getAttribute('data-position'), 10);
                    handleIntersection(position);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.blocks');

        elements.forEach((element) => {
            if (element instanceof Element) {
                intersectionObserver.observe(element);
                return () => {
                    intersectionObserver.unobserve(element);
                };
            }
        });

        return () => {
            intersectionObserver.disconnect();
        };
    }, []);

    const handleImageLoad = (position) => {
        setLoadedItems((prev) => [...prev, position]);
    };

    const [pageSize, setPageSize] = useState(5);
    const [evenements, setevenements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getAllevents?size=${pageSize}`);
                setevenements(response.data.evenements);
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
            }
        };

        fetchData();
    }, [pageSize]);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
    return (
        <div className="w-full flex flex-col items-center  mt-5 ">
            <div className="w-[97%] border flex flex-col  rounded-xl my-3  p-3 bg-gray-50">
                <div className="text-left w-full text-orange-700 text-[20px]  sm:text-[30px] font-serif border-b pb-2">
                    Parcourez nos évènement  populaire
                </div>
                <div className={`flex flex-wrap  justify-center`}>
                    {evenements.map((data, index) => (
                        index < 5 && <div data-position={index} key={index} className={` ${mobil4 ? 'w-full' : 'w-[18em]'} blocks bg-white mx-auto rounded-xl  overflow-hidden flex flex-col items-center mt-2`}>
                            <div className={`${mobil4 ? 'w-full h-max' : 'w-[16em] h-[16em]'} relative rounded-xl mt-2 overflow-hidden `}>
                                {
                                    youtubeRegex.test(data.video) ? (
                                        <ReactPlayer url={data.video}
                                            controls
                                            className="rounded-[100px] overflow-hidden inline object-cover object-center w-full h-full" />

                                    ) : (
                                        <>
                                            <InView className=' bg-red-600'>
                                                {({ inView, ref }) => (
                                                    <img
                                                        ref={ref}
                                                        alt='       '
                                                        src={inView && visibleItems.includes(index) ? `https://speedreal.abahs-jobconnect.com/uploads/evenements/${data.photo} ` : ''}
                                                        className="w-full h-full object-cover"
                                                        onLoad={() => handleImageLoad(index)} />
                                                )}
                                            </InView>
                                            {!loadedItems.includes(index) && (
                                                <div className={`absolute z-50 w-full bg-white  full h-full  top-0 ${mobil4 ? 'left-3 ' : 'left-0'}   flex items-center justify-center`}>
                                                    <FadeLoader
                                                        color="#36d7b7"
                                                        height={20}
                                                        width={mobil4 ? 3 : 5}
                                                        margin={mobil4 ? -3 : 3} />
                                                </div>
                                            )}
                                        </>
                                    )

                                }

                            </div>
                            <div className='w-full text-left p-2 text-gray-700 font-semibold text-[18px]'>{data.titre && (data.titre.length > 20 ? data.titre.slice(0, 20) + '...' : data.titre)}</div>
                            <div className='flex items-center text-slate-500 justify-start w-full pl2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>
                                <div className='text-left w-full  text-slate-500 text-xs p-2 max-sm:text-[11px] '>{formatDate(data.createdAt)}</div>
                            </div>
                            <Link to='/evenement' className='text-center block border border-orange-400 rounded-3xl max-sm:text-[11px] cursor-pointer hover:border-white hover:bg-orange-600 hover:text-white transition-all font-extrabold duration-500 text-orange-600 m-2 w-[90%] p-2'>En savoir plus</Link>
                        </div>
                    ))}
                </div>
                <div className='w-full flex justify-between px-2'>
                    <Link to='/evenement' className="text-orange-700 mt-4  sm:text-[20px] border font-bold border-orange-500 hover:scale-105  px-4 py-2 rounded-md cursor-pointer transition-all duration-500 w-max">
                        Voir plus événement
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Event
