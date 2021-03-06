import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/sideNav.css'
import HouseIcon from '@material-ui/icons/House';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {isMobile} from 'react-device-detect'

const dropDown = {
    background: '#31353D',
    width: '100%',
    height: '2vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '1.3vw',
    margin: '0',
    border: '0'
}

const dropDownBack = {
    marginTop: '3vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    background: '#31353D',
    boxShadow: 'none',
    minHeight: '0',
    margin: '0',
    padding: '0'
}

const dropDownHead = {
    fontFamily: "'Play', sans-serif",
    color: 'white',
    fontWeight: '600',
    fontSize: '15px',
    textDecoration: 'none',
    paddingLeft: '10px',
    verticalAlign: 'center',
    paddingTop: '5px',
    margin: '0'
}


const dropDownActive = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    margin: '0'
}

function RenderTest(props) {
    if (props.true == true) {
        return (
            <div className='__SideLinks-Static-Box' style={{ paddingLeft: '1.3vw', paddingRight: '5vw' }}>
                <HouseIcon />
                <Link to={{
                    pathname: '/video',
                    state: {
                        clicked: true
                    }
                }} className='__SideLinks-Static' style={{ width: '20vw', paddingLeft: '.7vw' }}>Go to Appointment</Link>
            </div>
        )
    }
    else { return (null) }
}


class body extends Component {

    constructor(props) {
        super(props)

        this.state = {
            true: false,
            doctorsAllowed: ['No doctors to add'],
            link: ''
        }
    }

    componentDidMount() {
        console.log(this.props.subLevel)
        setTimeout(this.checkAP, 1500)
        setTimeout(this.checkDoctors, 2000)
    }

    checkAP = () => {
        console.log(this.props.APtime)
        if (this.props.APtime == true) {
            this.setState({ true: true })
        }
    }

    checkDoctors = () => {
        var checker = []
        if (this.props.allowed[1] != 'none') {
            if (this.props.allowed.length > 0) {
                for (var i = 0; i < this.props.allowed.length; i++) {
                    checker.push(this.props.allowed[i])
                    console.log(this.props.allowed)
                }
                setTimeout(this.pushDoctors(checker), 1500)
            }
        }
    }

    pushDoctors = (test) => {
        this.setState({ doctorsAllowed: test, link: '/main/addProviders' })
    }

    renderStuff = {}


    render() {
        console.log(this.props.doctors)
        var link = this.state.link
        return (
            <div className={isMobile ? '__body-main-mobile':'__body-main'}>
                <div className={isMobile ? '__SideLinks-Static-Box-Mobile' : '__SideLinks-Static-Box'}>
                    <HouseIcon style={{color: 'white'}}/>
                    <Link to='/main/overview' className='__SideLinks-Static'>Overview</Link>
                </div>
                <div className={isMobile ? '__SideLinks-Static-Box-Mobile' : '__SideLinks-Static-Box'}>
                    <HouseIcon style={{color: 'white'}}/>
                    <Link to='/main/findYourDoc' className='__SideLinks-Static'>Find Your Doctor</Link>
                </div>
                <ExpansionPanel style={dropDownBack} >
                    <ExpansionPanelSummary
                        expandIcon={<KeyboardArrowRightIcon style={{ color: 'orange' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={dropDown}
                        className='__DD-header'
                    >
                        <HouseIcon style={{ color: 'white' }} />
                        <p style={dropDownHead}>Tasks</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={dropDownActive}>

                        {/*<Link to="/main/cart" className='__SideLinks'>Cart</Link>*/}
                        <Link to='/main/tasks' className='__SideLinks'>Tasks</Link>
                        {/* <Link to={this.props.subLevel == 'nonSub' ? '/main/subinfo' : '/main/subTasks'} className='__SideLinks'>Subscription Tasks</Link> */}
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
                    {/* --- this needs to be changed --- 
                    
                    <ExpansionPanel style={dropDownBack} >
                        <ExpansionPanelSummary
                            expandIcon={<KeyboardArrowRightIcon style={{ color: 'orange' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={dropDown}
                            className='__DD-header'
                        >
                            <HouseIcon style={{ color: 'white' }} />
                            <p style={dropDownHead}>Doctors</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={dropDownActive}>

                            
                            <Link to="/main/Doctors" className='__SideLinks'>View Doctors</Link>

                        </ExpansionPanelDetails>
                    </ExpansionPanel> */}
                    {/* --- this is not currently neccesary --- 
                    <ExpansionPanel style={dropDownBack} >
                            <ExpansionPanelSummary
                                expandIcon={<KeyboardArrowRightIcon style={{ color: 'orange' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={dropDown}
                            >
                                <HouseIcon style={{ color: 'white' }} />
                                <p to="/main/overview" style={dropDownHead}>Team</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={dropDownActive}>
                                <Link to="/main/Team" className='__SideLinks'>View Team</Link>

                            </ExpansionPanelDetails>
                        </ExpansionPanel> */}
                    <ExpansionPanel style={dropDownBack} >
                                <ExpansionPanelSummary
                                    expandIcon={<KeyboardArrowRightIcon style={{ color: 'orange' }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={dropDown}
                                >
                                    <HouseIcon style={{ color: 'white' }} />
                                    <p to="/main/overview" style={dropDownHead}>Appointments</p>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={dropDownActive}>
                                    <Link to="/main/scheduler" className='__SideLinks'>Make An Appointment</Link>
                                    <Link to="/main/Appointments" className='__SideLinks'>View upcoming appointments</Link>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        
                    {/* --- sub stuff not currently needed --- 
                    <ExpansionPanel style={dropDownBack} >
                        <ExpansionPanelSummary
                            expandIcon={<KeyboardArrowRightIcon style={{ color: 'orange' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={dropDown}
                            className='__DD-header'
                        >
                            <HouseIcon style={{ color: 'white' }} />
                            <p style={dropDownHead}>Subscription</p>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={dropDownActive}>
                            {
                                this.props.subLevel == 'nonSub' ?
                                    (<Link to="/main/subinfo" className='__SideLinks'>Purchase a Subscription</Link>)
                                    :
                                    (<Link to="/main/yourSub" className='__SideLinks'>Your Subscription</Link>)
                            }
                            {
                                this.props.subLevel == 'nonSub' ?
                                    (null)
                                    :
                                    (<Link to="/main/subschedule" className='__SideLinks'>Schedule Appointment With Team</Link>)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel> */}
                    <ExpansionPanel style={dropDownBack} >
                        <ExpansionPanelSummary
                            expandIcon={<KeyboardArrowRightIcon style={{color: 'orange'}}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={dropDown}
                        >
                        <HouseIcon style={{color: 'white'}}/>
                        <p to="/main/overview" style={dropDownHead}>Help</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={dropDownActive}>
                        <Link to="/main/support/FAQ" className='__SideLinks'>FAQ</Link>
                        <Link to="/main/support/tutorial" className='__SideLinks'>Basic Tutorial</Link>
                        <Link to="/main/support/askSupport" className='__SideLinks'>Ask Support</Link>
                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                    {/* {this.props.sub == null ?
                        (null)
                        :
                        (
                            this.props.sub.nurse.initialConsultation == false ?
                                (<div className='__body-alert'><p>&larr; Please Schedule Inital Consultation!</p></div>)
                                :
                                (null)
                        )
                    } */}
            </div>
                )
            }
        
        }
        
export default body