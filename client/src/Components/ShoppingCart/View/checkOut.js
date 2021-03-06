import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      APPTOKENS: []
    };
    this.submit = this.submit.bind(this);
  }

  addAppointments = (l) => {
    console.log(l)
    Axios.post('/api/users/addProvider',
      {
        name: this.props.items[l].docType
      })
    Axios.post('/api/cart/updateAccount',
      {
        ATType: this.props.items[l].docType,
        ATAmmount: this.props.items[l].amount
      })
  }


  checkout = (e) => {
    Axios.post('/api/cart/finish')
  }

  async submit(ev) {
    Axios.get('/api/users/getUser')
      .then((res) => {
        this.setState({ APPTOKENS: res.data.data.appointmentTokens })
      })
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log(token.id)
    let response = await Axios.post("/api/cart/charge", {
      body: token.id,
      total: this.props.total
    })

    if (response.statusText == 'OK') {


      for (var l = 0; l < this.props.items.length; l++) {
        var next = true
        for (var i = 0; i < this.state.APPTOKENS.length; i++) {
          if (this.state.APPTOKENS[i].type == this.props.items[l].docType) {
            this.addToken(l)
            setTimeout(this.checkout, 2000)
            setTimeout(this.setState({ complete: true }), 4000)
            next = false
          }
        }
        if (next == true) {
          console.log(l + 'before timeout')
          this.addAppointments(l)
          setTimeout(this.checkout, 2000)
          setTimeout(this.setState({ complete: true }), 4000)
        }
      }
    }
  }

  addToken = (l) => {
    console.log(l + "this.addToken")
    Axios.post('/api/cart/addToken',
      {
        ATType: this.props.items[l].docType,
        ATAmmount: this.props.items[l].amount
      })
  }

  render() {

    if (this.state.complete == true) { return (<h1>Purchase Complete</h1>) }
    return (
      <div>
      <div className="modal_background"></div>
        <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Submit Payment</button>
        </div>
        </div>
    );
  }
}

export default injectStripe(CheckoutForm);