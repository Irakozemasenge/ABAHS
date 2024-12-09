import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Footer from '../../Visiteurs/Footer/Footer';
import axios from 'axios';

function AcceuiAdmin() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 630)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 430)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 630)
            SetMobile2(window.innerWidth < 430)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [dataResume, setDataResume] = useState({})

    useEffect(() => {
        axios.get("https://speedreal.abahs-jobconnect.com/stat/dataResume").then((rep) => {
            setDataResume(rep.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])


    return (
        <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[92vh]' : 'h-[87vh]'}`}>
            <div className='md:text-[40px] sm:text-[30px] strockText mb-5 p-2'>Tableau de bord</div>
            <div className='flex flex-col'>
                <div className={`w-[97%] flex ${mobile2 ? 'flex-col' : ''}`}>
                    <div className='w-[97%] m-2 rounded-md overflow-hidden border border-blue-600 bg-[#0000ff18]'>
                        <div className='text-[20px] p-3 text-blue-600 font-serif'>Bourse d'etude</div>
                        <div className='bg-[#0000ff8c] text-white p-3 flex justify-between'>
                            <div className='-rotate-[20deg]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-[4em]  h-[4em] flex-shrink-0   transition duration-75" viewBox="0 0 16 16">
                                    <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z" />
                                    <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z" />
                                </svg>

                            </div>
                            <div className='text-[3em]'>{dataResume.nombresBourse}</div>
                        </div>
                    </div>
                    <div className='w-[97%] m-2 rounded-md overflow-hidden border border-fuchsia-600 bg-[#ff00ff18]'>
                        <div className='text-[20px] p-3 text-fuchsia-600 font-serif'>Etude à l'étranger</div>
                        <div className='bg-[#ff00ff8c] text-white p-3 flex justify-between'>
                            <div className='rotate-[20deg]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-[4em]  h-[4em] flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                </svg>

                            </div>
                            <div className='text-[3em]'>{dataResume.nombresEtude}</div>
                        </div>
                    </div>
                </div>

                <div className={`w-[97%] flex ${mobile ? 'flex-col' : ''} mt-5`}>
                    <div className='w-[97%] m-2 rounded-md overflow-hidden border border-green-600 bg-[#00800018]'>
                        <div className='text-[20px] p-3 text-green-600 font-serif'>Travail à l'étranger</div>
                        <div className='bg-[#0080008c] text-white p-3 flex justify-between'>
                            <div className='rotate-[20deg]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-[4em] h-[4em] flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                </svg>
                            </div>
                            <div className='text-[3em]'>{dataResume.nombresTravail}</div>
                        </div>
                    </div>

                    <div className='w-[97%] m-2 rounded-md overflow-hidden border border-orange-600 bg-[#ffa60018]'>
                        <div className='text-[20px] p-3 text-yellow-600 font-serif'>Evénement</div>
                        <div className='bg-[#ffa6008c] text-white p-3 flex justify-between'>
                            <div className='rotate-[20deg]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-[4em] h-[4em] flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                    <path d="M9.402 10.246c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-4.118 9.79c1.258 0 2-1.067 2-2.872 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684c.047.64.594 1.406 1.703 1.406zm-2.89-5.435h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675V7.354z" />
                                </svg>
                            </div>
                            <div className='text-[3em]'>{dataResume.nombresEvenement}</div>
                        </div>
                    </div>

                    <div className='w-[97%] m-2 rounded-md overflow-hidden border border-[#62f844] bg-[#62f8441a]'>
                        <div className='text-[20px] p-3 text-[#62f844] font-serif'>VISA</div>
                        <div className='bg-[#62f8448c] text-white p-3 flex justify-between'>
                            <div className='rotate-[20deg]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-[4em] h-[4em] flex-shrink-0  transition duration-75" viewBox="0 0 16 16">
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm7 6h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </div>
                            <div className='text-[3em]'>{dataResume.nombreVisa}</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-[97%] p-2 m-1 border rounded-xl">
                <div className={`w-[97%] h-full flex justify-center`}>
                    <ApexChart donnees={dataResume} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AcceuiAdmin



class ApexChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: "Egale au nombre",
                    data: [
                        props.donnees && props.donnees.nombresBourse ? props.donnees.nombresBourse : 0,
                        props.donnees && props.donnees.nombresEtude ? props.donnees.nombresEtude : 0,
                        props.donnees && props.donnees.nombresTravail ? props.donnees.nombresTravail : 0,
                        props.donnees && props.donnees.nombresEvenement ? props.donnees.nombresEvenement : 0,
                        props.donnees && props.donnees.nombreVisa ? props.donnees.nombreVisa : 0,
                        props.donnees && props.donnees.nombresBpostule ? props.donnees.nombresBpostule : 0,
                        props.donnees && props.donnees.nombresSpostule ? props.donnees.nombresSpostule : 0,
                        props.donnees && props.donnees.nombresVpostule ? props.donnees.nombresVpostule : 0,
                        props.donnees && props.donnees.nombresTpostule ? props.donnees.nombresTpostule : 0,
                        props.donnees && props.donnees.nombresPartenaire ? props.donnees.nombresPartenaire : 0,
                    ]
                }
            ],
            options: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#ffa500']
                    }
                },
                stroke: {
                    curve: 'smooth',
                    colors: ['#ffa500']
                },
                title: {
                    text: 'Resumes général',
                    align: 'left',

                },
                labels: ["Recherche des bourse d'etude à l'étranger", "Recherche les études à l'étranger", "Recherche le tavail à l'étranger", 'Evénement', 'VISA', "Nombre de bourses postulées", "Nombre d'études payantes postulées", 'Nombre de séjours transversaux postulés', "Nombre de visas postulés", "Nombre de partenaires"],
                yaxis: {
                    opposite: false
                },
                legend: {
                    horizontalAlign: 'left'
                }
            }
        };
    }

    render() {
        return (
            <div className='w-[97%]'>
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={500} />
            </div>
        );
    }
}
