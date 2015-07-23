var Helper = require('./../helper');

var FormRow = React.createClass({
  onFocus: function(e) {
    if(this.props.field.rule=='phone') {
      
    }
    //this.props.handlerOnInputChange(e);
  },
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
		  var handlerOnInputChange = this.props.handlerOnInputChange;
		  $input.mask("+7 (999) 999-99-99",{
		    autoclear: false,
			placeholder: " ",
			completed: function() {
			  handlerOnInputChange(this);
			}
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
        <input type={field.type} ref="input" data-rule={field.rule} data-masked={field.mask} className="input form__row-input" onFocus={this.onFocus} onChange={this.props.handlerOnInputChange} name={field.name} defaultValue={this.props.value} />
      </div>
    );
  }

});

var FormDate = require("./form-date");

var FormClient = React.createClass({
  propTypes: {
    client: React.PropTypes.object,
    handlerOnInputChange: React.PropTypes.function,
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
          return <FormRow field={field} handlerOnInputChange={this.props.handlerOnInputChange} value={value} />;
        }.bind(this))}
      </form>
    );
  }

});

module.exports = React.createClass({
  propTypes: {
    appData: React.PropTypes.object.required
  },
  getInitialState: function () {
   // var appData = this.props.appData;
	//if(!appData) {
	//if(!appData.clients) {
	 // appData.clients = [{}];
	//}
	//}
    return {
      //step: 1	
      appData: this.props.appData,
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
  validateInput: function(input) {
    //console.log("validate: "+mask);
    //console.log("validate-input: "+input);
    //if(!mask) return false;
	var $input = $(input);
	var string = $input.val();
	var pattern = $input.data("rule");
	
	return Helper.validateString(string,pattern);
	
    /* var string = input.value;
    var validate = false;
    var rule = $(input).data("rule");
    rule.split('|').map(function(rule) {
      
      switch(rule) {

        case 'required': 
        validate = (undefined == typeof string || string.length == 0) ? false : true;        
        break;

        case 'email':
        var regExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,10}$/i; 
        validate = regExp.test(string);        
        break;

        case 'phone':
        var regExp = /^\+\d[\d\(\)\ -]{4,20}\d$/; 
        validate = regExp.test(string);        
        break;

      }
      if( ! validate) {
        //$(input).addClass("error");         
        return false;
      }
    }); */

    //$(input).removeClass("error");

    return validate;
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
          if(validateInput(this)) {
            
            $(this).removeClass("error");
          } else {
            errors = true;
            $(this).addClass("error");
          }
        });
      }
    });
   
    

    if(!errors) {
      var appData = {
        clients: clients,
		dateStart: $(".js-date-form").find("[name=date_start]").val(),
		dateEnd: $(".js-date-form").find("[name=date_end]").val(),
      };
      this.props.setStep(2,appData);      
    }
  },
  handlerOnInputChange: function(e) {
    console.log(e.target);
    //this.validateInput(e.target,'required');
    if(this.validateInput(e.target)) {
      //errors = true;
      $(e.target).removeClass("error");
    } else {
      $(e.target).addClass("error");
    }
  },
  addClient: function() {
    var appData = this.state.appData;
    var clients = this.state.appData.clients;
    clients.push({});
    appData.clients = clients;
    this.setState({appData:appData});
  },
  render: function() {
    var forms = [];
    /*var form = (
      
    );*/
    /*for (var i = 0; i < this.state.formsCount; i++) {
      forms.push(<FormClient />);
    }*/
    this.state.appData.clients.map(function(client) {
     //console.log(client);
      forms.push(<FormClient client={client} handlerOnInputChange={this.handlerOnInputChange} />);
    }.bind(this));
    //forms.push(form);
    
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
          <a className="forms__button-add" onClick={this.addClient}>Добавить еще одного</a>
        </div>
        <h2 className="title">Дата</h2>
        <div className="forms">
          
            <FormDate dateStart={this.state.appData.dateStart} dateEnd={this.state.appData.dateEnd} />
          
        </div>
        <button className="button" onClick={this.nextStep} type="button"><div className="inner">Продолжить</div></button>
      </div>
      </div>
      </section>

  	);
  }

});