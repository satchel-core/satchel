import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import "../App.css";

import {
  getName,
  getBalance,
  getBorrowBalance,
  getBorrowInterestRate,
  enterMarket,
  exitMarket,
} from "../redux/actions";
import NavBar from "../components/Navbar";
import assets from "../assets.json";

class Loans extends Component {
  state = {
    activeTab: 0,
    Balance: "",
    Deposit: "",
    Withdraw: "",
    InterestRate: "",
    Contribution: "",
    RoundedContribution: "",
    School: "",
    Name: "",
    SchoolContract: "",
    SchoolName: "",
    SchoolAddress: "",
    projects: [],
    withdrawLoading: false,
    depositLoading: false,
    dropdownOpen: false,
    dropDownValue: "Select Asset",
    activeAsset: {},
  };

  async componentDidMount() {
    this.props.getBorrowInterestRate();

    if (!this.props.contractAddress) {
      this.props.history.push({ pathname: "Login" });
    } else {
      this.props.getName(this.props.contractAddress);
      this.props.getBalance(this.props.contractAddress);
      this.props.getBorrowBalance(this.props.contractAddress);
      // this.props.getInterestRate(this.props.contractAddress);
      // this.props.getContribution(this.props.contractAddress);
      // this.props.getSchoolByUser(this.props.contractAddress);
    }
  }

  render() {
    console.log("User Address: ", this.props.contractAddress);
    console.log("Interest rates");
    console.log(this.props.borrowInterestRate);
    console.log("Balances");
    console.log(this.props.borrowBalance);

    return (
      <div className="App">
        <div className="screens">
          <div className="Welcome">Experimental Loans</div>
          <div> Loans only supported for Dai at the moment... </div>
          <Button>Enter market for DAI</Button>
          <Button>Exit market for DAI</Button>
        </div>
        <NavBar active={1} history={this.props.history} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { address, contractAddress, name, balance, totalBalance } = state.user;
  const { interestRate, borrowBalance } = state.loans;

  return {
    address,
    contractAddress,
    name,
    balance,
    borrowInterestRate: interestRate,
    borrowBalance,
    totalBalance,
  };
};

export default connect(mapStateToProps, {
  getName,
  getBalance,
  getBorrowInterestRate,
  getBorrowBalance,
  enterMarket,
  exitMarket,
})(Loans);
