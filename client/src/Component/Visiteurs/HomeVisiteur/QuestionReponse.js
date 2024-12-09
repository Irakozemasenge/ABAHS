import { Accordion, Placeholder } from 'rsuite';
import { FaAngleDoubleDown } from 'react-icons/fa';

const QuestionReponse = () => (
    <div className='w-full flex justify-center py-4'>
        <div className='w-[96%]  bg-green-50 rounded-lg'>
            <div className='sm:text-[30px] max-sm:text-center p-2 text-[15px] border-b pb-5 mb-1'>Question fréquemment posées sur les etudes à l'étrange </div>
            <Accordion bordered>
                <Accordion.Panel header={
                    <div className='font-bold max-sm:text-[12px] '>
                        Pourquoi avez-vous besoin de l'assistant
                    </div>
                } eventKey={1} caretAs={FaAngleDoubleDown}>
                    <Placeholder.Paragraph />
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className='font-bold max-sm:text-[12px]'>
                        Quelles sont les critères d'admissibilité pour une bourse d'études?
                    </div>
                } eventKey={2} caretAs={FaAngleDoubleDown}>
                    <div className='max-sm:text-[11px]'>
                        Pour postuler à une bourse d'études, vous devrez généralement remplir une demande en ligne sur le site de la bourse.<br /> Cette demande peut nécessiter des informations personnelles, des relevés de notes, des lettres de recommandation et une déclaration de motivation.<br /> Assurez-vous de respecter les délais de candidature et de fournir tous les documents requis.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className='font-bold max-sm:text-[12px] '>
                        Comment sont sélectionnés les bénéficiaires des bourses d'études?
                    </div>
                } eventKey={3} caretAs={FaAngleDoubleDown}>
                    <div className='max-sm:text-[11px]'>
                        Le processus de sélection des bénéficiaires de bourses d'études varie d'une bourse à l'autre. Il peut impliquer l'évaluation des candidatures par un comité de sélection, basée sur les critères d'admissibilité, les résultats académiques, les lettres de recommandation, la déclaration de motivation et d'autres facteurs pertinents. Certains programmes de bourses peuvent également inclure des entretiens ou des examens supplémentaires.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className='font-bold max-sm:text-[12px] '>
                        Quel est le montant des bourses d'études?
                    </div>
                } eventKey={4} caretAs={FaAngleDoubleDown}>
                    <div className='max-sm:text-[11px]'>
                        Le montant des bourses d'études peut varier considérablement en fonction de la bourse spécifique. Certaines bourses peuvent couvrir tous les frais de scolarité, les frais de subsistance et les livres, tandis que d'autres peuvent fournir une aide financière partielle. Il est important de lire attentivement les détails de chaque bourse pour comprendre le montant offert et les conditions associées.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className='font-bold max-sm:text-[12px] '>
                        Y a-t-il des bourses d'études spécifiques pour certains domaines d'études ?
                    </div>
                } eventKey={5} caretAs={FaAngleDoubleDown}>
                    <div className='max-sm:text-[11px]' >
                        Oui, il existe souvent des bourses d'études spécifiques pour certains domaines d'études tels que les sciences, la technologie, l'ingénierie, les mathématiques (STEM), les arts, les sciences sociales, etc. Ces bourses visent à soutenir les étudiants dans des domaines spécifiques où il peut y avoir une demande accrue ou un besoin de talents qualifiés.  </div>
                </Accordion.Panel>
            </Accordion>
        </div>
    </div>
);

export default QuestionReponse
