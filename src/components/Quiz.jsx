import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from 'nanoid'

export default function Quiz () {

    const url = 'https://opentdb.com/api.php?amount=6&type=multiple'
  
    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const [resetQuiz, setResetQuiz] = useState(0)
    const [isCheckAnswers, setCheckAnswers] = useState(false)


    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => setQuestions(() => {

                return data.results.map(question => {
                    const incorrect = question.incorrect_answers.map(answer => {
                    return {value: answer, id: nanoid(), isHold: false, isCorrect: false};
                });

                const correct = {value: question.correct_answer, id:nanoid(), isHold:false, isCorrect: true}
                let allAnswersArr = [...incorrect];
                const randomNum = Math.floor(Math.random() * 4);
                allAnswersArr.splice(randomNum,0,correct)

                return {...question, allAnswers:allAnswersArr, qid:nanoid()}
                });
            }))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
      }, [resetQuiz])


    function updateButtonHold (qID, aID) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if (qID === question.qid){
                    const newAnswers = question.allAnswers.map(answer => {
                        return answer.id === aID
                                ? {...answer,isHold: !answer.isHold}
                                : {...answer,isHold: false} 
                    })
                return {...question, allAnswers: newAnswers}
                } else {
                    return question;
                }
            });
        });
    };

    function checkAnswers (){
        setCheckAnswers(true)
    }

    function reset (){
        setCheckAnswers(false)
        setResetQuiz(prev => prev + 1)
    }

    let score = 0
    if (isCheckAnswers){
        questions.map(question => {
            return question.allAnswers.forEach(answer => {
                return answer.isHold && answer.isCorrect ? score++ : score
            });
        })
    }

    let buttonElements = isCheckAnswers
        ?
        <div className="quiz__footer">
            <p className="quiz__finalText">Your scored {score} / {questions.length} correct answers </p>
            <button 
                className='check-button'
                onClick={reset}
            >Reset</button>
        </div>
        :
        <div className="quiz__footer">
            <button 
                className='check-button'
                onClick={checkAnswers}
            >Check answers</button>
        </div>
    
    const questionElem = questions.map(question => (
        <Question
            key={nanoid()}
            qID = {question.qid}
            allAnswers = {question.allAnswers}
            question = {question.question}
            updateHold = {updateButtonHold}
            isCheckAnswers = {isCheckAnswers}

        />
        ))
    
 
    return (
    
        <div className='quiz'>
            {
                isLoading
                ?
                <div className='quiz__loadingBox'>
                    <h3 className='quiz__loadingText'>One moment please...</h3>
                </div>
                :
                <>
                    <div className='quiz__header'>
                    <h2 className='logo'>  Quizzical</h2>
                    </div>    
                    <div className="quiz__answers">
                        {questionElem}
                        {buttonElements}
                    </div>
                </>
            }
        </div>
)};
