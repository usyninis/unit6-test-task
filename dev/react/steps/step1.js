var Helper = require('./../helper');
var moment = require('moment');

var InputMixin = { 
  handlerOnInputChange: function(e) {
    //console.log(e.target);
    //this.validateInput(e.target,'required');
    if(this.props.validateOn) {
      //console.log('validateOn');
      //var $input = $(e.target);
      this.validateInput(e.target);
    }
  },
  validateInput: function(input) {
    //console.log("validate: "+mask);
    //console.log("validate-input: "+input);
    //if(!mask) return false;
    var $input = $(input);
    var string = $input.val();
    var pattern = $input.data("rule");
    var isValid = Helper.validateString(string,pattern);
      if(isValid) {
        //errors = true;
        $input.removeClass("error");
      } else {
        $input.addClass("error");
      }

    return isValid;
  },
};

var FormRow = React.createClass({
  mixins: [InputMixin],
  componentDidMount: function() {
    if(this.refs.input) {
  	  $(this.refs.input.getDOMNode()).mask();
  	  var $input = $(this.refs.input.getDOMNode());
  	  var mask = $input.data("masked");
  	  /* if(mask) {
  		$input.mask(mask);
  	  } */
  	  //console.log(mask);
  	  switch(mask) {
  	    case "phone":
  		  //var handlerOnInputChange = this.props.handlerOnInputChange;
  		  $input.on("keyup",this.handlerOnInputChange).mask("+7 (999) 999-99-99",{
  		    autoclear: false,
    			placeholder: " "
  		  });
  		break;
  	    case "date":
  		  $input.mask("00000-000",{autoclear:false});
  		break;   
  	  } 
  	} 
  },
  render: function() {
    var field = this.props.field;
    var rowClassName = "form__row";
    if(field.className) {
      rowClassName+=" "+field.className;
    }
    return (
      <div className={rowClassName}>
        <label className="form__row-label" for={field.name}>{field.label}</label> 
        <input type={field.type} ref="input" data-rule={field.rule} data-masked={field.mask} className="input form__row-input" onChange={this.handlerOnInputChange} name={field.name} defaultValue={this.props.value} />
      </div>
    );
  }

});

var FormDate = require("./form-date");

var FormClient = React.createClass({
  propTypes: {
    client: React.PropTypes.object,
    //handlerOnInputChange: React.PropTypes.function,
  },
  getInitialState: function() {
    return {
      client: this.props.client
    };
  },
  getDefaultProps: function() {
    return {
      fields: [{
        label: "ФИО",
        name: "name",
        type: "text",
        rule: "required"
      },{
        label: "Телефон",
        name: "phone",
        mask: "phone",
        type: "text",
        className: "form__row_w50 form__row_first",
        rule: "required|phone"
      },{
        label: "Почта",
        name: "email",
        //mask: "email",
        type: "text",
        className: "form__row_w50 form__row_last",
        rule: "required|email"
      },{
        label: "Компания посетителя",
        name: "company",
        type: "text",
        rule: "required"
      }]
    };
  },
  render: function() {
    
   /* var forms;
    for (var i = 0; i < this.state.formsCount; i++) {
      forms += this.props.fields.map(function(field) {
          return <FormRow field={field} />;
        });
    }*/
    var client = this.state.client;
    return (
      <form className="js-client-form">
        {this.props.fields.map(function(field) {
          //console.log(field);
          var value = client[field.name];
          return <FormRow field={field} value={value} validateOn={this.props.validateOn} />;
        }.bind(this))}
      </form>
    );
  }

});

module.exports = React.createClass({
  propTypes: {
    appData: React.PropTypes.object.required
  },
  mixins: [InputMixin],
  getInitialState: function () {
   // var appData = this.props.appData;
	//if(!appData) {
	//if(!appData.clients) {
	 // appData.clients = [{}];
	//}
	//}
  console.log(this.props.appData);
    return {
      //step: 1	
      appData: this.props.appData,
      validateOn: false
      //formsCount: 1,
      //clients: [
        //{}
      //]
    };
  },
  getDefaultProps: function() {
    return {
      
    };
  },
  nextStep: function() {
    
    var clients = [];
    $(".js-client-form").each(function() {
      var fields = $(this).serializeArray();
      var client = {};
      fields.map(function(field) {
        if( ! Helper.isEmpty(field.value)) {
          client[field.name] = field.value;
        }
      });
      
      if( ! Helper.isEmpty(client)) {
        clients.push(client);
        $(this).data("validate",true);  
      } else {
        $(this).data("validate",false);  
      }
          
    });

    if(Helper.isEmpty(clients)) {
      $(".js-client-form:first").data("validate",true);
    } 

    var errors;

    var validateInput = this.validateInput;

    $(".js-client-form").each(function() {
      var $form = $(this);
      if($form.data("validate")) {
        $form.find("input").each(function() {
          if( ! validateInput(this)) {
            errors = true;
          }
        });
      }
    });
    
    var $dateStart = $(".js-date-form").find("[name=date_start]");
    var $dateEnd = $(".js-date-form").find("[name=date_end]");
    var oneDay = $(".js-date-form").find("[name=oneDay]").val();
    var dateStart = $dateStart.val();
    var dateEnd = $dateEnd.val();
    var mDateStart = moment(dateStart,"DD.MM.YYYY");
    var mDateEnd = moment(dateEnd,"DD.MM.YYYY");
    
    //console.log(oneDay);

   
    if( ! mDateStart.isValid() ) {
      $dateStart.addClass("error");
      errors = true;
    }
    if( ! mDateEnd.isValid() ) {
      $dateEnd.addClass("error");
      errors = true;
    }
    if( mDateEnd.unix() <= mDateStart.unix() ) {
      $dateEnd.addClass("error");
      errors = true;
    }

    if(!errors) {
      var appData = {
        clients: clients,
		    dateStart: dateStart,
		    dateEnd: dateEnd,
        oneDay: oneDay
      };
      this.props.setStep(2,appData);      
    } else {
      this.setState({validateOn:true});
    }
  },
 
  addClient: function() {
    var appData = this.state.appData;
    var clients = this.state.appData.clients;
    clients.push({});
    appData.clients = clients;
    this.setState({appData:appData});
  },
 /* setOneDay: function(oneDay) {
     var appData = this.state.appData;
     appData.oneDay = oneDay;
     this.setState({appData:appData});
  },*/
  render: function() {
    var forms = [];
    /*var form = (
      
    );*/
    /*for (var i = 0; i < this.state.formsCount; i++) {
      forms.push(<FormClient />);
    }*/
    this.state.appData.clients.map(function(client) {
     //console.log(client);
      forms.push(<FormClient client={client} validateOn={this.state.validateOn} />);
    }.bind(this));
    //forms.push(form);
    //console.log(this.state.appData.oneDay);
  	return (
      <section className="s-step">
      <div className="s-content">
      <div className="s-content-step">
        <h2 className="title">Данные посетителя</h2>
        <div className="forms">
          {forms.map(function(form){
            return (
              <div className="forms__form">
                {form}
              </div>
            );
          })}
          <a className="forms__button-add" onClick={this.addClient}>Добавить еще одного посетителя?</a>
        </div>
        <h2 className="title">Дата</h2>
        <div className="forms">
          
            <FormDate dateStart={this.state.appData.dateStart} dateEnd={this.state.appData.dateEnd} oneDay={this.state.appData.oneDay} validateOn={this.state.validateOn}  />
          
        </div>
        <div className="form__row form__row_buttons">
        <button className="button" onClick={this.nextStep} type="button"><div className="inner">Продолжить</div></button>
        </div>
      </div>
      </div>
      </section>

  	);
  }

});