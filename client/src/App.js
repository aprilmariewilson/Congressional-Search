import React, { Component } from 'react';
import Select from './Components/Select/Select';
import validate from './Components/Validate/Validate';
import Results from './Components/Results/Results.js';
import './App.css';

class App extends Component {
  state = {
    formIsValid: false,
    formControls: {
      branch: {
        value: '',
        placeholder: 'What congressional branch',
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true,
        },
        options: [
          { key: 'none', value: 'null', displayValue: '' },
          { key: 'senate', value: 'senate', displayValue: 'Senate' },
          { key: 'house', value: 'house', displayValue: 'House of Representatives' }
        ]
      },
      area: {
        value: '',
        placeholder: 'What State',
        valid: false,
        touched: false,
        validationRules: {
          isRequired: true,
        },
        options: [
          { key: 'NA', value: 'NA', displayValue: '' },
          { key: 'AK', value: 'AK', displayValue: 'Alaska' },
          { key: 'AL', value: 'AL', displayValue: 'Alabama' },
          { key: 'AZ', value: 'AZ', displayValue: 'Arizona' },
          { key: 'AR', value: 'AR', displayValue: 'Arkansas' },
          { key: 'CA', value: 'CA', displayValue: 'California' },
          { key: 'CO', value: 'CO', displayValue: 'Colorado' },
          { key: 'CT', value: 'CT', displayValue: 'Connecticut' },
          { key: 'DE', value: 'DE', displayValue: 'Delaware' },
          { key: 'FL', value: 'FL', displayValue: 'Florida' },
          { key: 'GA', value: 'GA', displayValue: 'Georgia' },
          { key: 'HI', value: 'HI', displayValue: 'Hawaii' },
          { key: 'ID', value: 'ID', displayValue: 'Idaho' },
          { key: 'IL', value: 'IL', displayValue: 'Illinois' },
          { key: 'IN', value: 'IN', displayValue: 'Indiana' },
          { key: 'IA', value: 'IA', displayValue: 'Iowa' },
          { key: 'KS', value: 'KS', displayValue: 'Kansas' },
          { key: 'KY', value: 'KY', displayValue: 'Kentucky' },
          { key: 'LA', value: 'LA', displayValue: 'Louisiana' },
          { key: 'ME', value: 'ME', displayValue: 'Maine' },
          { key: 'MD', value: 'MD', displayValue: 'Maryland' },
          { key: 'MA', value: 'MA', displayValue: 'Massachusetts' },
          { key: 'MI', value: 'MI', displayValue: 'Michigan' },
          { key: 'MN', value: 'MN', displayValue: 'Minnesota' },
          { key: 'MS', value: 'MS', displayValue: 'Mississippi' },
          { key: 'MO', value: 'MO', displayValue: 'Missouri' },
          { key: 'MT', value: 'MT', displayValue: 'Montana' },
          { key: 'NE', value: 'NE', displayValue: 'Nebraska' },
          { key: 'NV', value: 'NV', displayValue: 'Nevada' },
          { key: 'NH', value: 'NH', displayValue: 'New Hampshire' },
          { key: 'NJ', value: 'NJ', displayValue: 'New Jersey' },
          { key: 'NM', value: 'NM', displayValue: 'New Mexico' },
          { key: 'NY', value: 'NY', displayValue: 'New York' },
          { key: 'NC', value: 'NC', displayValue: 'North Carolina' },
          { key: 'ND', value: 'ND', displayValue: 'North Dakota' },
          { key: 'OH', value: 'OH', displayValue: 'Ohio' },
          { key: 'OK', value: 'OK', displayValue: 'Oklahoma' },
          { key: 'OR', value: 'OR', displayValue: 'Oregon' },
          { key: 'PA', value: 'PA', displayValue: 'Pennsylvania' },
          { key: 'RI', value: 'RI', displayValue: 'Rhode Island' },
          { key: 'SC', value: 'SC', displayValue: 'South Carolina' },
          { key: 'SD', value: 'SD', displayValue: 'South Dakota' },
          { key: 'TN', value: 'TN', displayValue: 'Tennessee' },
          { key: 'TX', value: 'TX', displayValue: 'Texas' },
          { key: 'UT', value: 'UT', displayValue: 'Utah' },
          { key: 'VT', value: 'VT', displayValue: 'Vermont' },
          { key: 'VA', value: 'VA', displayValue: 'Virginia' },
          { key: 'WA', value: 'WA', displayValue: 'Washington' },
          { key: 'WV', value: 'WV', displayValue: 'West Virginia' },
          { key: 'WI', value: 'WI', displayValue: 'Wisconsin' },
          { key: 'WY', value: 'WY', displayValue: 'Wyoming' },

        ]
      },

    },
    postData: [],
    response: '',
    post: '',
    name: '',
    party: '',
    state: '',
    district: '',
    phone: '',
    office: '',
    link: ''
  }

  //testing server api calls.....
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  //Select Component changes updating form
  changeHandler = event => {

    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

  }
  // set state for data
  loadData = (res) => {
    this.setState({ postData: res.data.results, name: '', party: '', state: '', district: '', phone: '', office: '', link: '' }).catch(err => console.log(err));
  };
  //form submit send out API calls to server.js
  formSubmitHandler = async e => {
    e.preventDefault();
    const formData = {};
    for (let formElementId in this.state.formControls) {
      formData[formElementId] = this.state.formControls[formElementId].value;
    }
    const id = formData.area;

    if (formData.branch === 'house') {
      const response = await fetch('/representatives/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: undefined,
      });
      const body = await response.text();
      this.setState({ postData: body })


    } else if (formData.branch === 'senate') {
      const response = await fetch('/senators/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: undefined,
      });
      const body = await response.text();
      this.setState({ postData: body })
    }
  }


  render() {

    return (
      <div className="App">
        <form onSubmit={this.formSubmitHandler}>
          <h1>
            <strong>Who's In Congress?</strong>
          </h1>
          <Select name="branch"
            placeholder={this.state.formControls.branch.placeholder}
            value={this.state.formControls.branch.value}
            onChange={this.changeHandler}
            options={this.state.formControls.branch.options}
            touched={this.state.formControls.branch.touched}
            valid={this.state.formControls.branch.valid}
          />
          <Select name="area"
            placeholder={this.state.formControls.area.placeholder}
            value={this.state.formControls.area.value}
            onChange={this.changeHandler}
            options={this.state.formControls.area.options}
            touched={this.state.formControls.area.touched}
            valid={this.state.formControls.area.valid}
          />
          <button type="submit"
            className="myButton"
            onClick={this.formSubmitHandler}
            disabled={!this.state.formControls.area.valid || !this.state.formControls.branch.valid}>Submit</button>
        </form>
        <Results
          postData={this.state.postData}
          name={this.state.name}
          party={this.state.party}
          state={this.state.state}
          district={this.state.district}
          phone={this.state.phone}
          office={this.state.office}
          link={this.state.link}

        />
        <p className='sadness'>{this.state.postData}</p>

      </div>
    );
  }
}

export default App;
