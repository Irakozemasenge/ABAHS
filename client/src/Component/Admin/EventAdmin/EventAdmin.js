/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBarsEvemet from './NavBarsEvemet'
import { Link } from 'react-router-dom'
import { InView } from 'react-intersection-observer'
import { FadeLoader } from 'react-spinners'
import ReactPlayer from 'react-player'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios'
import { encryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
function EventAdmin() {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    const [mobile, GetMobile] = useState(window.innerWidth < 1046)
    const [mobil1, GetMobile1] = useState(window.innerWidth < 873)
    const [mobil2, GetMobile2] = useState(window.innerWidth < 650)
    const [mobil3, GetMobile3] = useState(window.innerWidth < 490)
    const [mobil4, GetMobile4] = useState(window.innerWidth < 350)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    useEffect(() => {
        const hundleSize = () => {
            GetMobile(window.innerWidth < 1046)
            GetMobile1(window.innerWidth < 873)
            GetMobile2(window.innerWidth < 659)
            GetMobile3(window.innerWidth < 490)
            GetMobile4(window.innerWidth < 350)
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



    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)

        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])


    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0)
    const [evenements, setevenements] = useState([]);
    const [isrechercher, setisRechercher] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getAllevents?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setevenements(response.data.evenements);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalEvenements);
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
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
        return `${from} à ${to} events sur ${totalElements}`;
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }


    const handleDeleteEvent = async (eventId) => {
        // Afficher la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        // Si l'utilisateur confirme la suppression
        if (result.isConfirmed) {
            // Effectuer la suppression via Axios
            axios.delete(`https://speedreal.abahs-jobconnect.com/event/delete/${eventId}`)
                .then(response => {
                    // Mettre à jour la liste des événements après la suppression
                    const updatedEvents = evenements.filter(event => event.id !== eventId);
                    setevenements(updatedEvents);
                    // Afficher un message de confirmation
                    toast.success('L\'événement a été supprimé avec succès.');
                })
                .catch(error => {
                    // En cas d'erreur lors de la suppression
                    console.error('Erreur lors de la suppression de l\'événement :', error);
                    toast.error('Une erreur est survenue lors de la suppression de l\'événement. Veuillez réessayer.');
                });
        }
    };


    return (
        <div className='w-full'>
            <NavBarsEvemet />
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
                <div className='w-full flex flex-wrap'>


                    <div className='flex flex-wrap w-full'>
                        {evenements.length > 0 && evenements.map((data, index) => (
                            <div key={index} data-position={index} className='w-[18em] blocks mt-10  mx-auto rounded-xl  overflow-hidden flex flex-col items-center'>
                                <div className='w-[16em] relative rounded-xl border  overflow-hidden h-[16em]'>
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
                                                            src={inView && visibleItems.includes(index) ? `https://speedreal.abahs-jobconnect.com/uploads/evenements/${data.photo}` : ''}
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

                                <Link to={`/event/Detail/${encryptData(data.id.toString())}`} className='w-full block text-left p-2 font-semibold text-[18px]'>{data.titre && (data.titre.length > 20 ? data.titre.slice(0, 20) + '...' : data.titre)}</Link>

                                <div className='text-left w-full p-2 text-slate-500 text-[14px]'>{data.description && (data.description.length > 70 ? data.description.slice(0, 90) + '...' : data.description)}</div>
                                <div className='flex items-center text-slate-500 justify-start w-full'>
                                    <div className='text-left w-full  text-slate-500 text-xs p-2'>{formatDate(data.createdAt)}</div>
                                </div>
                                <div className='flex justify-between items-center w-full border-t p-2 '>
                                    <Link to={`/event/edit/${encryptData(data.id.toString())}`} className='bg-blue-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square w-5 h-5 text-blue-800 cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                    <butoon onClick={() => handleDeleteEvent(data.id)} className='bg-red-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill w-5 h-5 text-red-600" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </butoon>
                                </div>
                            </div>
                        ))}

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

                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default EventAdmin