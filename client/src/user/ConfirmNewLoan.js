import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
import "../App.css";

import { getName, getBalance } from "../redux/actions/user_actions";
import NavBar from "../components/Navbar";
import BackButton from "../components/BackButton";
import EventIcon from "@material-ui/icons/Event";

class ConfirmNewLoan extends Component {
  state = {
    amount: "",
  };

  async componentDidMount() {
    // const receivedProps = this.props.location.state;

    if (!this.props.contractAddress) {
      this.props.history.push({ pathname: "Login" });
    } else {
      this.props.getName(this.props.contractAddress);
    }
  }

  render() {
    console.log(this.state.amount);
    console.log(this.props.location.state);
    const data = [
      { title: "Loan", data: "New House" },
      { title: "Due Date", data: "12/18/2022" },
      { title: "Amount Owed", data: "45.00 DAI" },
    ];

    return (
      <div className="App">
        <div className="screens">
          <BackButton
            onClick={() => this.props.history.push({ pathname: "Loans" })}
            text="BORROW"
          />
          <div className="Welcome">Confirm Loan Details</div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#ECF3FF",
              borderRadius: "4vw",
              margin: "4vh 10% 0 10%",
              padding: "3vw 3vw 3vw 10vw",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold" }}> You are borrowing</div>
            <h3>{this.props.location.state.amount} DAI </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                margin: "2vw 0 2vw 0",
              }}
            >
              <EventIcon fontSize="large" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  textAlign: "left",
                  marginLeft: "3vw",
                }}
              >
                <div style={{ fontWeight: "bold" }}> Interest Rate</div>
                4.0%
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                margin: "2vw 0 2vw 0",
              }}
            >
              <EventIcon fontSize="large" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  textAlign: "left",
                  marginLeft: "3vw",
                }}
              >
                <div style={{ fontWeight: "bold" }}> Due Date</div>
                Forever
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "4vh 10% 0 10%",
            }}
          >
            <Button
              style={{
                backgroundColor: "white",
                fontWeight: "bold",
                color: "#146EFF",
                borderRadius: "10px",
                borderWidth: "3px",
                borderColor: "#146EFF",
                width: "35vw",
              }}
              onClick={() =>
                this.props.history.push({ pathname: "LoanDetail" })
              }
              className="LogoutButton"
            >
              Cancel
            </Button>

            <Button
              style={{
                backgroundColor: "#146EFF",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                width: "35vw",
              }}
              type="submit"
              onClick={() =>
                this.props.history.push({ pathname: "NewLoanComplete" })
              }
            >
              Repay
            </Button>
          </div>

          <NavBar active={1} history={this.props.history} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { address, contractAddress, name } = state.user;
  return {
    address,
    contractAddress,
    name,
  };
};

export default connect(mapStateToProps, {
  getName,
  getBalance,
})(ConfirmNewLoan);
