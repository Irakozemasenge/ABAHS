/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsEtude from './NavBarsEtude'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios'
import { decryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
function CommandeEtudeDetail() {
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

    const navigate = useNavigate()

    const [postulation, setPostulationDetails] = useState({});
    const { id } = useParams()
    const postuleId = decryptData(id)
    useEffect(() => {
        const fetchetudeDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/etude/getPostulationWithRelations/${postuleId}`);
                setPostulationDetails(response.data);

            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la etude :', error);
            }
        };


        fetchetudeDetails();
    }, [id]);

    const handleDeletePostulation = async () => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas récupérer cette postulation!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://speedreal.abahs-jobconnect.com/etude/deletePostulation/${postuleId}`);
                toast.success('La postulation a été supprimée.');
                navigate("/etude/command")
            } catch (error) {
                console.error('Erreur lors de la suppression de la postulation :', error);
                toast.error('Une erreur est survenue lors de la suppression de la postulation.');
            }
        }
    };
    const handleValidatePostulation = async () => {
        try {
            // Mettre à jour le statut de la postulation
            await axios.put(`https://speedreal.abahs-jobconnect.com/etude/updatePostulationStatus/${postuleId}`, { status: 21 });
            toast.success('La postulation a été validée.');
            navigate("/etude/command")
        } catch (error) {
            console.error('Erreur lors de la validation de la postulation :', error);
            toast.error('Une erreur est survenue lors de la validation de la postulation.');
        }
    };

    return (
        <div className='w-full'>
            <NavBarsEtude />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className='flex '>
                    <div className='w-full g p-3  rounded-xl h-max  m-2'>
                        <div className='text-orange-600 font-bold text-[25px]'>{postulation.etude && postulation.etude.titre}</div>
                        <div className='mt-2 text-[20px]'>
                            <div className="w-14 h-14">
                                {postulation.etude && postulation.etude.drapeux && (<img src={`https://flagcdn.com/w40/${postulation.etude.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                            </div>
                            <div className="font-medium">Pays: {postulation.etude && postulation.etude.pays}</div>
                            <div className="font-medium">Domaine: {postulation.etude && postulation.etude.domaine}</div>
                            <div className="font-medium">Niveau: {postulation.etude && postulation.etude.niveau}</div>
                            <div className="font-medium">
                                Inscription: <div className="font-bold">du {postulation.etude && new Date(postulation.etude.createdAt).toLocaleDateString()} au {postulation.etude && new Date(postulation.etude.fin).toLocaleDateString()}</div>
                            </div>
                            <div className="font-medium">Status: <span className="font-bold">{postulation.status === 1 ? 'En attente' : 'Autre statut'}</span></div>
                            <div className='font-medium'>Client:
                                <div className='font-bold'> -{postulation.nom} {postulation.prenom}</div>
                                <div className='font-bold'> -Tel:  {postulation.tel}</div>
                                <div className='font-bold'> -Email: {postulation.email}</div>
                            </div>
                            <div className='font-medium'>Date de commande:<span className='font-bold'>le {new Date(postulation.createdAt).toLocaleDateString()}</span></div>
                        </div>
                        <div className='text-gray-400 text-[17px]'>
                            {postulation.message}
                        </div>
                        <div className='text-[15px] sm:text-[17px]'>
                            <div className='text-[20px]'>Avantages</div>
                            <ul className='list-none'>

                                {postulation.etude && postulation.etude.savantages && postulation.etude.savantages.map((data, index) => (
                                    <li key={index} className='list-hyphen'>-{data.av}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='text-[15px] sm:text-[17px]'>
                            <div className='text-[20px]'>Critere d'eligibilite</div>
                            <ul className='list-none'>
                                {postulation.etude && postulation.etude.seligibres && postulation.etude.seligibres.map((data, index) => (
                                    <li key={index} className='list-hyphen'>-{data.crit}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='flex mt-4'>
                            <Link to='/etude/command' className='w-max mx-1 px-2 block hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
                                Retourner
                            </Link>
                            <button className='w-max mx-1 px-2 block hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-red-400 hover:bg-red-600 transition-all duration-500 text-white rounded' onClick={handleDeletePostulation}>
                                Supprimer
                            </button>
                            <button className='w-max mx-1 px-2 block hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-orange-400 hover:bg-orange-600 transition-all duration-500 text-white rounded' onClick={handleValidatePostulation}>
                                Valider
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default CommandeEtudeDetail