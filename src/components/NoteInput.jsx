import React from 'react';
import PropTypes from 'prop-types';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      charLimit: 50,
    };
  }

  onTitleHandler = (event) => {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  };

  onBodyHandler = (event) => {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.addNote(this.state);
  };

  onCharacterInputHandler = (event) => {
    const str = event.target.value.length;
    if (50 - str === 0) {
      event.target.value = this.state.title;
    }
    this.setState((prevState) => {
      return {
        charLimit: 50 - str,
      };
    });
  };

  onChangeHandler = (event) => {
    this.onTitleHandler(event);
    this.onCharacterInputHandler(event);
  };

  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitHandler}>
        <h2 className="note-input__title">Buat Catatan</h2>
        <p className="note-input__title__char-limit">
          Sisa Karakter: {this.state.charLimit}
        </p>
        <input
          type="text"
          placeholder="Ini adalah judul..."
          value={this.state.title}
          onChange={this.onChangeHandler}
        />
        <textarea
          type="text"
          placeholder="Tuliskan catatanmu disini..."
          value={this.state.body}
          onChange={this.onBodyHandler}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
