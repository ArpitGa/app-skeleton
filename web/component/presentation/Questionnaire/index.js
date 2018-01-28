import React from 'react';
import QuestionList from '../QuestionList';
import OptionList from '../OptionList';

class Questionnaire extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionId: 0,
      questions: {},
      deleteMode: false,
      activeQuestion: 0,
      activeQuestionIndex: 0
    };
    this.addQuestion = this.addQuestion.bind(this);
    this.updateSelectedQuestion = this.updateSelectedQuestion.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateActiveQuestion = this.updateActiveQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.showSaveMsg = this.showSaveMsg.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
  }

  addQuestion() {
    const newQuestionId = this.state.questionId + 1;
    const newQuestions = this.state.questions;
    newQuestions[newQuestionId] = {
      txt: `New Question ${newQuestionId}`,
      options: ["Option text", "Option text"],
      checked: false
    };
    this.setState({
      questionId: newQuestionId,
      questions: newQuestions
    });
  }

  updateSelectedQuestion(q) {
    const newQuestions = this.state.questions;
    newQuestions[q].checked = true;
    this.setState({
      questions: newQuestions
    });
  }

  toggleDeleteMode() {
    this.setState({
      deleteMode: !this.state.deleteMode
    })
  }

  deleteQuestion() {
    const newQuestions = this.state.questions;
    Object.keys(newQuestions).map((q) => {
      if(newQuestions[q].checked) {
        delete newQuestions[q];
      }
    });
    this.setState({
      questions: newQuestions,
      deleteMode: !this.state.deleteMode
    });
    if(document) {
      let checkboxes = document.getElementsByClassName("check");
      for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    }
  }

  updateActiveQuestion(q, index) {
    this.refs.rightDiv.style.display = "block";
    const newActiveQuestion = q;
    const newActiveQuestionIndex = index;
    this.setState({
      activeQuestion: newActiveQuestion,
      activeQuestionIndex: newActiveQuestionIndex
    });
  }

  editQuestion() {
    const newQuestions = this.state.questions;
    const options = document.getElementsByClassName("option-input");

    if(this.refs.questionTxt.value !== "") {
      newQuestions[this.state.activeQuestion].txt = this.refs.questionTxt.value;
    } else {
      alert("Cant have an empty Question !");
    }

    for(let i = 0; i < options.length; i++) {
      if(options[i].value !== "") {
        newQuestions[this.state.activeQuestion].options[i] = options[i].value;
        options[i].value = "";
      }
    }
    this.setState({
      questions: newQuestions
    });
    this.refs.questionTxt.value="";
    setTimeout(() => {
      this.showSaveMsg();
      setTimeout(this.showSaveMsg, 600);
    }, 0);
  }

  addOption() {
      const newQuestion = this.state.questions;
      if(newQuestion[this.state.activeQuestion].options.length < 6) {
        newQuestion[this.state.activeQuestion].options.push("Option text");
        this.setState({
          question: newQuestion
        });
      }
      else {
        alert("You can add max of 6 options !");
      }
  }

  deleteOption() {
      const newQuestion = this.state.questions;
      if(newQuestion[this.state.activeQuestion].options.length > 2) {
        newQuestion[this.state.activeQuestion].options.pop();
        this.setState({
          question: newQuestion
        });
      } else {
          alert("Minimun of two options are mandatory !");
      }
  }

  showSaveMsg() {
    if(!this.refs.saveMsg.classList.contains("visible")) {
      this.refs.saveMsg.classList += " visible";
    } else {
      this.refs.saveMsg.classList = "save-msg"
    }
  }

  hideEditor() {
    this.refs.rightDiv.style.display = "none";
  }

  componentDidMount() {
    if(Storage) {
      if(localStorage.getItem("state")) {
        const storedState = JSON.parse(localStorage.getItem("state"));
        this.setState(storedState);
      }
    }
  }

  componentDidUpdate() {
    if(Storage) {
      localStorage.setItem("state", JSON.stringify(this.state));
    }
  }

  render() {
    const questions = this.state.questions;
    const deleteBtnHandler = this.state.deleteMode ? this.deleteQuestion : this.toggleDeleteMode;
    return (
      <div className="container-outer">
        <div className="container-inner">
          <div ref="leftDiv" className="left">
            <div ref="question-list" className="questions-list">
            <QuestionList
              deleteMode={this.state.deleteMode}
              updateActiveQuestion={this.updateActiveQuestion}
              updateSelectedQuestion={this.updateSelectedQuestion}
              questions={questions} />
            </div>
            <div className="btn-grp">
              <input type="button" className="button-input" value="Add" onClick={this.addQuestion} />
              <input type="button" className="button-input" value="Delete" onClick={deleteBtnHandler} />
            </div>
          </div>
          <div ref="rightDiv" className="right">
            { this.state.activeQuestionIndex !== 0 && questions[this.state.activeQuestion] !== undefined &&
              <div className="question-editor">
                <input className="button-input close-btn" type="button" value="Close" onClick={this.hideEditor} />
                <h2>{`Design Question ${this.state.activeQuestionIndex}:`}</h2>
                <div className="question-wrapper">
                  <label htmlFor="question-txt" className="label-input">Question:</label>
                  <input
                    ref="questionTxt"
                    type="text"
                    placeholder={questions[this.state.activeQuestion].txt}
                    className="text-input question-input" />
                </div>
                <OptionList options={questions[this.state.activeQuestion].options} />
                <div className="btn-grp">
                  <input type="button" className="button-input" value="Add" onClick={this.addOption} />
                  <input type="button" className="button-input" value="Delete" onClick={this.deleteOption} />
                </div>
                <div className="btn-grp">
                  <input type="button" className="button-input" value="Save" onClick={this.editQuestion} />
                </div>
              </div>
            }
          </div>
          <div ref="saveMsg" className="save-msg">Changes saved</div>
        </div>
      </div>
    )
  }

}

export default Questionnaire;
