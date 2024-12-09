/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { Popover, Radio, RadioGroup, Sidenav, Whisper } from 'rsuite';
import { Icon } from '@rsuite/icons';
function NavBarsAdmin({ GetValuesThemes }) {


    const [mobile, SetMobile] = useState(window.innerWidth < 858)
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 317)
    const [menu, SetMenue] = useState(false);

    useEffect(() => {

        const hundleSize = () => {
            SetMobile(window.innerWidth < 858)
            SetMobile1(window.innerWidth < 688)
            SetMobile2(window.innerWidth < 317)
            SetMenue(false)
        }
        const hundleclick = (e) => {
            SetMenue(false)
        }
        window.addEventListener('resize', hundleSize)
        window.addEventListener('click', hundleclick)


        return () => {
            window.removeEventListener('resize', hundleSize)
            window.removeEventListener('click', hundleclick)
        }
    }, [])


    const { pathname } = useLocation()
    let acceuil = /^\/acceuil.*/
    let bourse = /^\/bourse.*/
    let etude = /^\/etude.*/
    let travail = /^\/travail.*/
    let event = /^\/event.*/
    let visa = /^\/visa.*/
    let partenaire = /^\/partenaire.*/



    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 1292)
            SetMobile11(window.innerWidth < 501)
        }

        window.addEventListener('resize', hundleSize)

        return () => window.removeEventListener('resize', hundleSize)
    }, [])




    const deconnection = React.forwardRef((propos, ref) => (
        <svg {...propos} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi  bi-circle-half h-5 w-5" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
        </svg>

    ))

    const triggerRef = useRef();

    const close = () => triggerRef.current && triggerRef.current.close();


    const [isLoading, GetisLoading] = useState(true)
    const [isLoading1, GetisLoading1] = useState(true)
    const [isLoading2, GetisLoading2] = useState(true)
    const hundleLoading = () => {
        GetisLoading(false)
    }

    const hundleLoading1 = () => {
        GetisLoading1(false)

    }

    const hundleLoading2 = () => {
        GetisLoading2(false)

    }

    const LanguetriggerRef = useRef();

    const [isDark, GetisDark] = useState('light')
    const handleChange = (value) => {
        GetisDark(value);
        close()
        localStorage.setItem('isDark', value);
    };

    useEffect(() => {
        const storedValue = localStorage.getItem('isDark')
        if (storedValue) {
            GetisDark(storedValue);
        }

    }, [isDark]);

    GetValuesThemes(isDark)

    const Sun = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi w-5 h-5 bi-sun" viewBox="0 0 16 16">
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
        </svg>
    ));

    const Moon = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill h-7 y-7 cursor-pointer" viewBox="0 0 16 16">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
        </svg>
    ));

    const SemiMoon = React.forwardRef((props, ref) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half h-5 w-5" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
        </svg>
    ));


    return (
        <div className={`flex justify-between items-center px-2  border-b border-orange-600 w-full ${mobile1 ? 'h-[8vh]' : 'h-[13vh]'}`}>
            <div
                className={`sm:mx-2 mx-0.5 cursor-pointer h-max  p-1 text-white rounded bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-700 hover:to-orange-500 transition-all ${mobile ? 'block' : 'hidden'}`}>
                <div onClick={(e) => {
                    SetMenue(!menu);
                    e.stopPropagation()
                }}>

                    {menu ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </>
                    )}



                </div>
            </div>

            <div className='flex h-full  items-end'>
                <Link to='/' className='w-max h-full'>
                    <img src='image/ahahs.png' draggable={false} alt='     ' className='w-full h-full scale-[1.3] object-cover' />
                </Link>
            </div>
            <Link className={`mb-2 font-serif ${mobile1 ? 'hidden' : mobile ? 'text-[20px] ' : 'text-[30px] '}`}>
                <span className={`text-orange-500  mx-1 ${mobile ? 'text-[22px]' : 'text-[40px]'}`}>A</span>frican
                <span className={`text-orange-500  mx-1 ${mobile ? 'text-[22px]' : 'text-[40px]'}`}>B</span>rain
                <span className={`text-orange-500  mx-1 ${mobile ? 'text-[22px]' : 'text-[40px]'}`}>A</span>frican
                <span className={`text-orange-500  mx-1 ${mobile ? 'text-[22px]' : 'text-[40px]'}`}>H</span>and and
                <span className={`text-orange-500  mx-1 ${mobile ? 'text-[22px]' : 'text-[40px]'}`}>S</span>tudies
            </Link>
            <div className='h-full w-max  flex items-end'>
                <div className='h-full flex items-center ml-4'>
                    <div className='w-max h-max relative'>
                        <Whisper
                            placement='auto'
                            trigger='click'
                            ref={triggerRef}
                            speaker={
                                <Popover>
                                    <div>
                                        <div>
                                            <div class='w-24 h-24 relative border overflow-hidden'>

                                                {isLoading2 && <div className={`absolute  w-full z-[60]  h-full  pl-4 pt-2  top-0 left-0   flex items-center justify-center`}>
                                                    <FadeLoader
                                                        color="#36d7b7"
                                                        height={15}
                                                        width={2}
                                                        margin={-5}
                                                    />
                                                </div>
                                                }
                                                <img draggable='false' onLoad={hundleLoading2}
                                                    src="image/abhs.jpg" alt="    " className='w-full h-full object-cover' />
                                            </div>
                                            <Link onClick={() => close()} to='/compte' className=' mt-2 italic text-[20px]'>NDAYIZEYE Teleshpore </Link>
                                        </div>
                                        <div className="w-full h-[1px] my-2 bg-slate-300"></div>
                                        <p className="text-[17px] my-1 cursor-default">Thème</p>
                                        <RadioGroup name="radio-name" value={isDark} onChange={handleChange}>
                                            <label htmlFor="lumi" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDark === 'light' ? 'text-orange-600' : null}`}>
                                                <div className="flex items-center justify-start w-[15em]  ">
                                                    <div className="mr-2">
                                                        <Icon as={Sun} />
                                                    </div>
                                                    <div className="text-[18px]">Mode lumière</div>
                                                </div>
                                                <div className=" flex w-7"> <Radio id="lumi" checked={isDark === 'light'} value="light"></Radio></div>
                                            </label>
                                            <label htmlFor="sombe" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDark === 'dark' ? 'text-orange-600' : null}`}>
                                                <div className="flex items-center w-[15em] ">
                                                    <div className="mr-2"><Icon as={Moon} /></div>
                                                    <div className="text-[18px]">Mode sombre</div>
                                                </div>
                                                <div className=" flex w-7 "> <Radio id="sombe" checked={isDark === 'dark'} value="dark"></Radio></div>
                                            </label>

                                            <label htmlFor="contrast" className={`flex px-2 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center ${isDark === 'high-contrast' ? 'text-orange-600' : null}`}>
                                                <div className="flex  w-[15em] items-center">
                                                    <div className="mr-2"><Icon as={SemiMoon} /></div>
                                                    <div className="text-[17px]">Mode contraste</div>
                                                </div>
                                                <div className=" flex w-7 ">
                                                    <Radio id="contrast" checked={isDark === 'high-contrast'} value="high-contrast"></Radio></div>
                                            </label>
                                        </RadioGroup>
                                        <div className="w-full h-[1px] my-2 bg-slate-300"></div>
                                        <div className={`flex p-2 mb-1 rounded cursor-pointer hover:bg-[#ff910063] w-full justify-between items-center `}>
                                            <div className="flex  w-[15em] items-center">
                                                <div className="mr-2"><Icon as={deconnection} /></div>
                                                <div className="text-[17px]">Deconnecte</div>
                                            </div>
                                        </div>
                                    </div>

                                </Popover>
                            }
                        >
                            <div className="flex justify-end items-center h-full  mr-1 px-3">
                                <div className={`border  rounded-lg cursor-pointer relative overflow-hidden ${mobile1 ? 'w-[40px] h-[40px] ' : 'w-[50px] h-[50px] '}`}>

                                    {isLoading1 && <div className={`absolute  w-full z-[60]  h-full  pl-4 pt-2  top-0 left-0   flex items-center justify-center`}>
                                        <FadeLoader
                                            color="#36d7b7"
                                            height={mobile1 ? '' : 15}
                                            width={2}
                                            margin={-5}
                                        />
                                    </div>
                                    }
                                    <img draggable='false' onLoad={hundleLoading1}
                                        src="image.abahs.jpg" alt='    ' className='w-full h-full object-cover' />
                                </div>
                            </div>
                        </Whisper>
                    </div>            </div>
            </div>


            {/* Nav mobile */}
            <div className={`w-[14em] ${menu ? 'left-0' : '-left-full'} transition-all fixed z-[200000000000] top-[13vh] max-sm:top-[8vh]  h-full  border-r-2 border-orange-300  flex-col items-center ${mobile ? 'flex' : 'hidden'} `}>
                <Sidenav size='13em' placement="left" style={{ height: '100%' }} >
                    <div className="p-1 mb-5 border-b border-white">
                        <div class="flex-1 flex flex-col pt-5 overflow-x-hidden pb-4 overflow-y-auto">
                            <div class="flex-1 px-1 h-full  divide-y space-y-1">
                                <ul class="space-y-2 pb-2">
                                    {acceuil.test(pathname) || pathname === "/" ? (
                                        <Link to="/">
                                            <li>
                                                <div class="text-xl font-normal rounded bg-orange-600 text-white  flex items-center p-2 group">
                                                    <svg
                                                        class="w-6 h-6 text-white transition duration-75"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Accueil
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link to="/">
                                            <li>
                                                <div class="text-xl  font-normal no-underline text-inherit  hover:text-gray-400  flex items-center p-2 group">
                                                    <svg
                                                        class="w-6 h-6  transition duration-75"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Accueil
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    <Whisper
                                        placement='auto'
                                        trigger='hover'
                                        speaker={
                                            <Popover className="font-extrabold font-serif text-[20px]">
                                                Recherche de  la bourse à l'etranger
                                            </Popover>
                                        }
                                    >
                                        {bourse.test(pathname) ? (
                                            <Link to="/bourse">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl font-normal rounded bg-orange-500 text-white  flex items-center p-2 group"
                                                    >                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z" />
                                                            <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z" />
                                                        </svg>
                                                        <span class="ml-3 flex-1 whitespace-nowrap">
                                                            Bourse
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        ) : (
                                            <Link to="/bourse">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl  font-normal rounded  hover:text-gray-400 flex items-center p-2 group"
                                                    >


                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z" />
                                                            <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z" />
                                                        </svg>
                                                        <span class="ml-3 flex-1 text-nowrap">
                                                            Bourse
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        )}
                                    </Whisper>


                                    <Whisper
                                        placement='auto'
                                        trigger='hover'
                                        speaker={
                                            <Popover className="font-extrabold font-serif text-[20px]">
                                                Recherche d'Etudes à l'etranger
                                            </Popover>
                                        }
                                    >
                                        {etude.test(pathname) ? (
                                            <Link to="/etude">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl font-normal rounded bg-orange-500 text-white  flex items-center p-2 group"
                                                    >    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                                        </svg>

                                                        <span class="ml-3 flex-1 whitespace-nowrap">
                                                            Etudes
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        ) : (
                                            <Link to="/etude">
                                                <li>
                                                    <div

                                                        class="text-xl  font-normal rounded  hover:text-gray-400 flex items-center p-2 group"
                                                    >

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                                        </svg>

                                                        <span class="ml-3 flex-1 text-nowrap">
                                                            Etudes
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        )}
                                    </Whisper>





                                    <Whisper placement='auto'
                                        trigger='hover'
                                        speaker={
                                            <Popover className="font-extrabold font-serif text-[20px]">
                                                Recherche le travali à l'etranger
                                            </Popover>
                                        }>
                                        {travail.test(pathname) ? (
                                            <Link to="/travail">
                                                <li>
                                                    <div class="text-xl font-normal rounded bg-orange-500 text-white  flex items-center p-2 group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                                        </svg>

                                                        <span class="ml-3 flex-1 whitespace-nowrap">
                                                            Travail
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        ) : (
                                            <Link to="/travail">
                                                <li>
                                                    <div class="text-xl  font-normal rounded  hover:text-gray-400 flex items-center p-2 group">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                            <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                                        </svg>

                                                        <span class="ml-3 flex-1 whitespace-nowrap">
                                                            Travail
                                                        </span>

                                                    </div>
                                                </li>
                                            </Link>
                                        )}
                                    </Whisper>

                                    {event.test(pathname) ? (
                                        <Link to="/event">
                                            <li>
                                                <div class="text-xl font-normal rounded bg-orange-500 text-white  flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Evénement
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link to="/event">
                                            <li>
                                                <div class="text-xl  font-normal rounded  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6  flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                                    </svg>

                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Evénement
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {visa.test(pathname) ? (
                                        <Link to="/visa">
                                            <li>
                                                <div class="text-xl font-normal rounded bg-orange-500 text-white  flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 te flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm7 6h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        VISA
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link to="/visa">
                                            <li>
                                                <div class="text-xl  font-normal rounded  hover:text-gray-400 flex items-center p-2 group">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 te flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm7 6h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        VISA
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}

                                    {partenaire.test(pathname) ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/partenaire">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 te flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Partenaire
                                                    </span>
                                                </div>
                                            </li>
                                        </Link>
                                    ) : (
                                        <Link className="hover:no-underline focus:no-underline" to="/partenaire">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 te flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                                    </svg>
                                                    <span class="ml-3 flex-1 whitespace-nowrap">
                                                        Partenaire
                                                    </span>

                                                </div>
                                            </li>
                                        </Link>
                                    )}
                                </ul>
                                <a href="mailto:btr.dev@burundientempsreel.com" className=" text-orange-600 cursor-pointer hover:text-gray-600 py-2 mb-4  flex pl-5 items-center">
                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mr-3 h-6 w-6 bi-question-diamond-fill" viewBox="0 0 16 16">
                                        <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM5.495 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
                                    </svg></div>
                                    <div>
                                        Aide
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </Sidenav>
            </div>
        </div>

    )
}

export default NavBarsAdmin
