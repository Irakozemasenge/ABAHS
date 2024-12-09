import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';


function AdminCompte() {

    const [changePassWord, SetchangePassWord] = useState(false)

    const [isPassAncien, setIsPassAncien] = useState('');
    const [animationClassPassAncien, setAnimationClassPassAncien] = useState('');
    const PasswordRegexAncien = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRefAncien = useRef(null);
    const [typeTextAncien, GetTypeTextAncien] = useState(true)



    const [isPass, setIsPass] = useState('');
    const [animationClassPass, setAnimationClassPass] = useState('');
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRef = useRef(null);
    const [typeText, GetTypeText] = useState(true)

    const [isPassConfirm, setIsPassConfirm] = useState('');
    const [animationClassConfirm, setAnimationClassConfirm] = useState('');
    const passConfirmRef = useRef(null);
    const [typeTextConfirm, GettypeTextConfirm] = useState(true)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (isPassAncien.trim() === '') {
            toast.warning('Le mot de passe est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPassAncien('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRefAncien.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRefAncien.current.focus();
            return;
        }

        if (!isPassAncien.trim().match(PasswordRegexAncien)) {
            toast.error('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial', {
                autoClose: 2000
            });
            setAnimationClassPassAncien('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRefAncien.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRefAncien.current.focus();
            return;
        }


        if (isPass.trim() === '') {
            toast.warning('Le mot de passe est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (!isPass.trim().match(PasswordRegex)) {
            toast.error('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (isPassConfirm.trim() === '') {
            toast.warning('Veuillez confirmer votre mot de passe', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }

        if (isPass !== isPassConfirm) {
            toast.error('Les mots de passe ne correspondent pas', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }
        setIsPass('');
        setIsPassConfirm('');
    }


    const [mobile, Setmobile] = useState(window.innerWidth < 1170);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1170)

        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`w-full ${mobile ? ' h-[92vh]' : ' h-[87vh]'} overflow-x-hidden overflow-y-auto`}>

            <div className='w-full flex justify-start p-3'>
                <Link to='/'>
                    Aller à la page d'accueil
                </Link>
            </div>
            {!changePassWord &&
                <div className="flex flex-col sm:ml-4 sm:mt-4  w-full  sm:w-max   rounded-xl p-2  h-max ">
                    <div className='text-[23px]'>Votre donner de compte</div>
                    <div className="  p-2 rounded-xl overflow-hidden  m-1 w-[10em] h-[10em] border" >
                        <img src="https://irakoze.burundientempsreel.com/uploads/Photo/LENGA2.png" alt="  " className=' w-full  object-contain h-full' />
                    </div>
                    <div className="w-full">
                        <div className='sm:text-[25px] text-[17px] font-sans'>
                            <p>Nom: NDAYIZEYE</p>
                            <p>Prenom: Telesphore</p>
                            <p>Tel: +209 790 322 829</p>
                            <p>Email: <div>telecomtelesphore@gmail.com</div></p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between flex-wrap  mt-5 ">
                        <Link to='/' className='bg-green-400  first-letter:uppercase px-3 py-2  m-1  text-white p-1 rounded hover:bg-green-600 transition-all'>Retour</Link>
                        <Link to="/compte/modifier" className='bg-orange-400 px-3 first-letter:uppercase  m-1 py-2 text-white p-1 rounded hover:bg-orange-600 transition-all'>Modifier compte </Link>
                        <div onClick={() => SetchangePassWord(true)} className='bg-blue-400 cursor-pointer px-3 py-2 text-white p-1 m-1  first-letter:uppercase rounded hover:bg-blue-600 transition-all'>Modifier le mot de passe </div>
                    </div>
                </div>
            }
            {changePassWord &&
                <div className='w-full flex justify-start '>
                    <form onSubmit={handleSubmit} className='w-full rounded border sm:mt-4  sm:ml-4  sm:w-[35em] sm:p-5 p-1  h-max'>
                        <div className='text-[23px] first-letter:uppercase'>Modifier votre mot de passe</div>
                        <div className={`flex flex-col`}>
                            <div className="mb-4 mx-1 w-full">
                                <label className="block mb-2 text-lg" htmlFor="pass">
                                    Ancien mot de passe
                                </label>
                                <div className={`w-full relative  bg-transparent`}
                                >
                                    <input
                                        id="pass"
                                        type={typeTextAncien ? 'password' : 'text'}
                                        placeholder="Ancien mot de passe"
                                        className={`border rounded px-2 py-3 pr-7 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassPassAncien}`}
                                        ref={passRefAncien}
                                        value={isPassAncien}
                                        onChange={(e) => setIsPassAncien(e.target.value)}
                                    />
                                    <div className='absolute right-0.5  cursor-pointer p-3 flex justify-center items-center top-3'>

                                        {!typeTextAncien &&
                                            <svg onClick={() => GetTypeTextAncien(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi absolute  cursor-pointer w-full h-full bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                            </svg>
                                        }
                                        {typeTextAncien &&
                                            <svg onClick={() => GetTypeTextAncien(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash cursor-pointer w-full h-full absolute" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                            </svg>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="mb-4 mx-1 w-full">
                                <label className="block mb-2 text-lg" htmlFor="pass">
                                    Nouvelle mot de passe
                                </label>
                                <div className={`w-full relative  bg-transparent`}
                                >
                                    <input
                                        id="pass"
                                        type={typeText ? 'password' : 'text'}
                                        placeholder="Nouvelle mot de passe"
                                        className={`border rounded px-2 py-3 pr-7 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassPass}`}
                                        ref={passRef}
                                        value={isPass}
                                        onChange={(e) => setIsPass(e.target.value)}
                                    />
                                    <div className='absolute right-0.5  cursor-pointer p-3 flex justify-center items-center top-3'>

                                        {!typeText &&
                                            <svg onClick={() => GetTypeText(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi absolute  cursor-pointer w-full h-full bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                            </svg>
                                        }
                                        {typeText &&
                                            <svg onClick={() => GetTypeText(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash cursor-pointer w-full h-full absolute" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                            </svg>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="mb-4 mx-1 w-full">
                                <label className="block mb-2 text-lg" htmlFor="passConfirm">
                                    Confirmer nouvelle mot de passe
                                </label>
                                <div className={`w-full relative  bg-transparent`}
                                >
                                    <input
                                        id="pass"
                                        type={typeTextConfirm ? 'password' : 'text'}
                                        placeholder="Confirmer nouvelle mot de passe"
                                        className={`border rounded px-2 py-3 w-full pr-7  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassConfirm}`}
                                        ref={passConfirmRef}
                                        value={isPassConfirm}
                                        onChange={(e) => setIsPassConfirm(e.target.value)}
                                    />
                                    <div className='absolute right-0.5  p-3 flex justify-center items-center top-3'>

                                        {!typeTextConfirm &&
                                            <svg onClick={() => GettypeTextConfirm(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi absolute  cursor-pointer w-full h-full bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                            </svg>
                                        }
                                        {typeTextConfirm &&
                                            <svg onClick={() => GettypeTextConfirm(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash cursor-pointer w-full h-full absolute" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                            </svg>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex justify-end'>
                            <div className="flex justify-end items-center mr-2 ">
                                <div onClick={() => SetchangePassWord(false)} className="w-max cursor-pointer  flex justify-end p-1 ">Retourner</div>
                            </div>
                            <button
                                type="submit"
                                className="bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            >  Modifier
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default AdminCompte


