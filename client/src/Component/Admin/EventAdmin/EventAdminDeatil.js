import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import NavBarsEvemet from './NavBarsEvemet';
import Footer from '../../Visiteurs/Footer/Footer';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import { InView } from 'react-intersection-observer';

function EventAdminDeatil() {
    const [event, setEvent] = useState({});
    const { id } = useParams();
    const eventId = decryptData(id);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getOneById/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'événement :', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    return (
        <div className='w-full'>
            <NavBarsEvemet />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <Link to='/event' className='ml-1'>
                    Retour
                </Link>
                <div className='flex justify-center items-center w-full'>
                    <div className='w-full max-w-screen-xl'>
                        <div className='w-full h-full'>
                            {
                                youtubeRegex.test(event.video) ? (
                                    <ReactPlayer url={event.video} controls className="w-full h-auto object-cover" />
                                ) : (
                                    <InView>
                                        {({ inView, ref }) => (
                                            <img
                                                ref={ref}
                                                alt=''
                                                src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${event.photo}`}
                                                className="w-full h-auto object-cover"
                                            />
                                        )}
                                    </InView>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='sm:text-[20px] pl-10 text-[22px] w-full text-left mt-5'>
                    {event.titre}
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='text-[18px] text-gray-500 w-[90%]'>
                        {event.description}
                    </div>
                </div>
                <div className='my-2 w-full pl-10 text-[18px]'>
                    <div>Organisé par: <span className='font-bold'>ABAHS</span></div>
                    <div className='font-medium'><span className='font-bold'>{formatDate(event.createdAt)}</span></div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default EventAdminDeatil;
