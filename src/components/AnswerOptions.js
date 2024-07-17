import React, { Component } from 'react';

class AnswerOptions extends Component {
    render(){
        return(
            <div className="answerOptions">
                <div>
                    {this.props.answers[0].content}
                </div>
            </div>
        );
    }
}

export default AnswerOptions;