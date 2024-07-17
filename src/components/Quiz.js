import React, { Component, Fragment } from 'react';
import QuestionCount from './QuestionCount'
import Question from './Question'
import { Button } from 'react-bootstrap';

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            quizCount:0,
        }
    }

    arrayShuffler(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
          
        while (0 !== currentIndex) {
        

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    renderImgAnswerOptions(){
        let qAndA = this.props.qAndA[this.props.quizNum];
        let qAndAImg = qAndA.questionImage
        if(this.props.scoreType === "numberScoringImg" && qAndA.questionImage !== ''){
            return(
                <div>
                    <img src={qAndAImg} className='answer-option-img' alt={qAndA.question} />
                </div>
            )
        }
    }
    renderAnswerOptions(){
        let qAndA = this.props.qAndA[this.props.quizNum];
        var _questions = [];
        var i = 0;
        var nextQuizNum = this.props.quizNum + 1;
        while(i < qAndA.answers.length){

            if(this.props.scoreType === "numberScoring" || this.props.scoreType === "numberScoringImg"){
                _questions.push(
                    <Button
                        key={this.props.quizNum-i}
                        value={qAndA.answers[i].score} 
                        onClick={function(e) {
                            e.preventDefault();
                            if(this.props.quizNum === this.props.qAndA.length-1){
                                this.props.onChangeMode(nextQuizNum, e.target.value, "loading");
                            } else {
                                this.setState({
                                    quizCount:this.state.quizCount+1
                                })
                                this.props.onChangeMode(nextQuizNum, e.target.value, "quiz");
                            }
                        }.bind(this)}
                        variant="outline-dark" 
                        size="lg"
                        className="option-btn"
                    >{qAndA.answers[i].content}</Button>)
            } else if (this.props.scoreType === "typeCounting"){
                _questions.push(
                    <Button
                        key={this.props.quizNum-i}
                        value={qAndA.answers[i].type}
                        onClick={function(e) {
                            e.preventDefault();

                            if(this.props.quizNum === this.props.qAndA.length-1){
                                this.props.onChangeMode(nextQuizNum, e.target.value, "loading");
                            } else {
                                this.setState({
                                    quizCount:this.state.quizCount+1
                                })
                                this.props.onChangeMode(nextQuizNum, e.target.value, "quiz");
                            }
                        }.bind(this)}
                        variant="outline-dark" 
                        size="lg"
                        className="option-btn"
                    >{qAndA.answers[i].content}</Button>)
            } else if (this.props.scoreType === "typeCountingMBTI"){
                _questions.push(
                    <Button
                        key={this.props.quizNum-i}
                        value={qAndA.answers[i].type}
                        onClick={function(e) {
                            e.preventDefault();
                            if(this.props.quizNum === this.props.qAndA.length-1){
                                this.props.onChangeMode(nextQuizNum, e.target.value, "loading");
                            } else {
                                this.setState({
                                    quizCount:this.state.quizCount+1
                                })
                                this.props.onChangeMode(nextQuizNum, e.target.value, "quiz");
                            }
                        }.bind(this)}
                        variant="outline-dark" 
                        size="lg"
                        className="option-btn"
                    >{qAndA.answers[i].content}</Button>)
            } 
            i = i + 1;
        }
        _questions = this.arrayShuffler(_questions)
        return(
            _questions
        )
    }
    render(){
        
        return(
            <Fragment>
                <Question question={this.props.qAndA[this.props.quizNum].question}></Question>

                <Fragment>
                    {this.renderImgAnswerOptions()}
                </Fragment>
                <div className="option-btn-div">
                    {this.renderAnswerOptions()}
                </div>
                <QuestionCount totalCount={this.props.qAndA.length} quizCount={this.state.quizCount}></QuestionCount>
            </Fragment>
        );
    }
}

export default Quiz;