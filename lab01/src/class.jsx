import React, { Component } from "react";

export class Counter extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      name: "Walter",
      title: props.title
    };
  }

  componentDidMount(){
    console.log("Hellooo")
    this.add()
  }

  componentWillUnmount(){
 console.log('byeee')
  }



  add = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>count: {this.state.count}</p>
        <p>name: {this.state.name}</p>
        <button
          onClick={() => {
            this.add();
          }}
        >
          Click
        </button>
      </div>
    );
  }
}
