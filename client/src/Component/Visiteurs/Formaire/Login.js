/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

import { FadeLoader } from 'react-spinners'



function Login({
    Selogin,
    Seregitrant
}) {

    const [boutLoading, setboutLoading] = useState(false);

    const history = useNavigate();



    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const [emailValue, setEmailValue] = useState('')
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const elemetRefEmail = useRef(null)

    const [isPass, setIsPass] = useState('');
    const [animationClassPass, setAnimationClassPass] = useState('');
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRef = useRef(null);
    const [typeText, GetTypeText] = useState(true)



    const handleSubmit = (e) => {
        e.preventDefault()

        if (emailValue.trim() == '') {
            toast.warning("L'address email est obligatoire !!", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-orange-500 text-orange-500 border-orange-700')
            setTimeout(() => {
                setAnimationClassEmail(' ')
            }, 3000)
            elemetRefEmail.current.focus();
            return
        } else if (!emailValue.trim().match(emailRegex)) {
            toast.error("L'address email est incorrect", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-red-500 text-red-500 border-red-500')
            setTimeout(() => {
                setAnimationClassEmail(' ')
            }, 3000)
            elemetRefEmail.current.focus();

            return
        } else if (isPass.trim() == "") {
            toast.warning("Le mot de passe est obligatoire !!", {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-orange-700 text-orange-500 border-orange-700')
            setTimeout(() => {
                setAnimationClassPass(' ')
            }, 3000)
            passRef.current.focus()

            return
        } else if (!isPass.trim().match(PasswordRegex)) {

            toast.error(`Le mot de passe doit contenir au moins
                         une lettre minuscule,lettre majuscule,un chiffre et un caractère spécial
                       `, {
                autoClose: 5000,
                position: "top-center",
                className: 'my-toast',

            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500 text-red-500 border-red-500')
            setTimeout(() => {
                setAnimationClassPass(' ')
            }, 5000)
            passRef.current.focus()
            return
        }

    }
    const [imageLoading, SetImageLoading] = useState(true)

    return (
        <>
            <div className={`fixed w-full h-full z-[100] top-0 left-0 flex justify-center overflow-hidden bg-[white] `}>
                <div className='w-full  h-full overflow-auto flex justify-center py-5 '>
                    <div className={` bg-white  p-2  border shadow-2xl border-orange-600 sm:w-[30em] max-sm:w-[95%] rounded-3xl h-max`}>
                        <div className="w-full flex justify-center items-center">
                            <div className=" h-max max-sm:w-[7em] max-sm:h-[7em]  w-[15em] transition-all  relative overflow-hidden ml-3 rounded ">
                                {imageLoading && <div className="absolute w-full h-full "><img src="https://www.eliananunes.com/images/lazy_loader.gif" className="w-full h-full object-cover" /></div>}
                                <img draggable='false' onLoad={() => {
                                    setTimeout(() => {
                                        SetImageLoading(false)
                                    }, 1000)
                                }} src='image/abahs.jpg' alt="" className='h-full w-full  object-contain object-center' />
                            </div>
                        </div>
                        <h2 className=' p-2 text-center max-sm:text-[12px] font-serif text-gray-400 '>Se connecter</h2>
                        <p className='text-[15px] text-gray-500 pl-3 text-center max-sm:text-[11px]'>Si vous êtes déjà membre, connectez-vous facilement maintenant.</p>
                        <div className="p-2 my-2 rounded w-full  h-max">
                            <form onSubmit={handleSubmit}>
                                <div className="flex mb-6 flex-col ">
                                    <div className="mb-4 mx-1 w-full">
                                        <label className="block mb-2 text-lg" htmlFor="email">
                                            Adresse email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Votre adresse email"
                                            className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-orange-700 ${animationClassEmail}`}
                                            ref={elemetRefEmail}
                                            value={emailValue}
                                            onChange={(e) => setEmailValue(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4 mx-1 w-full">
                                        <label className="block mb-2 text-lg" htmlFor="pass">
                                            Mot de passe
                                        </label>
                                        <div className={`w-full relative  bg-transparent`}
                                        >
                                            <input
                                                id="pass"
                                                type={typeText ? 'password' : 'text'}
                                                placeholder="Votre mot de passe"
                                                className={`border rounded pl-2 py-2 pr-7 w-full  bg-transparent outline-none focus:border focus:border-orange-700 ${animationClassPass}`}
                                                ref={passRef}
                                                value={isPass}
                                                onChange={(e) => setIsPass(e.target.value)}
                                            />
                                            <div className='absolute right-0  cursor-pointer p-3 flex justify-center items-center top-2'>

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
                                </div>
                                <div className="flex justify-end items-center relative">
                                    {boutLoading ? (
                                        <>
                                            <label className="  cursor-pointer w-max relative  flex justify-center  items-center   bg-blue-800 pointer-events-none   p-2 rounded  text-white">
                                                <input type="submit" id="send" value='Se connecter' className='cursor-pointer' />
                                                <i class="bi bi-send ml-2 "></i>
                                                <div className='absolute bg-transparent pt-4   w-full h-full flex justify-center items-center z-50'>
                                                    <FadeLoader
                                                        color="rgb(255, 255, 255)"
                                                        height={10}
                                                        margin={-9}
                                                        radius={100}
                                                        speedMultiplier={1}
                                                        width={1}
                                                    /></div>
                                            </label>
                                        </>
                                    ) : (<>
                                        <label for="send" className=" cursor-pointer w-max  max-sm:text-[12px] flex justify-end  bg-orange-700   p-2 rounded  text-white">
                                            <input type="submit" id="send" value='Se connecter' className='cursor-pointer'></input>
                                            <i class="bi bi-send ml-2 "></i>
                                        </label>
                                    </>)}

                                </div>
                            </form>
                        </div>
                        <div className="pl-3 max-sm:text-[11px] text-gray-500">Vous n'avez pas un compte ? <Link to='/ndandStudiesRegistrantAdminAfricanBrainAfricanHa' className='text-orange-600 cursor-pointer underline ml-2'> S'inscrire</Link></div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login;



