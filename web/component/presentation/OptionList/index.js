import React from 'react';
import PropTypes from 'prop-types'

class OptionList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      this.props.options.map((option, index) => {
        return(
          <div ref="option">
            <label className="label-input">{`Option ${index + 1}:`}</label>
            <input
              type="text"
              placeholder={option}
              className="text-input option-input" />
          </div>
        )
      })
  );
  }
}

OptionList.propTypes = {
  options: PropTypes.array.isRequired,
};

export default OptionList;
