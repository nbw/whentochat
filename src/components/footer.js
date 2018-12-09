import React, {Component} from 'react'
import { Link } from 'gatsby'

class Footer extends Component {
  state = {
    email: "Email"
  }

  showEmail = () => {
    this.setState({email: this.props.email});
  }

  render() {
    return (
      <div className="footer" >
        <ul>
          <li className="title">
            {this.props.siteTitle}
          </li>
          <li>
            <Link
              to="/about/"
              style={{
                color: 'white',
              }}
            >
              About
            </Link>
            <li>
              <Link
                to="/faq/"
                style={{
                  color: 'white',
                }}
              >
                FAQ & Support
              </Link>
            </li>
          </li>
        </ul>
        <ul>
          <li className="title">
            Contact
          </li>
          <li>
            <a href="https://twitter.com/nathanwillson">
              @nathanwillson
            </a>
          </li>
          <li>
            <span className="email" onClick={() => this.showEmail()}>{this.state.email}</span>
          </li>
        </ul>
        <ul>
          <li>
            Copyright © 2018
          </li>
        </ul>
      </div>
    )
  }
}

export default Footer

