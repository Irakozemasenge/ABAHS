/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Rapidement() {
    const [mobile, Setmobile] = useState(window.innerWidth < 1251);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1251)
            Setmobile1(window.innerWidth < 804)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [pageSize, setPageSize] = useState(5);
    const [bourses, setBourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getAllBourses?size=${pageSize}`);
                setBourses(response.data.bourses);
            } catch (error) {
                console.error('Erreur lors de la récupération des bourses :', error);
            }
        };

        fetchData();
    }, [pageSize]);
    const [mobile4, Setmobile4] = useState(window.innerWidth < 508);
    return (
        <div className='w-full p-2 sm:px-4'>
            <div className='w-[95%]'>
                <div className={`${mobile1 ? 'text-[11px] ' : 'text-[20px]'}`}>  ABAHS-Jobconnect annonce les nouvelles bourses disponibles à partir du 10 mars 2024 à la fin de cette  année :</div>
                <div className='flex flex-wrap w-full'>
                    {bourses.map((bourse, index) => (

                        <div className={` p-3 ${mobile4 ? 'w-[95%]' : 'w-max'} border-fuchsia-700 bg-[#ffa60042] rounded-xl border h-max  m-2`}>
                            <div className='text-orange-600 font-bold text-[20px]'>{bourse.titre}</div>
                            <div className='mt-2'>
                                <div className='font-medium'>Pays: {bourse.pays}</div>
                                <div className='font-medium'>domaine: {bourse.domaine}</div>
                                <div className='font-medium'>Niveau: {bourse.niveau}</div>
                                <div className='font-medium'>Fin d'inscription:<span className='font-bold'>
                                    {new Date(bourse.fin).toLocaleDateString()}
                                </span></div>
                            </div>

                        </div>
                    ))}
                </div>
                <span className={`text-yellow-600 font-bold underline ${mobile1 ? 'text-[15px] ' : 'text-[18px]'}`}> N.B</span>:
                <span className={`${mobile1 ? 'text-[11px]' : 'text-[17px]'} italic`}>
                    Beaucoup d'autres bourses d'études sont disponibles, inscrivez-vous à notre plateforme ABAHS, pour rester informés des bourses disponibles.
                    .C'est n'est pas demain c'est maintenant <Link to='/bourse' >Voir plus</Link>
                </span>
            </div>
        </div>
    )
}

export default Rapidement
