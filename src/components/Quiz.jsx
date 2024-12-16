import React, { useRef, useState } from 'react'
import '../components/quiz.css'
import { questions } from '../assets/questions'

export const Quiz = () => {


    let [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(questions[index])
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)

    const option1 = useRef(null)
    const option2 = useRef(null)
    const option3 = useRef(null)
    const option4 = useRef(null)
    const option_array = [option1, option2, option3, option4]


    const checkAns = (e, ans) => {
        if (lock == false) {
            if (question.ans == ans) {
                e.target.classList.add("correct")
                setLock(true)
                setScore(Prev => Prev + 1)
            } else {
                e.target.classList.add("wrong")
                setLock(true)
                option_array[question.ans - 1].current.classList.add("correct")
            }
        }

    }
    const handleNext = () => {
        if (lock == true) {
            if (index == questions.length - 1) {
                setResult(true)
                return 0

            }
            setIndex(++index)
            setQuestion(questions[index])
            setLock(false)
            option_array.map((Option) => {
                Option.current.classList.remove("wrong", "correct")
                return null
            })
        }
    }
    const handleReset = () => {
        setIndex(0)
        setQuestion(questions[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }

    return (
        <>

            <div className="container border shadow">
            <h1 className='text-center  mt-2'>Quiz Time!</h1>

                <hr />
                {result ? <></> : <>
                    <div className='text-dark'>
                        <h3 className='question text-center mb-4'>{index + 1}. {question.question}</h3>
                        <ul>
                            <li ref={option1} onClick={(e) => { checkAns(e, 1) }} className='answer '>{question.option1}</li>
                            <li ref={option2} onClick={(e) => { checkAns(e, 2) }} className='answer '>{question.option2}</li>
                            <li ref={option3} onClick={(e) => { checkAns(e, 3) }} className='answer '>{question.option3}</li>
                            <li ref={option4} onClick={(e) => { checkAns(e, 4) }} className='answer '>{question.option4}</li>
                        </ul>
                        <div className='d-flex align-items-center'>
                            <button onClick={handleNext} className='btn text-light border solid'>Next</button>
                        </div>
                        <div className="index text-center mt-5">{index + 1} of {questions.length} questions</div>
                    </div>
                </>
                }
                {result ? <>
                    <h3 className='text-dark text-center mb-3'>You scored <span className='text-warning'>{score} </span>out of {questions.length} 🎉</h3>
                    <button className='text-light' onClick={handleReset}>Reset</button>
                </> : <></>}


            </div>

        </>
    )
}
