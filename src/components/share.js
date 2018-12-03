import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faCopy, faLink } from '@fortawesome/free-solid-svg-icons'
import bitly from "../utils/bitly"

class Share extends Component {
  state = {
    url: "",
    show: false
  }

  showClass = () => {
    return this.state.show ? 'active' : '';
  }

  onShareClick = () => {
    this.setState({
      show: true,
      url: this.props.generateLink()
    });
  }

  onCopyClick = () => {
    let copyText = document.getElementById("copyInput");
    copyText.select();
    document.execCommand("copy");
    this.setState({
      url: "Copied!"
    });

    let currUrl = this.state.url;

    setTimeout( () => {
      this.setState({
        url: currUrl
      });
    }, 1000);
  }

  onShortenClick = async () => {
		const shortURL = await bitly.shorten(this.state.url);
		this.setState({
			url: shortURL
		});
	}

  render() {
    return (
      <div id="share">
        <div className={"share " + this.showClass()}>
          <button className="shareBtn" onClick={() => this.onShareClick()}>
            <FontAwesomeIcon icon={faShare} />&nbsp;
            Share
          </button>
          <div className="url">
            <input id="copyInput" readOnly value={this.state.url} />
          </div>
          <div className="copy">
            <button onClick={() => this.onCopyClick()}>
              <FontAwesomeIcon icon={faCopy} />&nbsp;
              Copy
            </button>
            <button onClick={() => this.onShortenClick()}>
              <FontAwesomeIcon icon={faLink} />&nbsp;
              Shorten
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Share

