var Layout = require('./layout');

/*var Steps = {
  "Step1": require('./steps/Step1'),
  "Step2": require('./steps/Step2'),
  "Step3": require('./steps/Step3')
};*/
var Steps = {
  "index": require('./steps/index'),
  "1": require('./steps/step1'),
  "2": require('./steps/step2'),
  "3": require('./steps/step3')
};
 
module.exports = React.createClass({
  getInitialState: function () {
    return {
      step: 1,
      appData: {
        clients: [{name:"demo"}]
      }
    };
  },
  setStepIndex: function() {
    this.setState({step:0});
  },
  setStep: function(stepNumber,appData) {
    stepNumber = stepNumber>3 ? 3: (stepNumber<0?0:stepNumber);
    this.setState({step:stepNumber,appData:appData});
  },
  render: function() {
    //var step = Steps[this.state.step];
    //var step = Steps["Step"+this.state.step];
    /*var content = React.createElement(
      "Step1"
    );*/
    var content;
    if(this.state.step>0) {
      content = React.createElement(
          Steps[this.state.step],
          {setStep:this.setStep,appData:this.state.appData}
        );
    } else {
      content = React.createElement(
          Steps["index"],
          {setStep:this.setStep,appData:this.state.appData}
        );
    }
    //var s = "Step1";
  	return (
      <Layout step={this.state.step}>
       
           {content}           
          
      </Layout>
  	);
  }

});