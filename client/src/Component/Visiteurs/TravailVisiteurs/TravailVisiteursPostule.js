/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Modal } from 'rsuite';
import Adresse from '../Adresse/Adresse';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';

function TravailVisiteursPostule() {
    const [travailDetails, settravailDetails] = useState({});
    const { id } = useParams()
    const travailId = decryptData(id)
    useEffect(() => {
        const fetchtravailDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getTravailWithTavantage/${travailId}`);
                settravailDetails(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la travail :', error);
            }
        };
        fetchtravailDetails();
    }, [travailId]);




    const [nom, setNom] = useState('');
    const nomRef = useRef(null);

    const [prenom, setPrenom] = useState('');
    const prenomRef = useRef(null);

    const [tel, setTel] = useState('');
    const telRef = useRef(null);

    const [adresse, setAdresse] = useState('');
    const adresseRef = useRef(null);

    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const [email, setEmail] = useState('');
    const emailRef = useRef(null);



    const [message, setMessage] = useState('');
    const messageRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (nom.trim() == '') {
            toast.warning("Votre nom est obligatoire", {
                autoClose: 2000
            });
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus()
            return;
        } else if (prenom.trim() == '') {
            toast.warning("Votre prenom est obligatoire", {
                autoClose: 2000
            });

            prenomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            prenomRef.current.focus()
            return;
        } else if (tel.trim() == '') {
            toast.warning("Votre téléphone est obligatoire", {
                autoClose: 2000
            });
            telRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            telRef.current.focus()
            return;
        } else if (adresse.trim() == '') {
            toast.warning("Votre addresse physique est obligatoire", {
                autoClose: 2000
            });

            adresseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            adresseRef.current.focus()
            return;
        } else if (email.trim() == '') {
            toast.warning("Votre  email est obligatoire", {
                autoClose: 2000
            });
            emailRef.current.focus()
            return;
        }
        else if (!email.trim().match(emailRegex)) {
            toast.warning("Votre  email est incorrect", {
                autoClose: 2000
            });
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus()
            return;
        }
        const formData = {
            travailId: travailId,
            nom: nomRef.current.value,
            prenom: prenomRef.current.value,
            tel: telRef.current.value,
            adresse: adresseRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
        };

        axios.post(`https://speedreal.abahs-jobconnect.com/travail/postulertravail`, formData)
            .then(response => {
                // Gérer la réponse réussie ici
                console.log("Réponse du serveur :", response.data);
                toast.success("Votre demande de travail a été soumise avec succès !");
                setNom("")
                setPrenom("")
                setTel("")
                setAdresse("")
                setEmail("")
                setMessage("")
                handleOpen()
            })
            .catch(error => {
                // Gérer l'erreur ici
                console.error("Erreur lors de l'envoi de la demande de travail :", error);
                if (error.response && error.response.data) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Une erreur est survenue lors de l'envoi de la demande de travail. Veuillez réessayer.");
                }
            });

    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);


    return (
        <div className='p-2'>
            <Link to='/travail'>return</Link>
            <div className='flex  bg-gray-50 rounded'>
                <div className='w-full  sm:p-3 p-1 rounded-xl h-max  m-2'>
                    <div className='sm:text-[20px] text-[12px]'>
                        Avec une date limite d'inscription fixée au {new Date(travailDetails.fin).toLocaleDateString()},
                        ces travails offrent aux étudiants intéressés une
                        occasion unique de poursuivre leurs études dans {travailDetails.pays}
                        <br /><br />
                        Si vous êtes intéressé par les <a href='#'>{travailDetails.domaine}</a> et vous pouvez lire les <a href='#avantages'>avantages</a> et <a href='#Critere'>les critères d'éligiblité </a> pour obtenir
                        un diplôme de {travailDetails.niveau} en {travailDetails.pays}, il est vivement recommandé de soumettre
                        votre candidature avant la date limite spécifiée afin de profiter de cette opportunité
                        exceptionnelle.
                    </div>
                    <div className='text-orange-600 font-bold text-3xl'>{travailDetails.titre}</div>
                    <div className='mt-2 text-lg'>
                        <div className="w-14 h-14">
                            {travailDetails.drapeux && (<img src={`https://flagcdn.com/w40/${travailDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                        </div>
                        <div className='font-medium'>Pays: {travailDetails.pays}</div>
                        <div className='font-medium'>Domaine: {travailDetails.domaine}</div>
                        <div className='font-medium'>Niveau: {travailDetails.niveau}</div>
                        <div className='font-medium'>Inscription: <span className='font-bold'>du {new Date(travailDetails.createdAt).toLocaleDateString()} au {new Date(travailDetails.fin).toLocaleDateString()}</span></div>
                    </div>
                    <div className='text-[15px] sm:text-[17px] mt-5'>
                        <div id='avantages' className='text-[20px] font-bold'>Avantage</div>
                        <ul className='list-none'>
                            {travailDetails.tavantages && travailDetails.tavantages.map((avantage, index) => (
                                <li key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 border-b border-gray-200">
                                    <span className="flex-1">{index + 1}. {avantage.av}</span>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        Si vous êtes intéressé, inscrivez-vous ci-dessous.
                    </div>


                    <form className="w-full mx-auto rounded-md p-4 bg-white mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nom" className="block tracking-wide text-lg mb-2">
                                Nom :
                            </label>
                            <input
                                ref={nomRef}
                                id="nom"
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className={`block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3  `}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="prenom" className="block tracking-wide text-lg mb-2">
                                Prénom :
                            </label>
                            <input
                                ref={prenomRef}
                                id="prenom"
                                type="text"
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tel" className="block tracking-wide text-lg mb-2">
                                Téléphone :
                            </label>
                            <input
                                ref={telRef}
                                id="tel"
                                type="tel"
                                placeholder="Téléphone"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className="block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="adresse" className="block tracking-wide text-lg mb-2">
                                Adresse :
                            </label>
                            <textarea
                                ref={adresseRef}
                                id="adresse"
                                placeholder="Adresse"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                className="block w-full bg-transparent min-h-[10em] resize-y outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block tracking-wide text-lg mb-2">
                                Email :
                            </label>
                            <input
                                ref={emailRef}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block tracking-wide text-lg mb-2">
                                Message :
                            </label>
                            <textarea
                                ref={messageRef}
                                id="message"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="block w-full bg-transparent min-h-[10em] resize-y outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Postuler
                            </button>
                        </div>
                        <div className='mt-5  w-full'>
                            <div onClick={handleOpen} className='animate-pulse text-blue-700 font-extrabold cursor-pointer flex items-center w-max py-2 px-3 hover:bg-gray-50 rounded' >
                                <div> Demmande d'aide</div>
                                <div className='animate-ping'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                    </svg>
                                </div>
                            </div>

                            <Modal size="lg" open={open} onClose={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>Information intéressant</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    AHABS est une entreprise renommée dans la ville de Bujumbura, avec une expertise reconnue
                                    dans notre domaine d'activité. Vous pouvez vous rendre à notre bureau situé au numéro 24
                                    du Maire de la Ville pour obtenir
                                    davantage d'informations, poser des questions ou bénéficier d'une assistance personnalisée.
                                    <br />
                                    <br />
                                    Nous sommes impatients de vous offrir une expérience exceptionnelle et de répondre à
                                    tous vos besoins. N'hésitez pas à contacter notre équipe compétente et dévouée à AHABS pour
                                    obtenir l'assistance dont vous avez besoin.
                                    <br />
                                    <br />
                                    Encore une fois, bienvenue chez AHABS et merci d'avoir choisi notre plateforme. Nous sommes ravis de vous accompagner dans votre parcours.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose} appearance="subtle">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose} appearance="primary">
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </form>

                    <Adresse />
                </div>
            </div>
        </div>
    )
}

export default TravailVisiteursPostule