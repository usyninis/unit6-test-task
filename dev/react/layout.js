var Lang = require('./lang');
var Nav = require('./ui/nav');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      step: 0
    };
  },
  getInitialState: function() {
    return {
      step: this.props.step
    };
  },
  componentWillReceiveProps: function(newProps) {
    if(newProps.step!=this.state.step) {
      this.setState({step:newProps.step});  
    }    
  },
  render: function() {

    var nav;
    if(this.state.step==0) {
      nav = <Nav />;
    }

  	return (
      <div className="s-app">
        
        <header className="s-header">
          <div className="s-content">
            <a className="app-logo" href="index.html">
              <div className="icon-logo"></div>
            </a>
            <div className="app-name">
              {Lang.appName}
            </div>
          </div>
        </header>
        
        {nav}

        {this.props.children}

      </div>
  	);
  }

});