import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "reactstrap";
import "../App.css";

import { getName, getBalance } from "../redux/actions/user_actions";
import NavBar from "../components/Navbar";
import BackButton from "../components/BackButton";

class NewLoan extends Component {
  state = {
    amount: "",
    description: "",
  };

  async componentDidMount() {
    if (!this.props.contractAddress) {
      this.props.history.push({ pathname: "Login" });
    } else {
      this.props.getName(this.props.contractAddress);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="screens">
          <BackButton
            onClick={() => this.props.history.push({ pathname: "Loans" })}
            text="BORROW"
          />
          <div className="Welcome">Repay Loan</div>
          <div style={{ textAlign: "left", marginLeft: "10%" }}>
            Take out a new loan
          </div>

          <div style={{ textAlign: "left", margin: "4vh 10% 2vh 10%" }}>
            How much would you like to take out?
          </div>
          <Input
            type="number"
            style={{
              backgroundColor: "#ECF3FF",
              color: "black",
              borderRadius: "10px",
              border: "white",
              fontSize: "12px",
              width: "80vw",
              margin: "2vh 10% 0 10%",
            }}
            onChange={(event) => this.setState({ amount: event.target.value })}
          />

          <div style={{ textAlign: "left", margin: "4vh 10% 2vh 10%" }}>
            Description
          </div>
          <Input
            type="text"
            style={{
              backgroundColor: "#ECF3FF",
              color: "black",
              borderRadius: "10px",
              border: "white",
              fontSize: "12px",
              width: "80vw",
              margin: "2vh 10% 0 10%",
            }}
            onChange={(event) =>
              this.setState({ description: event.target.value })
            }
          />

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
                this.props.history.push({
                  pathname: "LoanDetail",
                })
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
                this.props.history.push({
                  pathname: "/ConfirmNewLoan",
                  state: {
                    ...this.state,
                  },
                })
              }
            >
              Preview Loan
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
})(NewLoan);
