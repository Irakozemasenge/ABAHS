/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Popover, Sidenav, Whisper } from "rsuite";
function SlideAdmin({ getMenuMobille }) {
    const { pathname } = useLocation()
    let acceuil = /^\/acceuil.*/
    let bourse = /^\/bourse.*/
    let etude = /^\/etude.*/
    let travail = /^\/travail.*/
    let event = /^\/event.*/
    let visa = /^\/visa.*/
    let partenaire = /^\/partenaire.*/


    const [mobile, SetMobile] = useState(window.innerWidth < 1292)
    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 1292)
            SetMobile11(window.innerWidth < 501)
        }

        window.addEventListener('resize', hundleSize)

        return () => window.removeEventListener('resize', hundleSize)
    }, [])


    return (
        <>
            <div className={`  border-r-2 border-orange-800 w-[15em]  overflow-y-auto overflow-x-hidden min-w-[13em] ${mobile ? 'fixed  z-[100]' : ''} ${getMenuMobille ? 'left-0' : '-left-full'} transition-all duration-300 ${mobile11 ? 'top-[10vh] h-[90vh]' : 'top-[15vh] h-[87vh]'} `}>
                <Sidenav size='13em' placement="left" style={{ height: '100%' }} >
                    <div className="p-1 mb-5 border-b border-white">
                        <div class="flex-1 flex flex-col pt-5 overflow-x-hidden pb-4 overflow-y-auto">
                            <div class="flex-1 px-1 h-full  divide-y space-y-1">
                                <ul class="space-y-2 pb-2">
                                    {acceuil.test(pathname) || pathname === "/" ? (
                                        <Link className="hover:no-underline focus:no-underline" to="/">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline rounded bg-orange-600 text-white  flex items-center p-2 group">
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
                                        <Link className="hover:no-underline focus:no-underline" to="/">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline no-underline text-inherit  hover:text-gray-400  flex items-center p-2 group">
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
                                            <Link className="hover:no-underline focus:no-underline" to="/bourse">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 group"
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
                                            <Link className="hover:no-underline focus:no-underline" to="/bourse">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group"
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
                                            <Link className="hover:no-underline focus:no-underline" to="/etude">
                                                <li>
                                                    <div
                                                        target="_blank"
                                                        class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 group"
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
                                            <Link className="hover:no-underline focus:no-underline" to="/etude">
                                                <li>
                                                    <div

                                                        class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group"
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
                                            <Link className="hover:no-underline focus:no-underline" to="/travail">
                                                <li>
                                                    <div class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 group">
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
                                            <Link className="hover:no-underline focus:no-underline" to="/travail">
                                                <li>
                                                    <div class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group">
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
                                        <Link className="hover:no-underline focus:no-underline" to="/event">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 group">
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
                                        <Link className="hover:no-underline focus:no-underline" to="/event">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group">
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
                                        <Link className="hover:no-underline focus:no-underline" to="/visa">
                                            <li>
                                                <div class="text-xl font-normal hover:no-underline rounded bg-orange-500 text-white  flex items-center p-2 ">
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
                                        <Link className="hover:no-underline focus:no-underline" to="/visa">
                                            <li>
                                                <div class="text-xl  font-normal hover:no-underline rounded  hover:text-gray-400 flex items-center p-2 group">

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
        </>
    );
}

export default SlideAdmin;





