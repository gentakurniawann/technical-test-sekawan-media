import React from "react";
import { Table } from "react-bootstrap";
import { CiMenuKebab } from "react-icons/ci";
import "./style.scss";
export default function DataTable(props) {
  return (
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
        {props.data.map((item, index) => {
          const dateObject = new Date(item.createdAt);
          const options = { year: "numeric", month: "long", day: "numeric" };
          const formattedDate = dateObject.toLocaleDateString("en-US", options);
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
                <div className="text-center detail">
                  <CiMenuKebab/>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
