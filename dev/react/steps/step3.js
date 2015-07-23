module.exports = React.createClass({
  getInitialState: function () {
    return {
      //step: 1	
    };
  },
  componentDidMount: function() {
    $("body").addClass("s-body-complete");
    setTimeout(function() {
      $(".complete").addClass("render");
    },21);
  },
  render: function() {
  	return (
      <div className="s-content">
        <section className="s-complete">
        <div className="complete">
          <div className="complete__icon">
            <div className="icon-success"></div>
          </div>
          <h2 className="complete__title">Успех</h2>
          <div className="complete__description">
          Данные отправлены на проверку сотрудникам<br/>
          службы безопасности
          </div>
          <a className="complete__link" href="index.html">Продолжить работу</a>
        </div>
        </section>
      </div>
  	);
  }
 
});