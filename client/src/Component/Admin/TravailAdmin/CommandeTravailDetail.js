/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import NavBarsTravail from './NavBarsTravail'
import axios from 'axios'
import { decryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'

function CommandeTravail() {
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

    const [postulation, setPostulation] = useState({});
    const navigate = useNavigate()
    const { id } = useParams();
    const postuleId = decryptData(id)
    useEffect(() => {
        const fetchPostulation = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getPostulationWithRelations/${postuleId}`);
                setPostulation(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de la postulation avec ses relations :', error);
            }
        };
        fetchPostulation();
    }, [id]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const handleValidate = async () => {
        // Afficher la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr de vouloir valider cette commande ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, valider !',
            cancelButtonText: 'Annuler'
        });

        // Si l'utilisateur confirme
        if (result.isConfirmed) {
            try {
                // Envoyer une requête pour mettre à jour le statut
                await axios.put(`https://speedreal.abahs-jobconnect.com/travail/updatePostulationStatus/${postulation.id}`, { status: 2 });
                toast.success('La commande a été validée avec succès.');
                navigate("/travail/command")
            } catch (error) {
                console.error('Erreur lors de la validation de la commande :', error);
                // Afficher un message d'erreur
                toast.success('Une erreur s\'est produite lors de la validation de la commande. Veuillez réessayer plus tard.');
            }
        }
    };
    return (
        <div className='w-full'>
            <NavBarsTravail />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                {postulation && (
                    <div className='flex '>
                        <div className='w-full g p-3  rounded-xl h-max  m-2'>
                            <div className='text-orange-600 font-bold text-[25px]'>{postulation.travail && postulation.travail.pays}</div>
                            <div className='mt-2'>
                                <div className='font-medium'>Nom complet:<span className='font-bold'> {postulation.nom} {postulation.prenom}</span> </div>
                                <div className='font-medium'>Tel:<span className='font-bold'> {postulation.tel}</span> </div>
                                <div className='font-medium'>Adresse:<span className='font-bold'> {postulation.adresse}</span> </div>
                                <div className='font-medium'>Email:<span className='font-bold'> {postulation.email}</span> </div>
                                <div className='font-medium'>Message:<span className='font-bold'> {postulation.message}</span> </div>
                                <div className='font-medium'>Date de commande:<span className='font-bold'> {formatDate(postulation.createdAt)}</span></div>
                                <div className='font-medium'>
                                    Status:
                                    <span className={`font-bold ${postulation.status === 1 ? 'text-blue-600 cursor-none' : 'text-green-600'}`}>
                                        {postulation.status === 1 ? 'En attente' : 'Valide'}
                                    </span>
                                </div>

                            </div>
                            <div className='text-[15px] sm:text-[17px]'>
                                <div className='text-[20px]'>Avantages</div>
                                <ul className='list-none'>
                                    {postulation.travail && postulation.travail.tavantages && postulation.travail.tavantages.map((avantage, index) => (
                                        <li key={index} className='list-hyphen'>-{avantage.av}</li> // Utilisez avantage.av pour afficher l'avantage
                                    ))}
                                </ul>
                            </div>
                            <div className=' flex mt-4'>
                                <Link to='/travail/command' className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
                                    Retourner
                                </Link>
                                <button onClick={handleValidate} className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-orange-400 hover:bg-orange-600 transition-all duration-500 text-white rounded'>
                                    Valider
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </div>
    )
}

export default CommandeTravail
