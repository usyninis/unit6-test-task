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
    //console.log(this.props);
   //var s = this.state.stepData;
   var clients = this.state.appData.clients;
   //if(clients = );
   var dates;
   if(this.state.appData.oneDay==1) {
     dates = this.state.appData.dateStart;
   } else {
     dates = this.state.appData.dateStart + " - " + this.state.appData.dateEnd;
   }

   return (

      <section className="s-step">
      <div className="s-content">
      <div className="s-content-step">
        <h2 className="title">Посетитель</h2>
     
        
        
        <div className="forms">

          <label className="form__row-label form__row-label_line">Посетители</label>
          {clients.map(function(client) {
            return (
              <div>
                <div><b>{client.name}</b></div>
                <div className="hsk">{client.company}</div>
                <div className="hsk"><div className="icon-inline"><div className="icon-phone"></div></div>{client.phone}</div>
                <div className="hsk"><div className="icon-inline"><div className="icon-email"></div></div>{client.email}</div>
                <br/>
              </div>
            );
          })}

          <label className="form__row-label form__row-label_line">Время действия пропуска</label>
          <div><b>{dates}</b></div>

        </div>

        <div className="form__row form__row_buttons">
          <div className="form__row form__row_w50 form__row_first"> 
            <button className="button button-fw outline" onClick={this.prevStep} type="button"><div className="inner">Внести изменения</div></button>
          </div>        
          <div className="form__row form__row_w50 form__row_last"> 
            <button className="button button-fw" onClick={this.nextStep} type="button"><div className="inner">Заказать пропуск</div></button>
          </div>
        </div>

      </div>
      </div>
      </section>
  	);
  }

});