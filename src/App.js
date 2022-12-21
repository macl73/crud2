import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import AddForm from "./components/AddForm.js";
import RenderNotes from "./components/RenderNotes.js";

const serverURL = "http://localhost:7777/notes/";

async function sendRequest(url, method, body = null) {
  let response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: method === "POST" ? JSON.stringify(body) : undefined
  });

  if (method === "GET") {
    let result = await response.json();
    return result
  };
};

class App extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func,
    newText: PropTypes.func,
    addText: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: null,
      data: null,
      id: 1
    };

    this.sendRequest = sendRequest
  };

  componentDidMount() {
    this.sendRequest(serverURL, 'GET')
    .then(res => this.setState({data: res, loading: false}));
  };

  handleChange(e) {
    this.setState({
      text: {id: this.state.id, text: e.target.value},
      id: this.state.id + 1});
  };

  handleSubmit(e) {
    e.preventDefault();
    this.sendRequest(serverURL, 'POST', this.state.text)
    .then(() => this.sendRequest(serverURL, 'GET'))
    .then(res => this.setState({data: res}));
    e.target.reset();
  };

  handleDelete(itemId) {
    this.sendRequest(serverURL + itemId, 'DELETE')
    .then(() => this.sendRequest(serverURL, 'GET'))
    .then(res => this.setState({data: res}));
  };

  refresh() {
    this.sendRequest(serverURL, 'GET')
    .then(res => this.setState({data: res, loading: false}));
  };
  
  render () {
    if (this.state.loading) {return <div>Loading...</div>};

    return (
      <div className="crud-app">
        <AddForm
          newText={e => this.handleChange(e)}
          addText={e => this.handleSubmit(e)}/>

        <RenderNotes 
          data={this.state.data} 
          onDelete={id => this.handleDelete(id)} />

        <button className="button button-refresh" 
          onClick={() => this.refresh()}>Refresh</button>
      </div>
    );
  };
};

export default App;
