import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Chart from "../../components/Chart";
import "./style.scss";
export default class Overview extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      darkTheme: false,
      dataTicket: [],
      dataTicketUnresolved: [],
      totalUnresolved: 0,
      totalOverdue: 0,
      totalOpen: 0,
      totalOnHold: 0,
      role: localStorage.getItem("role")
    };
    if (localStorage.getItem("token") && this.state.role === "admin") {
      this.state.token = localStorage.getItem("token");
    } else {
      window.location = "/";
    }
  }
  handleDarkTheme = () => {
    this.setState((prevState) => ({
      darkTheme: !prevState.darkTheme,
    }));
    if (this.state.darkTheme === false) {
      localStorage.setItem("darkTheme", true);
    } else {
      localStorage.removeItem("darkTheme", true);
    }
  };
  getTicket = () => {
    let url = "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          dataTicket: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getTicketUnresolved = () => {
    let url =
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket?status=unresolved";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          dataTicketUnresolved: res.data,
          totalUnresolved: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getTicketOverdue = () => {
    let url =
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket?status=Overdue";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          totalOverdue: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getTicketOpen = () => {
    let url =
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket?status=Open";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          totalOpen: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  getTicketOnHold = () => {
    let url =
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket?status=onhold";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          totalOnHold: res.data.length,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  componentDidMount() {
    this.getTicket();
    this.getTicketUnresolved();
    this.getTicketOverdue();
    this.getTicketOpen();
    this.getTicketOnHold();
  }
  render() {
    const {
      totalUnresolved,
      totalOverdue,
      totalOpen,
      totalOnHold,
      dataTicketUnresolved,
      dataTicket,
    } = this.state;
    console.log(dataTicket);
    return (
      <div
        className={
          localStorage.getItem("darkTheme") !== null ? "overview d-flex darkTheme" : "overview d-flex"
        }
      >
        <Sidebar></Sidebar>
        <div className="content">
          <Header title={"Overview"} handleDarkTheme={this.handleDarkTheme} darkTheme={localStorage.getItem("darkTheme")}/>
          <Row className="mx-2 row-gap-3 my-3 row-total">
            <Col sm={6} md={6} lg={3} xl={3}>
              <Card className="p-3">
                <h3 className="mb-3 text-center">Unresolved</h3>
                <h1 className="text-center mb-0">{totalUnresolved}</h1>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} xl={3}>
              <Card className="p-3">
                <h3 className="mb-3 text-center">Overdue</h3>
                <h1 className="text-center mb-0">{totalOverdue}</h1>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} xl={3}>
              <Card className="p-3">
                <h3 className="mb-3 text-center">Open</h3>
                <h1 className="text-center mb-0">{totalOpen}</h1>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3} xl={3}>
              <Card className="p-3">
                <h3 className="mb-3 text-center">On Hold</h3>
                <h1 className="text-center mb-0">{totalOnHold}</h1>
              </Card>
            </Col>
          </Row>
          <Card className="mx-3 p-3 card-chart mb-3">
            <h3>One Year Chart</h3>
            <Chart data={dataTicket} />
          </Card>
          <Row className="mx-2 row-gap-3 mb-4">
            <Col sm={12} md={12} lg={6} xl={6}>
              <Card className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h3 className="mb-0">Unresolved Tickets</h3>
                  <Link to={"/tickets"}>View Detail</Link>
                </div>
                <p className="mb-2 group">Group: <span>Support</span></p>
                {dataTicketUnresolved.map((item, index) => {
                  return (
                    <div
                      className="unresolved-list"
                      key={`unresolved-${index}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="py-3 mb-0 ticket-name">
                          {item.ticket_name}
                        </p>
                        <p className="mb-0 customer-name">{item.customer_name}</p>
                      </div>
                      <div className="divider" />
                    </div>
                  );
                })}
              </Card>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
              <Card className="p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h3 className="mb-0">Task</h3>
                  <Link to={"/tickets"}>View All</Link>
                </div>
                <p className="mb-2 today">Today</p>
                <div className="create-new-task">
                  <div className="d-flex align-items-center justify-content-between py-3">
                    <p className="mb-0 ">Create new task</p>
                    <Button size="sm" variant="secondary">+</Button>
                  </div>
                  <div className="divider" />
                </div>
                {dataTicket.slice(0, 3).map((item, index) => {
                  return (
                    <div
                      className="task-list"
                      key={`unresolved-${index}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="py-3 mb-0 ticket-name">
                          {item.ticket_name}
                        </p>
                        <p className={`mb-0 priority-${item.priority}`}>{item.priority}</p>
                      </div>
                      <div className="divider" />
                    </div>
                  );
                })}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
