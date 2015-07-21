var FormRow = React.createClass({

  render: function() {
    return (
      <div className="form__row">
        <label className="form__row-label" for={this.props.name}>{this.props.name}</label> 
        <input type="text" className="input form__row-input" name={this.props.name} />
      </div>
    );
  }

});

module.exports = React.createClass({
  getInitialState: function () {
    return {
      //step: 1	
    };
  },
  getDefaultProps: function() {
    return {
      
    };
  },
  nextStep: function() {
    this.props.handleSetStep(2);
  },
  render: function() {
  	return (
      <div className="s-content-step">
        <h2>Данные посетителя</h2>
        <form className="form">
          <FormRow name="name" />
          <button type="button" onClick={this.nextStep}>nextStep</button>
        </form>
      </div>
  	);
  }

});