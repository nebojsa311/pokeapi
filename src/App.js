import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const PATH_BASE = "https://pokeapi.co/api/v2/pokemon/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: "pikachu",
      input: "pikachu",
      pokeName: "pikachu",
      abilities: [],
      pictures: [],
      type: null,
      baseExp: null,
      name: null,
    };
   
    this.onInputChange = this.onInputChange.bind(this);
    this.findIt = this.findIt.bind(this);
  }

  onInputChange(event) {
    const toLowerCase = event.target.value.toLowerCase();
    this.setState({ input: toLowerCase });
  }

  findIt() {
    const TO_FIND = this.state.input;
    axios(`${PATH_BASE}${TO_FIND}`)
      .then((result) =>
        this.setState({
          pokemon: result,
          pokeName: this.state.input,
          pictures: result.data.sprites,
          abilities: result.data.abilities
            .map((ele) => ele.ability.name)
            .join(", "),
          type: result.data.types.map((ele) => ele.type.name),
          baseExp: result.data.base_experience,
          name: result.data.name,
        })
      )
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.findIt();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="inputDiv">
          <InputGroup className="mb-3" size="sm-3">
            <FormControl
              placeholder="Looking for a pokemon?"
              aria-label="Input for pokemon name"
              aria-describedby="basic-addon2"
              onChange={this.onInputChange}
            />
            <InputGroup.Append>
              <Button variant="btn btn-primary" onClick={this.findIt}>
                Go!
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="imagesDiv">
          <img
            src={this.state.pictures.front_default}
            alt="pictures"
            className="pokeImage"
          ></img>
          <img
            src={this.state.pictures.back_default}
            alt="pictures"
            className="pokeImage"
          ></img>
        </div>
        <div className="infoDiv">
          <p>
            <strong>Name</strong>: {this.state.name}
          </p>
          <p>
            <strong>Type</strong>: {this.state.type}
          </p>
          <p>
            <strong>Abilities</strong>: {this.state.abilities}
          </p>
          <p>
            <strong>Base experience</strong>: {this.state.baseExp}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
