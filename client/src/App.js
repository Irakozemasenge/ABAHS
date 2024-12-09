/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import 'rsuite/dist/rsuite.min.css';
import 'animate.css/animate.min.css';
import { CustomProvider, Popover, Whisper } from 'rsuite';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import NavBarsVisiteur from './Component/Visiteurs/NavBarsVisiteur/NavBarsVisiteur'
import HomeVisiteurComponent from './Component/Visiteurs/HomeVisiteur/HomeVisiteurComponent';
import FootentContent from './Component/Visiteurs/Footer/FootentContent';
import BourseVisiteur from './Component/Visiteurs/BourseVisiteur/BourseVisiteur';
import UniversiteVisiteur from './Component/Visiteurs/UniversiteVisiteur/UniversiteVisiteur';
import TravailVisiteurs from './Component/Visiteurs/TravailVisiteurs/TravailVisiteurs';
import EvenentVisiteur from './Component/Visiteurs/EvenentVisiteur/EvenentVisiteur';
import AproposVivisiteur from './Component/Visiteurs/AproposVivisiteur/AproposVivisiteur';
import UniversiteVisiteurDeatil from './Component/Visiteurs/UniversiteVisiteur/UniversiteVisiteurDeatil';
import { ToastContainer } from 'react-toastify';



// admin
import NavBarsAdmin from './Component/Admin/NavBarsAdmin/NavBarsAdmin';
import AcceuiAdminCompoent from './Component/Admin/AcceuiAdmin/AcceuiAdminCompoent';
import BourceAdminComponent from './Component/Admin/BourceAdmin/BourceAdminComponent';
import BourceAdminDetailComponent from './Component/Admin/BourceAdmin/BourceAdminDetailComponent';
import AjouterBourseAdminCompoenent from './Component/Admin/BourceAdmin/AjouterBourseAdminCompoenent';
import BourseCommandeComponent from './Component/Admin/BourceAdmin/BourseCommandeComponent';
import BourseValidCompnent from './Component/Admin/BourceAdmin/BourseValidCompnent';
import BourseInvalidCompenent from './Component/Admin/BourceAdmin/BourseInvalidCompenent';
import BourceAdminModifComponent from './Component/Admin/BourceAdmin/BourceAdminModifComponent';
import BourseCommandeDetailComponent from './Component/Admin/BourceAdmin/BourseCommandeDetailComponent';
import BourseValidComponent from './Component/Admin/BourceAdmin/BourseValidComponent';
import BourseInvalidDetailComponent from './Component/Admin/BourceAdmin/BourseInvalidDetailComponent';


import AdminEtudeComponent from './Component/Admin/UniverAdmin/AdminEtudeComponent';
import AdminEtudeDetailComponent from './Component/Admin/UniverAdmin/AdminEtudeDetailComponent';
import AdminModifEtudeComponent from './Component/Admin/UniverAdmin/AdminModifEtudeComponent';
import AjouterEtudeAdminCompoenent from './Component/Admin/UniverAdmin/AjouterEtudeAdminCompoenent';
import CommandeEtudeComponent from './Component/Admin/UniverAdmin/CommandeEtudeComponent';
import CommandeEtudeDetailComponent from './Component/Admin/UniverAdmin/CommandeEtudeDetailComponent';
import EtudeValidCompnent from './Component/Admin/UniverAdmin/EtudeValidCompnent';
import EtudeValidDetailComponent from './Component/Admin/UniverAdmin/EtudeValidDetailComponent';
import EtudeInvalidCompenent from './Component/Admin/UniverAdmin/EtudeInvalidCompenent';
import EtudeInvalidDetailComponent from './Component/Admin/UniverAdmin/EtudeInvalidDetailComponent';


import AdminTravailComponent from './Component/Admin/TravailAdmin/AdminTravailComponent';

import AjouterTravailAdminCompoenent from './Component/Admin/TravailAdmin/AjouterTravailAdminCompoenent';
import CommandeTravailComponent from './Component/Admin/TravailAdmin/CommandeTravailComponent';
import CommandeTravailDetailComponent from './Component/Admin/TravailAdmin/CommandeTravailDetailComponent';
import TravailInvalidCompenent from './Component/Admin/TravailAdmin/TravailInvalidCompenent';
import TravailInvalidDetailComponent from './Component/Admin/TravailAdmin/TravailInvalidDetailComponent';
import TravailValidCompnent from './Component/Admin/TravailAdmin/TravailValidCompnent';
import TravilValidDetailComponent from './Component/Admin/TravailAdmin/TravilValidDetailComponent';


import EventAdminComponent from './Component/Admin/EventAdmin/EventAdminComponent';
import EventAdmindetailComponent from './Component/Admin/EventAdmin/EventAdmindetailComponent';
import AjouterEventAdminComponent from './Component/Admin/EventAdmin/AjouterEventAdminComponent';
import DetailTitreEvenetComponent from './Component/Admin/EventAdmin/DetailTitreEvenetComponent';
import EditorAdminEventCompoenent from './Component/Admin/EventAdmin/EditorAdminEventCompoenent';


import AdminCompteComponent from './Component/Admin/AdminCompte/AdminCompteComponent';
import AdminCompteModifierComponet from './Component/Admin/AdminCompte/AdminCompteModifierComponet';
import VisaAdminComponent from './Component/Admin/VisaAdmin/VisaAdminComponent';
import VisaAdminDetailComponent from './Component/Admin/VisaAdmin/VisaAdminDetailComponent';
import VisaAdminAjoutComponent from './Component/Admin/VisaAdmin/VisaAdminAjoutComponent';
import VisaAdminCommandeComponent from './Component/Admin/VisaAdmin/VisaAdminCommandeComponent';
import VisaAdminCommandeDetailComponent from './Component/Admin/VisaAdmin/VisaAdminCommandeDetailComponent';
import VisaAdminModifierComonent from './Component/Admin/VisaAdmin/VisaAdminModifierComonent';
import AdmiVisaArchiveComponent from './Component/Admin/VisaAdmin/AdmiVisaArchiveComponent';
import AdmiVisaArchiveDetailComponent from './Component/Admin/VisaAdmin/AdmiVisaArchiveDetailComponent';
import VisaVisiteur from './Component/Visiteurs/Visa/VisaVisiteur';
import BoursePostuler from './Component/Visiteurs/BourseVisiteur/BoursePostuler';
import TravailVisiteursPostule from './Component/Visiteurs/TravailVisiteurs/TravailVisiteursPostule';
import PartenaireAdmiComponent from './Component/Admin/Partenaire/PartenaireAdmiComponent';
import AjoutPartenaireAdminComponent from './Component/Admin/Partenaire/AjoutPartenaireAdminComponent';
import ModifierPartenaireAdminComponent from './Component/Admin/Partenaire/ModifierPartenaireAdminComponent';
import DetailPartenaireAdminComponent from './Component/Admin/Partenaire/DetailPartenaireAdminComponent';
import VisaVisiteurExist from './Component/Visiteurs/Visa/VisaVisiteurExist';
import VisaVisiteurDeatil from './Component/Visiteurs/Visa/VisaVisiteurDeatil';

import BourceAdminAddCritereComponent from './Component/Admin/BourceAdmin/BourceAdminAddCritereComponent';
import BourceAdminAddAvantageComponent from './Component/Admin/BourceAdmin/BourceAdminAddAvantageComponent';

import AdminTravailJobsDetailComponent from './Component/Admin/TravailAdmin/AdminTravailJobsDetailComponent';
import AdminTravailJobsModifierComponent from './Component/Admin/TravailAdmin/AdminTravailJobsModifierComponent';

import EtudeAdminAddAvantageComponent from './Component/Admin/UniverAdmin/EtudeAdminAddAvantageComponent';
import EtudeAdminAddCritereComponent from './Component/Admin/UniverAdmin/EtudeAdminAddCritereComponent';
import TravailAdminAddAvantageComponent from './Component/Admin/TravailAdmin/TravailAdminAddAvantageComponent';
import Login from './Component/Visiteurs/Formaire/Login';
import Registrant from './Component/Visiteurs/Formaire/Registrant';



function App() {

    const [visit, Setvisitor] = useState(true)
    const [getThemes, SetgetThemes] = useState()

    const GetValuesThemes = (e) => {
        SetgetThemes(e)
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

    return visit ? (
        <CustomProvider theme='light'>
            <Router>
                <div className='w-full h-screen relative overflow-hidden'>
                    <NavBarsVisiteur />
                    <div className={`w-full ${mobile ? ' h-[92vh]' : ' h-[87vh]'} overflow-x-hidden overflow-y-auto`}>
                        <Routes>
                            <Route path='/' element={<HomeVisiteurComponent />} />
                            <Route path='/acceuil' element={<HomeVisiteurComponent />} />
                            <Route path='/acceuil' element={<HomeVisiteurComponent />} />
                            <Route path='/bourse' element={<BourseVisiteur />} />
                            <Route path='/bourse/postuler/:id' element={<BoursePostuler />} />
                            <Route path='/universite' element={<UniversiteVisiteur />} />
                            <Route path='/universite/postuler/:id' element={<UniversiteVisiteurDeatil />} />
                            <Route path='/travail' element={<TravailVisiteurs />} />
                            <Route path='/travail/postuler/:id' element={<TravailVisiteursPostule />} />
                            <Route path='/evenement' element={<EvenentVisiteur />} />
                            <Route path='/VisaVisiteur' element={<VisaVisiteur />} />
                            <Route path='/VisaVisiteur/exist' element={<VisaVisiteurExist />} />
                            <Route path='/VisaVisiteur/exist/detail/:id' element={<VisaVisiteurDeatil />} />
                            <Route path='/propos' element={<AproposVivisiteur />} />
                            <Route path='/ndandStudiesRegistrantAdminAfricanBrainAfricanHa' element={<Registrant />} />
                            <Route path='/ndandStudiesLoginAdminAfricanBrainAfricanHa' element={<Login />} />


                        </Routes>
                        <FootentContent />
                    </div>
                    <div className='fixed z-[99] bottom-[5em] rotate-90 cursor-pointer flex -left-[4em] p-2  rounded bg-[#00000052]'>
                        <Link target='_blank' to='https://www.facebook.com/profile.php?id=100091378817785' className='bg-blue-100 text-blue-700 rounded -rotate-90 p-2 m-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                        </Link>
                        <div className='bg-red-100 text-red-700 cursor-pointer rounded -rotate-90 p-2 m-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                            </svg>
                        </div>
                        <div className='bg-gray-100 text-gray-700 cursor-pointer rounded -rotate-90 p-2 m-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                            </svg>
                        </div>
                        <Whisper
                            placement='auto'
                            trigger='click'
                            speaker={
                                <Popover>
                                    <div className='flex items-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                        </svg>
                                        <a className='ml-2 text-black' href='tel:+257 62681085'>+257 62681085</a>
                                    </div>
                                    <div className='flex items-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                        <a className='ml-2 text-black' href='whatsapp://send?phone=+257 79590565'>+257 79590565</a>
                                    </div>

                                    <div className='flex items-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                        <a className='ml-2 text-black' href='whatsapp://send?phone=+257 71814114'>+257 71814114</a>
                                    </div>
                                    <div className='flex items-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                        <a className='ml-2 text-black' href='whatsapp://send?phone=+257 72487698'>+257 72487698</a>
                                    </div>
                                </Popover>
                            }
                        >
                            <div className='bg-green-100 text-green-700 cursor-pointer rounded -rotate-90 p-2 m-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg>
                            </div>
                        </Whisper>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </CustomProvider>
    ) : (
        <>
            <CustomProvider theme={getThemes}>
                <Router>
                    <div className='w-full h-screen relative overflow-hidden'>
                        <NavBarsAdmin GetValuesThemes={GetValuesThemes} />
                        <Routes>
                            <Route path='/' element={<AcceuiAdminCompoent />} />
                            <Route path='/acceuil' element={<AcceuiAdminCompoent />} />
                            <Route path='/bourse' element={<BourceAdminComponent />} />
                            <Route path='/bourse/detail/:id' element={<BourceAdminDetailComponent />} />
                            <Route path='/bourse/modifier/:id' element={<BourceAdminModifComponent />} />
                            <Route path='/bourse/ajoutcritere/:id' element={<BourceAdminAddCritereComponent />} />
                            <Route path='/bourse/ajoutavantage/:id' element={<BourceAdminAddAvantageComponent />} />
                            <Route path='/bourse/ajouter' element={<AjouterBourseAdminCompoenent />} />
                            <Route path='/bourse/command' element={<BourseCommandeComponent />} />
                            <Route path='/bourse/command/detail/:id' element={<BourseCommandeDetailComponent />} />
                            <Route path='/bourse/valid' element={<BourseValidCompnent />} />
                            <Route path='/bourse/valid/detail/:id' element={<BourseValidComponent />} />
                            <Route path='/bourse/archive' element={<BourseInvalidCompenent />} />
                            <Route path='/bourse/archive/detail/:id' element={<BourseInvalidDetailComponent />} />

                            <Route path='/etude' element={<AdminEtudeComponent />} />
                            <Route path='/etude/detail/:id' element={<AdminEtudeDetailComponent />} />
                            <Route path='/etude/modifier/:id' element={<AdminModifEtudeComponent />} />
                            <Route path='/etude/ajoutcritere/:id' element={<EtudeAdminAddCritereComponent />} />
                            <Route path='/etude/ajoutavantage/:id' element={<EtudeAdminAddAvantageComponent />} />
                            <Route path='/etude/ajouter' element={<AjouterEtudeAdminCompoenent />} />
                            <Route path='/etude/command' element={<CommandeEtudeComponent />} />
                            <Route path='/etude/command/detail/:id' element={<CommandeEtudeDetailComponent />} />
                            <Route path='/etude/valid' element={<EtudeValidCompnent />} />
                            <Route path='/etude/valid/detail/:id' element={<EtudeValidDetailComponent />} />
                            <Route path='/etude/archive' element={<EtudeInvalidCompenent />} />
                            <Route path='/etude/archive/detail/:id' element={<EtudeInvalidDetailComponent />} />

                            <Route path='/travail' element={<AdminTravailComponent />} />
                            <Route path='/travail/detail/:id' element={<AdminTravailJobsDetailComponent />} />
                            <Route path='/travail/modifier/:id' element={<AdminTravailJobsModifierComponent />} />
                            <Route path='/travail/ajouter' element={<AjouterTravailAdminCompoenent />} />
                            <Route path='/travail/ajoutavantages/:id' element={<TravailAdminAddAvantageComponent />} />
                            <Route path='/travail/command' element={<CommandeTravailComponent />} />
                            <Route path='/travail/command/detail/:id' element={<CommandeTravailDetailComponent />} />
                            <Route path='/travail/valid' element={<TravailValidCompnent />} />
                            <Route path='/travail/valid/detail/:id' element={<TravilValidDetailComponent />} />
                            <Route path='/travail/archive' element={<TravailInvalidCompenent />} />
                            <Route path='/travail/archive/detail/:id' element={<TravailInvalidDetailComponent />} />

                            <Route path='/event' element={<EventAdminComponent />} />
                            <Route path='/event/Detail/:id' element={<EventAdmindetailComponent />} />
                            <Route path='/event/ajouter' element={<AjouterEventAdminComponent />} />
                            <Route path='/event/detailTitre' element={<DetailTitreEvenetComponent />} />
                            <Route path='/event/edit/:id' element={<EditorAdminEventCompoenent />} />

                            <Route path='/visa' element={<VisaAdminComponent />} />
                            <Route path='/visa/detail/:id' element={<VisaAdminDetailComponent />} />
                            <Route path='/visa/Modifier/:id' element={<VisaAdminModifierComonent />} />
                            <Route path='/visa/ajouter' element={<VisaAdminAjoutComponent />} />
                            <Route path='/visa/command' element={<VisaAdminCommandeComponent />} />
                            <Route path='/visa/command/detail/:id' element={<VisaAdminCommandeDetailComponent />} />
                            <Route path='/visa/archive' element={<AdmiVisaArchiveComponent />} />
                            <Route path='/visa/archive/detail/:id' element={<AdmiVisaArchiveDetailComponent />} />

                            <Route path='/partenaire' element={<PartenaireAdmiComponent />} />
                            <Route path='/partenaire/modifier/:id' element={<ModifierPartenaireAdminComponent />} />
                            <Route path='/partenaire/detail/:id' element={<DetailPartenaireAdminComponent />} />
                            <Route path='/partenaire/ajoute' element={<AjoutPartenaireAdminComponent />} />

                            <Route path='/compte' element={<AdminCompteComponent />} />
                            <Route path='/compte/modifier' element={<AdminCompteModifierComponet />} />

                        </Routes>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </CustomProvider>
        </>
    )
}

export default App

