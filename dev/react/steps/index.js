

module.exports = React.createClass({
  getInitialState: function () {
    return {
      //step: 1	
    };
  },
  getDefaultProps: function() {
    return {
      types: [
        {
          id: 1,
          name: "Посетители",
          icon: "type1",
          description: "Посетители description",
        },
        {
          id: 2,
          name: "Посетители и автомобили",
          icon: "type2",
          description: "Посетители description",
        },
        {
          id: 3,
          name: "Курьерская доставка",
          icon: "type3",
          description: "Посетители description",
        },
        {
          id: 4,
          name: "Ввоз и вывоз имущества",
          icon: "type4",
          description: "Посетители description",
        },
      ]
    };
  },
  componentDidMount: function() {
      var i = 0;
      $(".skip-type").each(function() {
        var $element = $(this);
        i+=10;
        setTimeout(function() {
          $element.addClass("skip-type_render");
        },10*i);
      });
    
    
  },
  render: function() {
    //console.log(this.props);
  	return (
      <div className="skip-types">
        {this.props.types.map(function(type) {
          return (
          <div onClick={this.props.setStep.bind(null,1)} className="skip-type">
            <div className="skip-type__icon">
              <div className={"icon icon-inline icon-type"+type.id} />
            </div>
            <h3 className="skip-type__name"><div>{type.name}</div></h3>
            <div className="skip-type__description">{type.description}</div>
          </div>
          );
        }.bind(this))}
      </div>
  	);
  }

});