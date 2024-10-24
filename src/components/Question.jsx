import { nanoid } from "nanoid"
import {useState} from 'react'
import he from 'he';

export default function Question (props){

    const [answers, setAnswers] = useState(props.allAnswers)


    const answersButtons = answers.map(
        (answer, index) => {

            let styles = {
                backgroundColor: answer.isHold ? 'var(--isHeld-bg-color)' : 'revert-layer',
                color: answer.isHold ? 'var(--focused-btn-color)' : 'revert-layer'
            }

            if (props.isCheckAnswers) {
                if(answer.isHold && answer.isCorrect) {
                    styles = {backgroundColor:'#94D7A2', color: 'var(--focused-btn-color)' }
                
                } else if (answer.isHold && answer.isCorrect === false) {
                    styles = { backgroundColor: '#F8BCBC', opacity: '50%', border: 'none', color: 'var(--focused-btn-color)' };
                
                } else if (answer.isCorrect){
                    styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)' };
                
                } else if (answer.isCorrect === false){
                    styles = { opacity: '50%' };
                }

            }
        return  (
            <button 
                key = {nanoid()}
                className='question__btn'
                style={styles}
                onClick={() => props.updateHold(props.qID, answer.id)}
            >{he.decode(answers[index].value)}</button>
    )})

    return (
        <div className='question__component'>
            <h3 className='question__question'>
                {he.decode(props.question)}
            </h3>
            <div className='question__btnctr'>
                {answersButtons}   
            </div> 
        </div>
                 
    )
}