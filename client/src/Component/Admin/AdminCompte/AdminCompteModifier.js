import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminCompteModifier() {
    const [isNom, setIsNom] = useState('');
    const [animationClassNom, setAnimationClassNom] = useState('');
    const nomRef = useRef(null);

    const [isPrenom, setIsPrenom] = useState('');
    const [animationClassPrenom, setAnimationClassPrenom] = useState('');
    const prenomRef = useRef(null);

    const [isEmail, setIsEmail] = useState('');
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const emailRef = useRef(null);

    const [isTel, setIsTel] = useState('');
    const [animationClassTel, setAnimationClassTel] = useState('');
    const telRef = useRef(null);



    const [radioValue, setRadioValue] = useState('');

    const [isProfil, setIsProfil] = useState('');
    const [animationClassProfil, setanimationClassProfil] = useState('');
    const profilmRef = useRef(null);

    console.log('isProfil', isProfil)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNom.trim() === '') {
            toast.warning('Le nom est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassNom('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus();
            return;
        }

        if (isPrenom.trim() === '') {
            toast.warning('Le prénom est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPrenom('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            prenomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            prenomRef.current.focus();
            return;
        }

        if (isTel.trim() === '') {
            toast.warning('Le numéro de téléphone est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassTel('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            telRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            telRef.current.focus();
            return;
        }

        if (isEmail.trim() === '') {
            toast.warning("L'adresse email est obligatoire", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }

        if (!isEmail.trim().match(emailRegex)) {
            toast.error("L'adresse email est incorrecte", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-red-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }



        if (radioValue === '') {
            toast.warning('Veuillez sélectionner votre genre', {
                autoClose: 2000
            });
            return;
        }

        if (isProfil.trim() === '') {
            toast.warning('Veuillez sélectionner votre photo de profil', {
                autoClose: 2000
            });
            setanimationClassProfil('animate__animated animate__shakeX placeholder-shown:border-red-500');
            profilmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Toutes les validations sont réussies, vous pouvez soumettre les données
        toast.success('Profil modifié avec succès', {
            autoClose: 2000
        });

        // Réinitialise les champs après la soumission réussie
        setIsNom('');
        setIsPrenom('');
        setIsTel('');
        setIsEmail('');
        setRadioValue('');
        setIsProfil('');
    };


    const [mobile1, Setmobile1] = useState(window.innerWidth < 1170);
    const [mobile, SetMobile] = useState(window.innerWidth < 431);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 1170)
            SetMobile(window.innerWidth < 431)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`w-full ${mobile1 ? ' h-[92vh]' : ' h-[87vh]'} overflow-x-hidden overflow-y-auto`}>

            <div className='w-full flex justify-start p-3'>
                <Link to='/'>
                    Aller à la page d'accueil
                </Link>
            </div>

            <div className={`mx-auto w-[90%]  my-3 p-3 border border-fuchsia-700 rounded-xl`}>
                <h1 className="sm:text-3xl first-letter:uppercase font-bold mb-8 text-lg">Modifier le profil</h1>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className={`flex ${mobile ? 'flex-col' : ''} w-full`}>
                        <div className="mb-4 mx-1 w-1/2">
                            <label className="block mb-2 text-lg" htmlFor="nom">
                                Nom
                            </label>
                            <input
                                id="nom"
                                type="text"
                                placeholder="Votre nom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassNom}`}
                                ref={nomRef}
                                value={isNom}
                                onChange={(e) => setIsNom(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 mx-1 w-1/2">
                            <label className="block mb-2 text-lg" htmlFor="prenom">
                                Prénom
                            </label>
                            <input
                                id="prenom"
                                type="text"
                                placeholder="Votre prénom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassPrenom}`}
                                ref={prenomRef}
                                value={isPrenom}
                                onChange={(e) => setIsPrenom(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`flex ${mobile ? 'flex-col' : ''} `}>
                        <div className="mb-4 mx-1 w-1/2">
                            <label className="block mb-2 text-lg" htmlFor="tel">
                                Numéro de téléphone
                            </label>
                            <input
                                id="tel"
                                type="text"
                                placeholder="Votre numéro de téléphone"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassTel}`}
                                ref={telRef}
                                value={isTel}
                                onChange={(e) => setIsTel(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 mx-1 w-1/2">
                            <label className="block mb-2 text-lg" htmlFor="email">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Votre adresse email"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassEmail}`}
                                ref={emailRef}
                                value={isEmail}
                                onChange={(e) => setIsEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <label className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassProfil}`} htmlFor="profil">
                            Photo de profil
                        </label>
                        <input
                            id="profil"
                            type="file"
                            ref={profilmRef}
                            hidden
                            accept="image/*"
                            className="border cursor-pointer rounded p-2 w-full"
                            onChange={(e) => setIsProfil(e.target.files[0])}
                        />
                    </div>
                    <div className='sm:w-[30em] w-full h-auto sm:h-[30em] border m-2 rounded-xl overflow-hidden border-orange-600'>
                        {isProfil && <img src={URL.createObjectURL(isProfil)} className='w-full h-full ' alt=' ' />}
                    </div>

                    <div className=' flex justify-end'>
                        <div className="flex justify-end items-center mr-2 ">
                            <Link to="/compte" for="send" className="w-max  flex justify-end p-1 ">Retourner</Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >  Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminCompteModifier;
