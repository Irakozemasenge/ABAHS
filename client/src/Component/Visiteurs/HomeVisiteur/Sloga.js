import React, { useEffect, useState } from 'react'

function Sloga() {
    const [mobile, Setmobile] = useState(window.innerWidth < 570);
    useEffect(() => {

        const hundleSize = () => {
            Setmobile(window.innerWidth < 570)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div
            className={`w-full  bg-transparent relative overflow-hidden ${mobile ? 'h-[35vh] ' : 'h-[60vh]'}`}>
            <div
                style={{
                    backgroundImage: 'url("image/mairie.jpg")',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',

                }}
                className={` h-[100vh]`}
            ></div>
            <div className={`${mobile ? 'top-5' : 'left-2'} absolute text-black flex top-3 w-full  rounded`}>
                <div className={`bg-[#ffffff69] rounded ${mobile ? 'w-[95%]' : 'w-[40em]'}  p-2 mx-2`}>
                    <div
                        className={` font-serif ${mobile ? 'text-[50px] w-full text-center text-wrap' : 'text-[100px]'}`}
                    >ABAHS
                    </div>
                    <div className={` font-serif ${mobile ? 'text-center text-[12px]' : 'text-[27px]'}`}>
                        <span className={`text-orange-700 ml-2 italic ${mobile ? '`text-[14px]' : '`text-[35px]'}`}>A</span>frican
                        <span className={`text-orange-700 ml-2 italic ${mobile ? '`text-[14px]' : '`text-[35px]'}`}>B</span>rain
                        <span className={`text-orange-700 ml-2 italic ${mobile ? '`text-[14px]' : '`text-[35px]'}`}>A</span>frican
                        <span className={`text-orange-700 ml-2 italic ${mobile ? '`text-[14px]' : '`text-[35px]'}`}>H</span>and and
                        <span className={`text-orange-700 ml-2 italic ${mobile ? '`text-[14px]' : '`text-[35px]'}`}>S</span>tudies
                    </div>
                    <div className={`text-orange-800 font-bold ${mobile ? 'text-center mt-3' : ''}`}>
                        ABAHS
                        est l'agence qui aide les citoyens de la CAE à obtenir un visa
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sloga
