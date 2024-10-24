import { nanoid } from 'nanoid'

const data = [
    {
        id:nanoid(),
        question: "How would one say goodbye in Spanish?",
        answers: ['Adiós','Hola','Au Revoir','Salir']

    },
    {
        id:nanoid(),
        question: "Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
        answers: ['Cabbage Patch Kids','Transformers','Care Bears','Rubik’s Cube']
    },
    {
        id:nanoid(),
        question: "What is the hottest planet in our Solar System?",
        answers: ['Mercury','Venus','Mars','Saturn']
    },
    {
        id:nanoid(),
        question: "In which country was the caesar salad invented?",
        answers: ['Italy','Portugal','Mexico','France']

    },
    {
         id:nanoid(),
         question: "How Many Hearts Does An Octopus Have?",
         answers: ['One','Two','Three','Four']
    }
]

export default data