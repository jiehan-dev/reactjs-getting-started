// Since we are not using npm and webpack, it doesn't work this way
// import React from 'react';
// import ReactDOM from 'react-dom';

// Test Case Username: gaearon, sophiebits, sebmarkbage
const CardList = (props) => (
  <div>
    {props.profiles.map((profile, index) => (
      <Card key={index} {...profile} />
    ))}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;

    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { username: '' };
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.username);

    const resp = await axios.get(`https://api.github.com/users/${this.state.username}`);

    console.log(resp.data);

    this.props.onSubmit(resp.data);

    this.setState({ username: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="GitHub username" onChange={(event) => this.setState({ username: event.target.value })} required />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(<App title="The GitHub Cards App" />, document.getElementById('root'));
