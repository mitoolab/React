import React from 'react';

// export 위치는 위,아래 가능하다.
export default class ContactInfo extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>{this.props.contact.name}</div>
    );
  }
}