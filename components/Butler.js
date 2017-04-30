import React from 'react';


class Butler extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return(
        { this.props.child }
      );

  }

}