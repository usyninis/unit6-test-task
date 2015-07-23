var DatePicker = React.createClass({
  render: function() {
    
	moment.locale('ru');
	var day = this.props.day;
	var label;
	var date = moment().add(this.props.day,"day").format("L");
	switch(day) {
	  case 0:
		label = 'сегодня';
	    break; 
	  case 1:
		label = 'завтра';
	    break; 
	  case 2:
		label = 'послезавтра';
	    break; 
	  default:
	    label = date;
	    break;
	}
	var inputChecked = (this.props.activeDate==date) ? true : false;
	
    return (	
	  <a className={"date-picker"+(inputChecked?" checked":"")} onClick={this.props.setDate.bind(null,date)}>{label}</a>
	);
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    moment.locale("ru");
    var dateStart = this.props.dateStart? this.props.dateStart : moment().format("L");
	console.log(this.props);
    var dateEnd = this.props.dateEnd? this.props.dateEnd : moment().add(1, "day").format("L");
    return {
      //formsCount: 1,
	  dateStart: dateStart,
	  dateEnd: dateEnd,
      oneDay: true,
    };
  },
  setStartDate: function(date) {
    console.log(date);
	var dateEnd = moment(date,"DD.MM.YYYY").add(1,"day").format("L");
    this.setState({dateStart:date,dateEnd:dateEnd},function() {
	  this.checkInput(this.refs.dateStart.getDOMNode());
	});
  },
  setOneDay: function(oneDay) {
    
    this.setState({oneDay:oneDay});
  },
  /* getInitialState: function() {
    return {
	  
	};
  }, */
  componentDidMount: function() {
  
	moment.locale('ru');
	
    var $dateStart = $(this.refs.dateStart.getDOMNode());
    var $dateEnd = $(this.refs.dateEnd.getDOMNode());
	var checkInput = this.checkInput;
	$dateStart.mask("99.99.9999",{
	  placeholder:" ",
	  autoclear:false,
	  completed: function() {
	    checkInput(this);
	  }
	});
	$dateEnd.mask("99.99.9999",{
	  placeholder:" ",
	  autoclear:false,
	  completed: function() {
	    checkInput(this);
	  }
	});
    /* if(this.refs.input) {
	 var $input = $(this.refs.dateStart.getDOMNode());
	
	 $input.mask("99.99.9999");
		
	 
	} */
	
	
  },
  //componentDIDUpdate: function(
  checkInput: function(input) {
    input = (input.nodeName) ? input : input.target;
    var date = moment(input.value,"DD.MM.YYYY");
	console.log(date);
	if(date.isValid()) {
	  $(input).removeClass("error");
	} else {
	  $(input).addClass("error");
	}
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
	
	var countDatePickers = 6, 
	  i=0,
	  datePickers = [];
	while(i < countDatePickers) {
      
	  datePickers.push(<DatePicker day={i} setDate={this.setStartDate} activeDate={this.state.dateStart} />);
	  i++;
	} 
    return (
      <form className="form">
        <div className="form__row">
        <div className="form__row form__row_w50 form__row_first">
          <label className="form__row-label" for="date_start">date_start</label> 
          <input type="text" className="input form__row-input" ref="dateStart" value={this.state.dateStart} name="date_start" />
        </div>
        <div className="form__row form__row_w50 form__row_last">
          <label className="form__row-label" for="date_end">date_end</label> 
          <input type="text" disabled={this.state.oneDay} ref="dateEnd" value={this.state.dateEnd} className="input form__row-input" name="date_end" />
        </div>
        </div>
        <div className="form__row">
		{datePickers.map(function(datePicker) {
		  return datePicker;
		})}
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