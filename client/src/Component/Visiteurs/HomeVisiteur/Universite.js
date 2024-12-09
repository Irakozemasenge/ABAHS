import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Universite() {
    const [mobile, Setmobile] = useState(window.innerWidth < 1251);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1251)
            Setmobile1(window.innerWidth < 804)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`flex  flex-row-reverse  sm:p-5 my-5 ${mobile1 ? 'flex-col' : ''}`}>
            <div className={`h-max p-2 ${mobile1 ? 'w-full' : 'w-1/2'} `}>
                <div className={`font-serif text-gray-400 ${mobile ? 'text-[16px]' : 'text-[20px]'} `}>Comment fonctionne ABAHS</div>
                <div className={`font-serif text-orange-900 ${mobile ? 'text-[20px]' : 'text-[30px]'} `}>Poursuivez Vos Études à l'Université</div>
                <div className="w-full h-full rounded-xl overflow-hidden">
                    <img className="w-full h-full" src='image/Université.jpg' alt="    " />
                </div>
            </div>
            <div className={`h-max  ${mobile1 ? 'w-full p-3' : 'w-1/2 ml-5 p-2'} `}>
                <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
                    <div className={`${mobile ? 'text-[20px] ' : 'text-[30px]'} font-bold`}>1. Créez votre compte</div>
                    Après votre inscription, vous personnaliserez votre compte en répondant à quelques questions.
                </div>
                <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
                    Nous croyons que chaque individu mérite la
                    chance de poursuivre ses études et de réaliser
                    son plein potentiel académique. Que vous soyez un
                    étudiant désireux d'approfondir vos connaissances dans un domaine spécifique ou un
                    professionnel en reconversion cherchant à acquérir de nouvelles compétences, notre
                    plateforme vous offre les outils nécessaires pour atteindre vos objectifs éducatifs.
                </div>
                <Link to='/universite' className="w-max block h-max px-2 py-1 cursor-pointer font-extrabold">
                    Voir plus des études
                </Link>
            </div>
        </div>
    )
}

export default Universite
