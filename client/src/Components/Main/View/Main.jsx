import React, { Component } from 'react';
import Sidebar from '../../SideNav/View/index'
import Header from '../../Header/views/index'
import Overview from '../../Overview/View/index'
import tasks from '../../Tasks/View/Tasks'
import cart from '../../ShoppingCart/View/Cart'
import subscription from '../../PurchaseSubscription/View/PurchaseSub'
import admin from '../../AdminCommands/View/Admin'
import findProviders from '../../ChooseDoctor/View/index'
import sendTasks from '../../Providers/Views/SendTasks'
import Schedule from '../../Scheduling/View/index'
import {Route} from 'react-router-dom'
import video from '../../Video/View/index'
import sendDoctor from '../../Providers/Views/sendDoctors'
import appointments from '../../Providers/Views/viewAppointments'
import store from '../../Store/View/index'
import '../styling/main.css'

class Main extends Component {



    constructor() {
        super();

        this.state = {
            email: null
        };
    }





    render(){
        return(
            <div className='main-container' id="mainBack" class="colorWhite" style={{overflow: 'hidden',width:'100vw', height:'100vw', display:'flex', backgroundImage: `../../LandingPage/images/general-header-image.jpg`}}>

            <Sidebar/>
            <div style={{width:'90vw', minHeight: '100vh'}}>
            <Header/>
            <div style={{border: '2px solid #26262b', borderLeft:'none', height:'90vh', overflowX: 'hidden', overflowY: 'hidden',  backgroundColor: '#36393F', background: 'rgba(204, 204, 204, 0.05)'}}>
              <Route exact path="/main/overview" component={Overview}/>
              <Route exact path="/main/tasks" component={tasks}/>
              <Route exact path="/main/cart" component={cart}/>
              <Route exact path="/main/subscription" component={subscription}/>
              <Route exact path="/main/adminPage" component={admin}/>
              <Route exact path="/main/addProviders" component={findProviders}/>
              <Route exact path="/main/sendTasks" component={sendTasks}/>
              <Route exact path="/main/scheduler" component={Schedule}/>
              <Route exact path='/main/video' component={video}/>
              <Route exact path='/main/sendDoctor' component={sendDoctor}/>
              <Route exact path='/main/appointments' component={appointments}/>
              <Route exact path='/main/store' component={store}/>
            </div>
            </div>
            </div>
            



        )
    }





}

export default Main;


