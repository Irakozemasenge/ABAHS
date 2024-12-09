import React from "react";

function Whate({ Seregitrant }) {
    return (
        <div className="w-full flex flex-col items-center  mt-5 ">
            <div className="w-[95%] border flex flex-col items-end rounded-xl my-3  p-3 bg-gray-50">
                <div className="text-center w-full text-orange-700  strockText border-b pb-2">
                    Ce quoi ABAHS
                </div>
                <div className="sm:text-[30px] text-center">
                    ABAHS est une plateforme de recherche de bourses d'étude, étude qui connecte les
                    étudiants aux bourses universitaires, aux bourses des écoles de
                    métiers et aux outils d'aide financière et celui qui veulent de travail à l'étrange. Notre objectif est de vous
                    aider à trouver des bourses pour rendre le collège ou l’école
                    professionnelle plus abordable.
                </div>
            </div>
        </div>
    );
}

export default Whate;
