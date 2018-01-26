import React from 'react';

class Questionnaire extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: 1
    };
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    const q = this.state.question + 1;
    this.setState({
      question: q
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="questions">{this.state.question}</div>
        <input type="button" value="Add" onClick={this.addQuestion} />
      </div>
    )
  }

}

export default Questionnaire;
