import React from 'react';
import PropTypes from 'prop-types';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
    Object.keys(this.props.questions).map((q, index) => {
    return(
      <div className="question" onClick={this.props.deleteMode ? "" : () => {this.props.updateActiveQuestion(q, index + 1)}} >
        <input type="checkbox" className={`${this.props.deleteMode ? "checkbox" : "checkbox checkbox-hidden"}`} onChange={() => {this.props.updateSelectedQuestion(q)}} />
        <div className="question-txt">{`${index + 1}. ${this.props.questions[q].txt}`}</div>
      </div>
    );
    })
  );
  }
}

QuestionList.propTypes = {
  questions: PropTypes.object.isRequired,
  updateActiveQuestion: PropTypes.func,
  updateSelectedQuestion: PropTypes.func,
  deleteMode: PropTypes.bool,
};

export default QuestionList;
