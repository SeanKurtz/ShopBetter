import React from 'react';
import PropTypes from 'prop-types';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      edit: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
  }

  toggleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  submitEdit() {
    const { title, description, edit } = this.state;
    console.log(`${title} ${description}`);
    this.setState({ edit: !edit });
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;

    if (target.type === 'text') {
      this.setState({ title: value });
    }
    if (target.type === 'textarea') {
      this.setState({ description: value });
    }
  }

  render() {
    const { edit, title, description } = this.state;

    return (
      <div className="card">
        <div className="card__img-container">
          <img
            src="https://source.unsplash.com/random"
            alt=""
          />
        </div>
        <div className="card-content">
          {edit ? <input className="card-title text--large text--dark card-title-input" type="text" value={title} onChange={this.handleChange} /> : <p className="card-title text--large text--light">{title}</p>}
          {edit ? <textarea className="card-description text--medium text--dark card-description-input" rows={4} value={description} onChange={this.handleChange} /> : <p className="card-description text--medium text--light">{description}</p>}
          <div className="card-info">
            <p className="text--medium text--light">$0.99</p>
            <div className="card-icons">
              {edit ? (
                <button type="button" value={title} onClick={this.submitEdit}>
                  <i className="fas fa-check" />
                </button>
              ) : (
                <button type="button" value={title} onClick={this.toggleEdit}>
                  <i className="fas fa-edit" />
                </button>
              )}
              <button type="button" value={title}>
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Card.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Card;
