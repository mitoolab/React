// 2017 JavaScript Mitoo all rights reserved.

import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import updated from 'react-addons-update';

export default class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [{
        name: 'Abet',
        phone: '010-0000-0001'
      }, {
        name: 'Betty',
        phone: '010-0000-0002'
      }, {
        name: 'Cat',
        phone: '010-0000-0003'
      }, {
        name: 'David',
        phone: '010-0000-0004'
      }]
    };
    // 임의 메소드를 만들때는 꼭 this는 바인딩 해야한다.
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // keyword의 이벤트 객체를 변경해주는 메서드
  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });
    console.log('key:', key);
  }
  
  render() {
    const mapToComponerts = (data) => {
      // 오름차순 정렬
      data.sort();
      data = data.filter(
        (contact) => {
          return contact.name.toLowerCase()
            .indexOf(this.state.keyword.toLowerCase()) > -1;
        }
      );
      return data.map((contact, i) => {
        return (<ContactInfo 
                        contact={contact} 
                        key={i}
                        onClick={() => this.handleClick(i)}/>);
      });
    };
    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponerts(this.state.contactData)}</div>
        <ContactDetails 
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          />
      </div>
    );
  }
}
