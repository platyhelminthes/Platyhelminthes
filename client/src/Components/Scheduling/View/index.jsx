import React from 'react'
import { Component } from 'react'
import moment from 'moment';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
import Doctors from './doctorPicker.jsx'
import CalendarComp from './calendar.jsx'
import CurrentAppointments from './currentAppointments'
import loadingCircle from '../../Pictures/loadingCircle.png'
import '../Styles/Schedule.css'
import Appointments from './availableAppointments'



class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            redirect: false,
            APT: this.props.APT,
            currentAPT: 0,
            docs: [],
            userAppointments: this.props.UAPP,
            appointments: ['08:00 ppp', '08:30'],
            appointmentsPresort: [],
            appointmentsToShow: null,
            pickedDoctor: null,
            loading: true,
            appointmentTimes: [],
            providers: [],
            doctor: null,
            doctorType: null,
            docId: null,
            date: null,
            days: null,
            dateDay: null,
            openAppointments: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleSubmit3 = this.handleSubmit3.bind(this);
    }


    handleChange = (date) => {
        var dateClean = moment(date).format('YYYY-MM-DD')
        var Day = moment(date).format('dddd')
        alert(moment(date).format('dddd'))
        this.setState({ date: dateClean, dateDay: moment(date).format('dddd')})
        this.dateCheck(dateClean, Day)
    }

    dateCheck = (date, day12) => {
        var matching = []
        for (var i = 0; i < this.state.appointmentsPresort.length; i++) {

            if (moment(this.state.appointmentsPresort[i].date).format('YYYY-MM-DD') == date) {
                matching.push(moment(this.state.appointmentsPresort[i].date).format('LT'))

            }
        }
        this.setState({ appointments: matching })
        matching = []
        setTimeout(this.checkAvailable, 200)
    }
    componentDidMount() {
        //this.getUser()
        this.getProviders()
        console.log(this.props.UAPP)
    }
    load = () => {
        if (this.state.userAppointments == null) {
            this.setState({ count: this.state.count + 1 })
            setTimeout(this.checkLoad, 100)
        }

        else {
            this.setState({ loading: false })
        }

    }

    checkLoad = () => {
        if (this.state.count > 5) {
            this.setState({ count: 0 })
            this.getProviders()
        }
        else { setTimeout(this.load, 100) }
    }

    nullCheck = () => {
        console.log(this.state.providers)
    }

    handleSubmit(e) {
        (e).preventDefault()
        this.checkAvailable()

    }

    handleSubmit2(e) {
        (e).preventDefault()
        this.getAppointments(e.target.value)
        setTimeout(this.checkAppointments, 300)
        setTimeout(this.checkAPT, 700)
    }

    handleSubmit3(e) {
        (e).preventDefault()
        if (this.state.date == null) {
            alert('Please choose a date')
        }
        else if (this.state.doctor == null) {
            alert('Please choose a doctor')
        }
        else if (this.state.doctor == null && this.state.date == null) {
            alert('Please pick a doctor and a date')
        }
        else if (this.state.currentAPT <= 0) {
            alert('Please purchase an appointment for this doctor type')
        }
        else {
            alert(e.target.value)
            this.createAppointment(e.target.value)
            this.setState({ redirect: true })
        }
    }

    createAppointment = (time) => {
            var cleanTime = null
        if (time == '') { alert('sorry that time is not available!') }
        else {
            if(time)
            Axios.post('/api/users/removeAPT',
                {
                    ATType: this.state.doctorType
                })

            var dateTime = '' + this.state.date + 'T' + time + ':00.000+00:00'
            Axios.post('/api/providers/makeAppointment',
                {
                    date: moment(dateTime).add(7, 'hours'),
                    id: this.state.docId,
                    name: this.state.doctor
                }
            )
        }
    }
    //getUser = () => {
    //    Axios.get('/api/users/getUser')
    //        .then((res) => {
    //            this.setState({
    //                APT: res.data.data.appointmentTokens,
    //                userAppointments: res.data.data.appointments
    //            })
//
    //        })
    //}

    checkDocs = () => {
    }
    checkAPT = () => {
        for (var i = 0; i < this.state.APT.length; i++) {
            if (this.state.doctorType == this.state.APT[i].type) {
                this.setState({ currentAPT: this.state.APT[i].ammount })
            }
        }
    }

    checkAppointments = (name) => {
        var show = []
        for (var i = 0; i < this.state.userAppointments.length; i++) {
            if (this.state.userAppointments[i].userName == this.state.doctor && moment(this.state.userAppointments[i].date).isAfter()) {
                show.push(this.state.userAppointments[i])
            }
        }
        this.setState({ appointmentsToShow: show })
    }
    getProviders = () => {
        Axios.get('/api/users/getProviders')
            .then(
                (res) => {
                    this.setState({ providers: res.data.data })
                }
            ).then(this.load())
    }

    getAppointments = (id) => {
        Axios.post('/api/providers/getAppointments',
            { id: id }
        ).then(
            (res) => {
                this.setState({
                    currentAPT: 0,
                    appointmentsPresort: res.data.data[0].appointments,
                    doctorType: res.data.data[0].providerInfo.providerType,
                    doctor: res.data.data[0].fullName,
                    docId: res.data.data[0]._id,
                    days: res.data.data[0].providerInfo.availability
                })
            }
        ).then(this.checkAvailable)
    }

    checkAvailable = () => {

        if(this.state.dateDay == 'Monday'){
            for(var i=0; i < this.state.appointments.length;i++){
                if(this.state.days.monday.includes(this.state.appointments[i])){
                    alert(this.state.appointments[i])
                    this.state.days.monday.splice(this.state.days.monday.indexOf(this.state.appointments[i]), 1 )
                }
            }
            this.setState({appointmentTimes: this.state.days.monday})
        
        }

        if(this.state.dateDay == 'Tuesday'){
            this.setState({appointmentTimes: this.state.days.tuesday})
        }

        if(this.state.dateDay == 'Wednesday'){
            this.setState({appointmentTimes: this.state.days.wednesday})
        }

        if(this.state.dateDay == 'Thursday'){
            this.setState({appointmentTimes: this.state.days.thursday})
        }

        if(this.state.dateDay == 'Friday'){
            this.setState({appointmentTimes: this.state.days.friday})
        }

        if(this.state.dateDay == 'Saturday'){
            this.setState({appointmentTimes: this.state.days.saturday})
        }

        if(this.state.dateDay == 'Sunday'){
            this.setState({appointmentTimes: this.state.days.sunday})
        }
    }

    render() {
        var providers = this.state.providers
        var date = this.state.date
        if (this.state.date == null) { date = "please choose a date" }
        if (this.state.redirect == true) { return (<Redirect to='/main/overview' />) }
        else if (this.state.loading == true) {
            return (
                <div style={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <h1 style={{ marginLeft: '6vw', marginTop: '20vh' }}>Loading...</h1>
                    <img style={{ marginTop: '5vh', width: '300px', height: '297px' }} src={loadingCircle} id="loadingCircle" />
                </div>
            )
        }
        else {
            return (
                <div className="appointment-cont" >
                    <div className="no-idea" >
                        <Doctors handleSubmit2={this.handleSubmit2} providers={this.state.providers} />
                        <CurrentAppointments appointments={this.state.appointmentsToShow} />
                        <CalendarComp handleChange={this.handleChange} />
                    </div>
                    <div className="wtf" >
                        <div className="info-bar" >
                            <h4 style={{ textAlign: 'center', margin: '0', marginTop: '.5vh', width: '50%' }}>{date}</h4>
                            <h4 style={{ textAlign: 'center', margin: '0', marginTop: '.5vh', width: '50%' }}> Appointment Tokens Left: {this.state.currentAPT}</h4>
                        </div>
                        <Appointments times={this.state.appointmentTimes} onClick={this.handleSubmit3}/>
                    </div>





                </div>
            )
        }
    }


}

export default Schedule