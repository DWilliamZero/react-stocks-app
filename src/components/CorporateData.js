import React from 'react';
import Axios from 'axios';
import Maps from './Maps';

const IEX_TOKEN = process.env.REACT_APP_IEX_TOKEN;

class CorporateData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symbol: props.data.symbol,
      data: [],
      logo: []
    }
  }

  componentDidMount = async () => {
    this.fetchCompanyData();
    this.fetchCompanyLogo();
  }

  fetchCompanyData = async () => {
    try {
      const companyData = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/${this.state.symbol}/company?token=${IEX_TOKEN}`
      )
      console.log('co_data.data:', companyData.data)
      this.setState({
        data: companyData.data
      })
      console.log(this.state.data)
    } catch (error) {
      console.error(error)
    }
  }

  fetchCompanyLogo = async () => {
    try {
      const logo = await Axios.get(
        `https://cloud.iexapis.com/stable/stock/${this.state.symbol}/logo?token=${IEX_TOKEN}`
      )
      this.setState({
        logo: logo.data.url
      })
      console.log(this.state.logo)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    console.log(this.state.logo)
    return (
      <div className="hero-data" >
        <h1>{this.state.data.companyName}</h1>
        <div className='primary'>
          <div className='corp-data'>
            <h2>Website: <a href={this.state.data.website} target='_blank' rel="noopener noreferrer">{this.state.data.website}</a></h2>
            <h2>CEO: {this.state.data.CEO}</h2>
            <div className='symbol-exchange'>
              <h2>Stock Symbol: {this.state.data.symbol}</h2>
              <h2>Exchange: {this.state.data.exchange}</h2>
            </div>
            <h2>Industry: {this.state.data.industry}</h2>
            <h2>Sector: {this.state.data.sector}</h2>
          </div>
          <div className='logo'>
            <a href={this.state.data.website} target='_blank' rel="noopener noreferrer"><img className='img-logo' src={this.state.logo} alt={this.state.companyName} /></a>
          </div>
          <div>
            <Maps address={this.state.data.address} city={this.state.data.city} state={this.state.data.state} zip={this.state.data.zip} />
          </div>
        </div>
        <div className='description'>
          <h1>Description:</h1>
          <p>{this.state.data.description}</p>
        </div>
      </div>
    );
  }
}


export default CorporateData;

// symbol: "AAPL"
// companyName: "Apple, Inc."
// exchange: "NASDAQ"
// industry: "Telecommunications Equipment"
// website: "http://www.apple.com"
// description: "Apple, Inc. engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak on April 1, 1976 and is headquartered in Cupertino, CA."
// CEO: "Timothy Donald Cook"
// securityName: "Apple Inc."
// issueType: "cs"
// sector: "Electronic Technology"
// primarySicCode: 3663
// employees: 137000
// tags: (2) ["Electronic Technology", "Telecommunications Equipment"]
// address: "One Apple Park Way"
// address2: null
// state: "CA"
// city: "Cupertino"
// zip: "95014-2083"
// country: "US"
// phone: "1.408.996.1010"