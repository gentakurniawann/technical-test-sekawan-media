import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import {
  Card,
  Modal,
  Form,
  Table,
  Button,
  Pagination,
  Dropdown,
} from "react-bootstrap";
import { BiSortDown } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import "./style.scss";
export default class Tickets extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      darkTheme: false,
      dataTicket: [],
      activePage: 1,
      per_page: 10,
      total: 0,
      total_pages: 0,
      ticketName: "",
      status: "",
      priority: "",
      accepted: false,
      isModalOpen: false,
      action: "",
      isChecked: false,
      role: localStorage.getItem("role"),
    };
    if (localStorage.getItem("token")) {
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

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => this.getTicket(pageNumber));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      id: "",
      ticketName: "",
      status: "open",
      priority: "",
      accepted: false,
      action: "insert",
    });
  };

  handleEdit = (selectedItem) => {
    this.setState({
      isModalOpen: true,
      id: selectedItem.id,
      ticketName: selectedItem.ticket_name,
      status: selectedItem.status,
      priority: selectedItem.priority,
      accepted: selectedItem.accepted,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    let data = {
      ticketName: this.state.ticketName,
      status: this.state.status,
      priority: this.state.priority,
      accepted: this.state.accepted,
    };

    let url = "";

    if (this.state.action === "insert") {
      url = "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket";

      axios
        .post(url, data)
        .then((res) => {
          this.getTicket();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else if (this.state.action === "update") {
      url =
        "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket/" +
        this.state.id;
      axios
        .put(url, data)
        .then((res) => {
          this.getTicket();
          this.handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  getTicket = () => {
    let url = new URL(
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket"
    );
    url.searchParams.append("page", this.state.activePage);
    url.searchParams.append("limit", this.state.per_page);
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

  getTicketAll = () => {
    let url = new URL(
      "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket"
    );
    axios
      .get(url)
      .then((res) => {
        this.setState({
          total: res.data.length,
          total_pages: Math.floor(res.data.length / 10),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getTicketSortBy = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    if (this.state.isChecked === true) {
      let url = new URL(
        "https://6514021d8e505cebc2ea861a.mockapi.io/api/v1/ticket"
      );
      url.searchParams.append("sortBy", "date");
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
    } 
  };
  componentDidMount() {
    this.getTicket();
    this.getTicketAll();
  }
  render() {
    const { ticketName, status, priority, action, accepted, role, isChecked } =
      this.state;
    console.log(this.state.isChecked);
    return (
      <div
        className={
          localStorage.getItem("darkTheme") !== null
            ? "tickets d-flex darkTheme"
            : "tickets d-flex"
        }
      >
        <Sidebar />
        <div className="content">
          <Header
            title={"Tickets"}
            handleDarkTheme={this.handleDarkTheme}
            darkTheme={localStorage.getItem("darkTheme")}
          />
          <Card className="mx-3 my-3 p-3">
            <div className="d-flex align-items center justify-content-between mb-4">
              <h3 className="mb-0">All tickets</h3>
              <div className="d-flex gap-4">
                <Dropdown className="d-flex sort gap-2 align-items-center">
                  <BiSortDown className="icons" />
                  <p className="mb-0">Sort</p>
                  <Dropdown.Toggle split id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Form className="px-2">
                      <Form.Check
                        type="checkbox"
                        id="custom-switch"
                        label="Check this switch"
                        checked={isChecked}
                        onChange={this.getTicketSortBy}
                      />
                    </Form>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="d-flex filter gap-2 align-items-center">
                  <FaFilter className="icons" />
                  <p className="mb-0">Filter</p>
                </div>
                {role === "guest" && (
                  <Button onClick={() => this.handleAdd()}>New Ticket</Button>
                )}
              </div>
            </div>
            <Table className="dataTable">
              <thead>
                <tr>
                  <th>Ticket details</th>
                  <th>Customer name</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.dataTicket.map((item, index) => {
                  const dateObject = new Date(item.createdAt);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const formattedDate = dateObject.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.avatar} alt={item.avatar} />
                        {item.ticket_name}
                      </td>
                      <td>{item.customer_name}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <p className={`priority-${item.priority} text-center`}>
                          {item.priority}
                        </p>
                      </td>
                      <td>
                        <div
                          className="text-center detail"
                          onClick={() => this.handleEdit(item)}
                        >
                          <CiMenuKebab />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Pagination size="sm" className="d-flex justify-content-end">
              {this.state.activePage > 1 && (
                <Pagination.Prev
                  onClick={() =>
                    this.handlePageChange(this.state.activePage - 1)
                  }
                />
              )}
              {Array.from({ length: this.state.total_pages }).map(
                (_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === this.state.activePage}
                    onClick={() => this.handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                )
              )}
              {this.state.activePage < this.state.total_Pages && (
                <Pagination.Next
                  onClick={() =>
                    this.handlePageChange(this.state.activePage + 1)
                  }
                />
              )}
            </Pagination>
          </Card>
        </div>
        <Modal
          classname="modal"
          show={this.state.isModalOpen}
          onHide={this.handleClose}
        >
          <Modal.Header classname="modal-header" closeButton>
            {action === "insert" ? (
              <Modal.Title className="modalTitle">
                Input Data Tickets
              </Modal.Title>
            ) : (
              <Modal.Title className="modalTitle">
                Edit Data Tickets
              </Modal.Title>
            )}
          </Modal.Header>
          <Form onSubmit={(e) => this.handleSave(e)}>
            <Modal.Body className="modal-body">
              <Form.Group controlId="ticket_name" className="mb-2">
                <Form.Label>Ticket detail</Form.Label>
                <Form.Control
                  type="text"
                  name="ticketName"
                  placeholder="Ticket details"
                  value={ticketName}
                  onChange={role === "guest" ? this.handleChange : ""}
                />
              </Form.Group>
              <Form.Group controlId="status" className="mb-2">
                <Form.Label>Status</Form.Label>
                {role === "admin" && (
                  <Form.Control
                    type="text"
                    name="priority"
                    placeholder="Priority"
                    value={status}
                  />
                )}
                {role === "guest" && (
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="status"
                    onChange={this.handleChange}
                    required
                  >
                    <option selected={true}>Select Status</option>
                    <option value={"unresolved"}>Unresolved</option>
                    <option value={"overdue"}>Overdue</option>
                    <option value={"open"}>Open</option>
                    <option value={"onhold"}>On hold</option>
                  </Form.Select>
                )}
              </Form.Group>
              <Form.Group controlId="priority" className="mb-2">
                <Form.Label>Priority</Form.Label>
                {role === "admin" && (
                  <Form.Control
                    type="text"
                    name="priority"
                    placeholder="Priority"
                    value={priority}
                  />
                )}
                {role === "guest" && (
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="priority"
                    onChange={this.handleChange}
                    required
                  >
                    <option selected={true}>Select Priority</option>
                    <option value={"high"}>High</option>
                    <option value={"normal"}>Normal</option>
                    <option value={"low"}>Low</option>
                  </Form.Select>
                )}
              </Form.Group>
              {role === "admin" && (
                <Form.Group controlId="accepted" className="mb-2">
                  <Form.Label></Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    name="accepted"
                    onChange={this.handleChange}
                    required
                  >
                    <option value={true} selected={accepted === true}>
                      Approve
                    </option>
                    <option value={false} selected={accepted === false}>
                      Reject
                    </option>
                  </Form.Select>
                </Form.Group>
              )}
            </Modal.Body>
            <Modal.Footer classname="modal-footer">
              <Button size="lg" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
