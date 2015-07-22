module.exports = React.createClass({
  propTypes: {
    appData: React.PropTypes.object.required
  },
  getInitialState: function () {
    return {
      //step: 1	
      appData: this.props.appData
    };
  },
  prevStep: function() {
    this.props.setStep(1,this.state.appData);
  },
  nextStep: function() {
    this.props.setStep(3);
  },
  render: function() {
   //var s = this.state.stepData;
   var clients = this.state.appData.clients;
   //if(clients = );
   return (

      <section className="s-step">
      <div className="s-content">
     
        
        
        <div className="forms">
        {clients.map(function(client) {
          return (
            <div>
              {client.name}
              {client.company}
              {client.phone}
              {client.email}
            </div>
          );
        })}
        </div>
        <button className="button outline" onClick={this.prevStep} type="button">Назад</button>
        <button className="button" onClick={this.nextStep} type="button">Продолжить</button>
      
      </div>
      </section>
  	);
  }

});