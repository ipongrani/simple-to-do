import React from 'react';
import Styled, { ThemeProvider } from 'styled-components';



const edit = {
  borderA: '1.5px solid red',
  borderB: '.5px solid green',
};

const TaskInput = Styled.input`
  width: 90%;
  height: 30px;
  padding: 0;
  font-size: 24px;
  text-align: center;
  margin-top: 3%;
  background-color: hsla(51, 93%, 59%, 1);
  border: .5px solid hsla(51, 93%, 59%,1);
`;

const TaskList = Styled.input`
  width: 80%;
  height: 20px;
  padding: 0;
  font-size: 18px;
  text-align: left;
  margin: 2% 1% 0 1%;
  border: none;
  border-bottom: ${edit.borderB};

  :disabled {
    background-color: transparent;
  }
`;

const Button = Styled.div`
  height: 30px;
  margin: 3% 1.5% 0 1.5%;
  text-align: left;

  :hover {
    cursor: ${props => props.name ? 'pointer' : undefined};
  }
`;

const TaskCont = Styled.div`
width: 90%;
height: auto;
display: flex;
flex-flow: row nowrap;
`;

const ListCont = Styled.div`
width: 90%;
height: 240px;
margin: 1.5% 0 0 0;
display: flex;
padding: 1%;
flex-flow: column nowrap;
overflow: auto;
`;


const LinePack = Styled.div`
display: flex;
flex-flow: row nowrap;
min-height: 24px;
`;




export default class ToDo extends React.Component {

  state = {
    taskInput:'',
    list: [],
    indexKey: 0,
  }

  input = React.createRef();


  insertTask = (...param) => {
    let nl = <LinePack key={this.state.indexKey}>
                <Button>
                  <i className="fas fa-chevron-right"></i>
                </Button>

                  <TaskList data-key={this.state.indexKey} type="text" name={param[0]} defaultValue={param[1]} placeholder="Default" disabled={true}/>

                <Button name="edit" >
                  <i  className="fas fa-pen" onClick={this.handleClick}></i>
                </Button>
                <Button name="delete">
                  <i className="fas fa-minus" onClick={this.handleClick}></i>
                </Button>
            </LinePack>


    this.setState({indexKey: this.state.indexKey+1});
    this.setState({list: [nl,...this.state.list]})
  }


  handleClick = (e) => {
    e.preventDefault();

    switch(e.target.parentNode.previousSibling.getAttribute('name')){

      case 'taskInput' :

        let ln = e.target.parentNode.previousSibling.value.split(' ');
        this.setState({[ln[0]]: e.target.parentNode.previousSibling.value});
        this.insertTask(ln[0],e.target.parentNode.previousSibling.value);

      break;


      default :

        switch(e.target.parentNode.getAttribute('name')){

          case 'edit' :
            e.target.parentNode.previousSibling.disabled === false ?
           (e.target.parentNode.previousSibling.style.borderBottom = edit.borderB,
            e.target.parentNode.previousSibling.disabled = !e.target.parentNode.previousSibling.disabled) :
           (e.target.parentNode.previousSibling.style.borderBottom = edit.borderA,
            e.target.parentNode.previousSibling.disabled = !e.target.parentNode.previousSibling.disabled);
          break;

          case 'delete' :
            console.log("key of clicked ", e.target.parentNode.previousSibling.previousSibling.getAttribute('data-key'));
            this.setState({list: this.state.list.filter((data) => data.key != e.target.parentNode.previousSibling.previousSibling.getAttribute('data-key'))})
          break;

          default :
            console.log("No action set yet.");
          break;

        }

      break;
    }
  }


  handleChange = (e) => {
    this.setState({[e.target.getAttribute('name')]: e.target.value})
  }


  render(){

    console.log("editing here ", this.state.editing)

    return (
      <div style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center'}}>

        <TaskCont>
          <TaskInput name="taskInput" onChange={this.handleChange} value={this.state.taskInput} placeholder="Write To-Do Here" />
            <Button name="addTask">
                <i className="fas fa-2x fa-plus" onClick={this.handleClick}></i>
            </Button>
        </TaskCont>

        <ListCont>
          {this.state.list}
        </ListCont>

      </div>
    )
  }
}
