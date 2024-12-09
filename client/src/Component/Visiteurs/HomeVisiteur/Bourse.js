import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Bourse() {
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
        <div className={`flex sm:p-5 my-5 ${mobile1 ? 'flex-col' : ''}`}>
            <div className={`h-max p-2 ${mobile1 ? 'w-full' : 'w-1/2'} `}>
                <div className={`font-serif text-gray-400 ${mobile ? 'text-[16px]' : 'text-[20px]'} `}>Comment fonctionne ABAHS</div>
                <div className={`font-serif text-orange-900 ${mobile ? 'text-[20px]' : 'text-[30px]'} `}>Découvrez les bourses qui vous conviennent</div>
                <div className="w-full h-full rounded-xl overflow-hidden">
                    <img className="w-full h-full" src='image/Image.jpg' alt="    " />
                </div>
            </div>
            <div className={`h-max  ${mobile1 ? 'w-full p-3' : 'w-1/2 ml-5 p-2'} `}>
                <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
                    <div className={`${mobile ? 'text-[20px] ' : 'text-[30px]'} font-bold`}>1. Créez votre compte</div>
                    Après votre inscription, vous personnaliserez votre compte en répondant à quelques questions.
                </div>
                <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
                    <div className={`${mobile ? 'text-[20px] ' : 'text-[30px]'} font-bold`}> 2. Obtenez des bourses d'études instantanées</div>
                    En utilisant votre profil unique, vous obtiendrez une liste de bourses auxquelles vous êtes admissible en fonction de vos points forts, de vos intérêts, de vos activités étudiantes et de vos compétences.
                </div>
                <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
                    <div className={`${mobile ? 'text-[20px] ' : 'text-[30px]'} font-bold`}>3.Postulez. Obtenez de l'argent pour l'université !</div>
                    Chaque fois que vous vous connectez, vous êtes accueilli avec de nouvelles bourses d'études et la valeur totale des bourses auxquelles vous êtes admissible ! Filtrez votre liste, enregistrez ceux qui vous intéressent et commencez à postuler pour des bourses.
                </div>
                <Link to='/bourse' className="w-max block h-max px-2 py-1 cursor-pointer font-extrabold ">
                    Voir les bourses
                </Link>
            </div>
        </div>
    )
}

export default Bourse
