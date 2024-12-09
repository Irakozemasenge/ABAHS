
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player';
import Adresse from '../Adresse/Adresse';
import axios from 'axios';


function EvenementVoirPlusl() {

    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    const [mobile1, setMobille1] = useState(window.innerWidth < 1178);
    const [mobile2, setMobille2] = useState(window.innerWidth < 627);
    const [mobile3, setMobille3] = useState(window.innerWidth < 517);
    const [mobile4, setMobille4] = useState(window.innerWidth < 400);
    const [mobile5, setMobille5] = useState(window.innerWidth < 475);
    useEffect(() => {
        const hundleSize = () => {
            setMobille1(window.innerWidth < 1178)
            setMobille2(window.innerWidth < 627)
            setMobille3(window.innerWidth < 517)
            setMobille4(window.innerWidth < 400)
            setMobille5(window.innerWidth < 475)
        }

        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    })



    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0)
    const [evenements, setevenements] = useState([]);
    const [dataDetail, GetdataDetail] = useState({})
    const HundleClickElement = event => {
        GetdataDetail(event)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getAllevents?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setevenements(response.data.evenements);
                GetdataDetail(response.data.evenements[0]);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalEvenements);
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
            }
        };

        fetchData();
    }, [pageSize, currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getRange = () => {
        const from = (currentPage - 1) * pageSize + 1;
        const to = Math.min(currentPage * pageSize, totalElements);
        return `${from} à ${to} events sur ${totalElements}`;
    };

    return (
        <>
            <div className={`relative  bg-gray-50 flex p-2 ${mobile1 ? 'flex-col-reverse' : ''}`}>
                <div className={`flex justify-center items-center  h-full ${mobile1 ? 'w-full' : 'w-1/2'} p-2  mt-10`}>
                    <div className={`mt-2 font-serif  ${mobile2 ? 'text-[17px] ' : mobile1 ? 'text-[25px] ' : 'text-[35px] '} w-full text-center`}>
                        La plateforme des opportunités professionnelles :
                        là où les aspirations se transforment en réalisations,
                        et où les carrières prennent leur envol.
                    </div>
                </div>
                <div className={`h-max p-2 ${mobile1 ? 'w-full' : 'w-1/2'} flex`}>
                    <div className="w-full h-full rounded-xl overflow-hidden">
                        <img className="w-full h-full" src='image/Evenement.jpg' alt="    " />
                    </div>
                </div>
            </div>

            <div className="w-full flex  mt-1 justify-center flex-col items-center ">
                <div className='p-2 w-full'>
                    <div className="  w-full   rounded-lg  flex flex-col mt-[20px]  justify-center items-center ">
                        <div className={`flex w-full ${mobile1 ? 'flex-col' : ''}  p-2`}>
                            <div id='vieuw' className={`flex flex-col items-center ${mobile1 ? 'w-[99%] ' : 'w-[80%] '}`}>
                                <div className={`w-[99%] rounded-xl  overflow-hidden ${mobile4 ? 'h-[40vh]' : mobile3 ? ' h-[60vh]' : ' h-[80vh]'}`}>
                                    {
                                        youtubeRegex.test(dataDetail.video) ? (
                                            <ReactPlayer url={dataDetail.video}
                                                controls
                                                className="overflow-hidden inline object-cover object-center w-full h-full" />
                                        ) : (
                                            <img
                                                className="w-full h-full object-cover"
                                                src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${dataDetail.photo}`} alt='       ' />
                                        )
                                    }
                                </div>
                                <div className='w-[99%] mt-5'>
                                    <div className='font-semibold  w-full first-letter:uppercase text-[16px] sm:text-[25px] text-left'>{dataDetail.titre}</div>
                                    <div className=' text-[12px]  sm:text-[20px]'>
                                        {dataDetail.description}
                                    </div>
                                </div>
                            </div>

                            <div className={`${mobile1 ? 'w-[99%] mt-2 ' : 'w-[20%]'} `}>
                                <div className={`flex ${mobile1 ? 'w-full' : ''} flex-wrap justify-center`}>
                                    {evenements.map((event, index) => (
                                        <div key={index} onClick={() => HundleClickElement(event)} className={`overflow-hidden ${mobile5 ? 'w-full' : mobile1 ? 'w-[15em]' : ''}   rounded-2xl bg-white  p-1`}>
                                            <div className='w-full flex justify-center '>
                                                <div className={`m-[2px] bg-white ${mobile5 ? 'w-full h-max' : mobile1 ? 'w-[13em] h-[13em]' : ''}  ml-1 relative rounded overflow-hidden `}>
                                                    {
                                                        youtubeRegex.test(event.video) ? (
                                                            <ReactPlayer url={event.video}
                                                                controls
                                                                className="overflow-hidden inline object-cover object-center w-full h-full" />
                                                        ) : (
                                                            <img
                                                                className="w-full"
                                                                src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${event.photo}`} alt='       ' />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <Link href='#vieuw' className="w-full hover:no-underline hover:text-blue-800 transition-all   mt-1 flex items-center flex-col px-3 cursor-pointer">
                                                <div className='w-full text-[15px] font-extrabold text-start'>{event.titre && (event.titre.length > 20 ? event.titre.slice(0, 15) + '...' : event.titre)}</div>
                                                <div className={`min-h-[5em] w-full`}>
                                                    <div className='w-full  text-left'>
                                                        {event.description && (event.description.length > 90 ? event.description.slice(0, 90) + '...' : event.description)}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {evenements.length > 0 && (
                        <>
                            <div className="w-full flex justify-center items-center">
                                <div className="w-[25em] h-full flex justify-around items-center p-2">
                                    <button onClick={previousPage} disabled={currentPage === 1} className="transition-all flex cursor-pointer hover:p-2 rounded">
                                        <i className="bi bi-arrow-left-circle-fill"></i>
                                        <span>Précédent</span>
                                    </button>
                                    <button onClick={nextPage} disabled={currentPage === totalPages} className="transition-all flex cursor-pointer hover:p-2 rounded">
                                        <span>Suivant</span>
                                        <i className="bi bi-arrow-right-circle-fill"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center">
                                <p className="text-gray-600">{getRange()}</p>
                            </div>
                        </>
                    )}

                </div>
            </div>
            <Adresse />
        </>
    );
}
export default EvenementVoirPlusl
