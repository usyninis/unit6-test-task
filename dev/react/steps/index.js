

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
          description: "Пропуска для посещения одним человеком или группой лиц без въезда на личном транспорте.",
        },
        {
          id: 2,
          name: "Посетители и автомобили",
          icon: "type2",
          description: "Пропуска для посещения одним человеком или группой лиц с въездом одного или нескольких автомобилей.",
        },
        {
          id: 3,
          name: "Курьерская доставка",
          icon: "type3",
          description: "Пропуска для курьерских служб на транспорте. Нужно указать только номер автомобиля и компанию.",
        },
        {
          id: 4,
          name: "Ввоз и вывоз имущества",
          icon: "type4",
          description: "Пропуска для осуществления ввоза или вывоза материального имущества через КПП.",
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
  nextStep: function(typeId) {
	if(typeId==1) {
		this.props.setStep(1,this.props.appData);
	}
  },
  render: function() {
    //console.log(this.props);
  	return (
      <div className="s-content">
	  <h2 className="title">Тип пропуска</h2>
      <div className="skip-types">
        {this.props.types.map(function(type, i) {
          return (
          <div onClick={this.nextStep.bind(null,type.id)} className={"skip-type"+(i==3?" last":"")}>
            <div className="skip-type__icon">
              <div className={"icon icon-inline icon-type"+type.id} />
            </div>
            <h3 className="skip-type__name"><div>{type.name}</div></h3>
            <div className="skip-type__description">{type.description}</div>
          </div>
          );
        }.bind(this))}
      </div>
      </div>
  	);
  }

});