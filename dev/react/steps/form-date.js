var moment = require('moment');
var momentRu = require('moment/locale/ru');
moment.locale('ru');

var DatePickerMixin = {

};

var DatePicker = React.createClass({
  render: function() {
    
	
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
    
    var dateStart = this.props.dateStart? this.props.dateStart : moment().format("L");
	//console.log(this.props.oneDay);
    var dateEnd = this.props.dateEnd? this.props.dateEnd : moment().add(1, "day").format("L");
    return {
      //formsCount: 1,
	  dateStart: dateStart,
	  dateEnd: dateEnd,
      oneDay: this.props.oneDay,
    };
  },
  setStartDate: function(date, e) {
    //console.log(date);
	/*var dateEnd = moment(date,"DD.MM.YYYY").add(1,"day").format("L");
    this.setState({dateStart:date,dateEnd:dateEnd},function() {
	  $(this.refs.dateStart.getDOMNode()).change();
	}.bind(this));*/
	var dateStart = moment(date,"DD.MM.YYYY").format("L");
	var dateEnd = moment(date,"DD.MM.YYYY").add(1,"day").format("L");
	var $dateStart = $(this.refs.dateStart.getDOMNode()).val(dateStart);
    var $dateEnd = $(this.refs.dateEnd.getDOMNode()).val(dateEnd);
    this.setState({dateStart:dateStart});
    $(".date-picker.checked").removeClass("checked");
    $(e.target).addClass("checked");
  },
  setOneDay: function(oneDay) {
    //this.props.setOneDay(oneDay);
    this.setState({oneDay:oneDay});
  },
  /* getInitialState: function() {
    return {
	  
	};
  }, */
  componentDidMount: function() {
  

	
    var $dateStart = $(this.refs.dateStart.getDOMNode());
    var $dateEnd = $(this.refs.dateEnd.getDOMNode());
	//var checkInput = this.checkInput;
	$dateStart.on("blur change",this.checkInput).mask("99.99.9999",{
	  placeholder:" ",
	  autoclear:false,
	  complete: this.checkInput
	});
	$dateEnd.on("blur change",this.checkInput).mask("99.99.9999",{
	  placeholder:" ",
	  autoclear:false,
	  complete: this.checkInput
	});
    /* if(this.refs.input) {
	 var $input = $(this.refs.dateStart.getDOMNode());
	
	 $input.mask("99.99.9999");
		
	 
	} */
	
	
  },
 /* componentWillReceiveProps: function(newProps) {
  	console.log(newProps);
  },*/
  checkInput: function(e) {
    //input = (input.nodeName) ? input : input.target;
    var date = moment(e.target.value,"DD.MM.YYYY");
	//console.log(target);
	//if(this.props.validateOn) {
		if(date.isValid()) {
		  $(e.target).removeClass("error");
		} else {
		  $(e.target).addClass("error");
		}		
	//}
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
      if(i==3) datePickers.push(<br/>);
	  datePickers.push(<DatePicker day={i} setDate={this.setStartDate} activeDate={this.state.dateStart} />);
	  i++;
	} 
    return (
      <form className="form js-date-form">
        <input type="hidden" name="oneDay" value={this.state.oneDay} />
        
        <div className="form__row form__row_w50 form__row_first">
          <label className="form__row-label" for="date_start">Начало действия</label> 
          <input type="text" className="input form__row-input" ref="dateStart" defaultValue={this.state.dateStart} name="date_start" />
        </div>
        <div className="form__row form__row_w50 form__row_last">
          <label className="form__row-label" for="date_end">Окончание действия</label> 
          <input type="text" disabled={this.state.oneDay==1} ref="dateEnd" defaultValue={this.state.dateEnd} className="input form__row-input" name="date_end" />
        </div>
        
        <div className="form__row form__row_end">
		{datePickers.map(function(datePicker, i) {
		  return datePicker;
		})}
        </div>
        <hr className="form__hr" />
        <div className="form__row form__row_end">
          <a className={"checkbox"+(this.state.oneDay==1?" checked":"")} onClick={this.setOneDay.bind(null,1)}>
            <div className="checkbox__imit"></div>
            <div className="checkbox__label">один день</div>
          </a>
          <a className={"checkbox"+(this.state.oneDay==0?" checked":"")} onClick={this.setOneDay.bind(null,0)}>            
            <div className="checkbox__imit"></div>
            <div className="checkbox__label">несколько дней</div>
          </a>
        </div>
      </form>
    );
  }
});  