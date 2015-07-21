module.exports = React.createClass({
  getInitialState: function () {
    return {
      items: [
        {url:"#",name:"Заказ пропуска"},
        {url:"#",name:"Действующие пропуска"},
        {url:"#",name:"Архив"},
      ]
    };
  }, 
  render: function() {
  	return (

      <nav className="s-nav">
      <div className="s-content">
        <ul className="main-nav clear">
        {this.state.items.map(function(item, i) {
          return (
            <li key={i}><a className={"main-nav__item"+(i==0?" main-nav__item_active":"")} href={item.url}>{item.name}</a></li>
          );
        })}
        </ul>
      </div>
      </nav>
  	);
  }

});