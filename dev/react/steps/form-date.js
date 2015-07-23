var DatePicker = React.createClass({
  render: function() {
	moment.locale('ru');
    return (	
	  <a className="date-picker">
		{moment().format('L')}
	  </a>
	);
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      //formsCount: 1,
      oneDay: true,
    };
  },
  setOneDay: function(oneDay) {
    
    this.setState({oneDay:oneDay});
  },
  componentDidMount: function() {
  
	moment.locale('ru');
	
    var $dateStart = $(this.refs.dateStart.getDOMNode());
    var $dateEnd = $(this.refs.dateEnd.getDOMNode());
	
	$dateStart.val(moment().format("L"));
	$dateEnd.val(moment().add(1, "day").format("L"));
    /* if(this.refs.input) {
	 var $input = $(this.refs.dateStart.getDOMNode());
	
	 $input.mask("99.99.9999");
		
	 
	} */
	
	
  },
  render: function() {
    /*var field1 = {
        label: "ФИО",
        name: "name",
        type: "text",
      };*/
	/* var field_date_start = {
		name: "",
		label: "Дата начала",
		className: "form__row_w50 form__row_first",
		rule: "required|date",
		mask: "date",
	}   */
	  
    return (
      <form className="form">
        <div className="form__row">
        <div className="form__row form__row_w50 form__row_first">
          <label className="form__row-label" for="date_start">date_start</label> 
          <input type="text" className="input form__row-input"  ref="dateStart" name="date_start" />
        </div>
        <div className="form__row form__row_w50 form__row_last">
          <label className="form__row-label" for="date_end">date_end</label> 
          <input type="text" disabled={this.state.oneDay} ref="dateEnd" className="input form__row-input" name="date_end" />
        </div>
        </div>
        <div className="form__row">
			<DatePicker />
        </div>
        <div className="form__row">
          <a className={"checkbox"+(this.state.oneDay?" checked":"")} onClick={this.setOneDay.bind(null,true)}>
            <label>
            <input type="checkbox" />
            <div className="checkbox__imit"></div>
            <div className="checkbox__label">один день</div>
            </label>
          </a>
          <a className={"checkbox"+(!this.state.oneDay?" checked":"")} onClick={this.setOneDay.bind(null,false)}>
            <label>
            <input type="checkbox" />
            <div className="checkbox__imit"></div>
            <div className="checkbox__label">несколько дней</div>
            </label>
          </a>
        </div>
      </form>
    );
  }
});  