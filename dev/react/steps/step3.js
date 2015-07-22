module.exports = React.createClass({
  getInitialState: function () {
    return {
      //step: 1	
    };
  },
  render: function() {
  	return (
      <section className="s-complete">
        <div className="s-content">
          Готово
          <div className="icon-complete"></div>
        </div>
      </section>
  	);
  }
 
});