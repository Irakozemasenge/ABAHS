import React from 'react'
import AcceuiAdmin from './AcceuiAdmin'
import SlideAdmin from '../SlideAdmin/SlideAdmin'
function AcceuiAdminCompoent() {
    return (
        <div className='h-full w-full flex overflow-hidden'>
            <SlideAdmin />
            <AcceuiAdmin />
        </div>
    )
}

export default AcceuiAdminCompoent
