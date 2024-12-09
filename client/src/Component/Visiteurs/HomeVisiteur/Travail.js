import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Travail() {
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
        <div className={`font-serif text-gray-400 ${mobile ? 'text-[16px]' : 'text-[20px]'} `}>Comment fonctionne ABAHS pour le travail à l'étrange</div>
        <div className={`font-serif text-orange-900 ${mobile ? 'text-[20px]' : 'text-[30px]'} `}> Explorez de Nouvelles Opportunités : Travailler à l'Étranger</div>
        <div className="w-full h-full rounded-xl overflow-hidden">
          <img className="w-full h-full" src='image/Travail.avif' alt="    " />
        </div>
      </div>
      <div className={`h-max  ${mobile1 ? 'w-full p-3' : 'w-1/2 ml-5 p-2'} `}>
        <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[20px]'}`}>
          Imaginez-vous travailler dans des pays exotiques,
          dans des villes animées et cosmopolites, ou dans des
          environnements professionnels innovants. Avec notre expertise et
          nos partenariats mondiaux, nous pouvons vous aider à réaliser ces rêves. Grâce à notre vaste
          réseau de contacts et à notre expérience dans le domaine de la mobilité internationale,
          nous sommes en mesure de vous guider vers les meilleures opportunités de carrière à l'étranger.
          <br />
          <br />
          Que vous soyez un professionnel expérimenté cherchant un nouveau défi ou un jeune
          diplômé désireux de vivre une aventure à l'étranger, notre équipe dévouée est là pour
          répondre à vos besoins. Nous proposons une gamme de services personnalisés, y compris
          l'assistance à la recherche d'emploi, la préparation des entretiens, la gestion des visas
          et bien plus encore. Nous nous engageons
          à vous fournir un soutien continu tout au long de votre voyage professionnel à l'étranger.
        </div>
        <Link to='/travail' className="w-max block h-max px-2 py-1 cursor-pointer font-extrabold ">
          Postuler
        </Link>
      </div>
    </div>
  )
}

export default Travail
