import React from 'react';
import ReactDOM from 'react-dom';
import Display from './parts/Display.js';

class Registration extends React.Component {

  constructor(props){
    super(props);

    // console.log("[P] Registration",props)

    this.state = { type: 'A' };
    this.typeChange = this.typeChange.bind(this);
    this.join = this.join.bind(this);

  }

  join(){
    var player = {
      name: ReactDOM.findDOMNode(this.refs.inputUsername).value,
      type: this.state.type
    }    
    // EMIT AN EVENT TO THE SERVER
    this.props.emit('join', player);
  }

  typeChange(type){
    this.setState({ type: type });
  }

  render() {
    var registration = this;
    return (
      <div className="col-md-4 col-md-offset-4" style={{ textAlign: 'center'}}>
        <h1 style={{ margin: '250px 0 40px 0'}}>WELCOME</h1>
        <form action="javascript:void(0)" onSubmit={ registration.join }>

          <div className="form-group">
            <input type="username" 
                   className="form-control" 
                   style={{ margin: "20px 0" }}
                   id="inputUsername" 
                   ref="inputUsername"
                   placeholder="username" required />

            <label className="radio-inline" >
              <input ref="playerType" type="radio" name="playerType" id="typeA" value="typeA" onChange={ () => registration.typeChange("A") }/> A
            </label>
            <label className="radio-inline">
              <input ref="playerType" type="radio" name="playerType" id="typeB" value="typeB" onChange={ () => registration.typeChange("B") }/> B
            </label>
            <label className="radio-inline">
              <input ref="playerType" type="radio" name="playerType" id="typeC" value="typeC"  onChange={ () => registration.typeChange("C") }/> C
            </label>

          </div>
          

          <button style={{ margin: "20px 0"}} type="submit" className="btn btn-default">PLAY</button>
        </form>
      </div>
    );
  }

};

export default Registration;

            // <label htmlFor="inputUsername">Username</label>
