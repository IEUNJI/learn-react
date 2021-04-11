import React from 'react';

import './Snapshot.css';

class Snapshot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: []
    };

    this.viewArea = React.createRef();
  }

  componentDidMount() {
    setInterval(() => {
      const { messageList } = this.state;

      this.setState({
        messageList: [...messageList, messageList.length]
      });
    }, 1000);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.viewArea.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.viewArea.current.scrollTop += this.viewArea.current.scrollHeight - snapshot;
  }

  render() {
    const { messageList } = this.state;

    return (
      <div className="snapshot">
        <ul className="view-area" ref={this.viewArea}>
          {
            messageList.map(msg => {
              return <li key={msg}>{msg}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default Snapshot;
