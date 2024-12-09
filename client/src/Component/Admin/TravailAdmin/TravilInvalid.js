/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { countries } from '../../Data/Data'
import Footer from '../../Visiteurs/Footer/Footer'
import { Link } from 'react-router-dom'
import NavBarsTravail from './NavBarsTravail'
import { Popover, Whisper } from 'rsuite'
import axios from 'axios'
import { encryptData } from '../../../encryptionModule'
function TravilInvalid() {

    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0)


    const [isrechercher, setisRechercher] = useState(0)


    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 448)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 850)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 448)
            SetMobile2(window.innerWidth < 634)
            SetMobile3(window.innerWidth < 850)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [travails, settravails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getAllTravailArchives?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                settravails(response.data.travails);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalTravails);
            } catch (error) {
                console.error('Erreur lors de la récupération des travails :', error);
            }
        };

        fetchData();
    }, [pageSize, currentPage, isrechercher]);

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
        return `${from} à ${to} travails sur ${totalElements}`;
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    function handleSearch() {
        setisRechercher(isrechercher + 1)
    }

    const handleCancelSearch = () => {
        setSearchTerm('');
        setisRechercher(isrechercher + 1);
    };

    return (
        <div className={`w-full`}>
            <NavBarsTravail />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`flex  mt-4 ${mobile2 ? 'flex-col items-start' : 'items-center'}`}>
                    <div className='flex items-center m-1'>
                        <div className="flex items-center  overflow-hidden  border border-gray-300  rounded-l-md">
                            <input
                                type="text"
                                placeholder="Rechercher par nom pay..."
                                className='p-2 pr-0.5 w-full h-full bg-transparent outline-none'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <div className='mr-0.5'>
                                {searchTerm.trim() != "" && <div onClick={handleCancelSearch} class=" flex text-white items-center rounded-full bg-red-700 cursor-pointer ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi w-5 h-5 bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </div>
                                }
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 text-white border bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none"

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>




                    <select
                        className="p-2 border border-gray-300 m-1 bg-transparent  rounded-md focus:outline-none"
                        value={pageSize}

                    >
                        <option className="text-[black]" value="5">5 par page</option>
                        <option className="text-[black]" value="10">10 par page</option>
                        <option className="text-[black]" value="20">20 par page</option>
                    </select>
                </div>
                <div className='flex flex-wrap'>
                    <div>
                        <div className='text-[25px] text-fuchsia-600 w-full  pl-5 mt-4'>Pays partenaires</div>
                        <div className={`grid  ${mobile3 ? 'grid-cols-2' : mobile ? 'grid-cols-3' : 'grid-cols-5 '}  m-2 rounded`}>
                            {travails.map((trav, index) => (
                                <Whisper
                                    trigger='hover'
                                    placement='auto'
                                    speaker={
                                        <Popover>
                                            <div className='flex items-center'>
                                                <img src={`https://flagcdn.com/w40/${trav.drapeux.toLowerCase()}.png`} alt={`${trav.pays} flag`} />
                                                <div className='ml-2 text-[20px]'>
                                                    {trav.pays}
                                                </div>
                                            </div>
                                        </Popover>
                                    }
                                >
                                    <Link to={`/travail/archive/detail/${encryptData((trav.id).toString())}`} className='m-3 w-max' key={index}>
                                        <div className='flex items-center'>
                                            <img src={`https://flagcdn.com/w40/${trav.drapeux.toLowerCase()}.png`} alt={`${trav.pays} flag`} />
                                            <div className='ml-2 text-[20px]'>
                                                {trav.pays && (trav.pays.length > 10 ? trav.pays.slice(0, 10) + '..' : trav.pays)}
                                            </div>
                                        </div>
                                    </Link>
                                </Whisper>
                            ))}
                        </div>
                    </div>
                </div>
                {travails.length > 0 && (
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
                <Footer />
            </div>
        </div>
    )
}

export default TravilInvalid
