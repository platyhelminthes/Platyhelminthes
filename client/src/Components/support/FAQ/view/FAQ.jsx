import React, {Component} from 'react'
import '../styles/FAQ.css'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

class FAQ extends Component {

    constructor(props){
        super(props)
        this.state = {
            selected: 0
        }
        this.select = this.select.bind(this)
    }

    select(e){
        this.setState({selected: e.target.value})
    }

    render(){


       var questions = [
            {
                q: 'Are your doctors accredited',
                a: 'We make sure all of our doctors have the necessary certifications. We also put all doctors through an initial interview to make sure we only have the best doctors representing us',
                n: 0
            },
            {
                q: 'What are tasks',
                n: 1
            },
            {
                q: 'Did Epstein kill himself',
                n: 2
            },
            {
                q: 'Why use your platform',
                n: 3
            },
            {
                q: 'How do i use your platform',
                n: 4
            },
            {
                q: 'Why use a subscription',
                n: 5
            },

       ]




        return(
            <div className='__FAQ-main'>
                <div style={{height: '100%', width: '100%'}}>
                <div className='__FAQ-info'>
                    <h2 style={{borderBottom: '1px solid black'}}>{questions[this.state.selected].q}</h2>
                    <p style={{marginLeft: '30px', marginRight: '30px', marginTop: '50px'}}>{questions[this.state.selected].a}</p>
                </div>
                <div className='__FAQ-list'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Question
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {questions.map(
                                (row)=>(
                                <TableRow>
                                    <TableCell>
                                    {row.q}
                                    </TableCell>
                                    <TableCell>
                                        <button value={row.n} onClick={this.select}>
                                            Select
                                        </button>
                                    </TableCell>
                                </TableRow>
                                
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>
                </div>
            </div>
        )
    }

}

export default FAQ