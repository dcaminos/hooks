import React, { useState } from "react";

import Chart from "react-apexcharts";
import { Card, Row, Col, Dropdown, Menu } from "antd";
import { RiMoreFill, RiArrowRightSLine } from "react-icons/ri";
import { Wallet, Discount, Bag, Calendar } from "react-iconly";

export default function ExpensesCard() {
  const menu = (
    <Menu>
      <Menu.Item>Last 28 Days</Menu.Item>
      <Menu.Item>Last Month</Menu.Item>
      <Menu.Item>Last Year</Menu.Item>
    </Menu>
  );

  const [data] = useState({
    series: [1244, 2155, 1541],
    options: {
      chart: {
        id: "expenses-donut-card",
        fontFamily: "Manrope, sans-serif",
        type: "donut",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#0010F7", "#55B1F3", "#1BE7FF"],

      labels: ["Marketing", "Payments", "Bills"],

      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "90%",
            labels: {
              show: true,
              name: {
                fontSize: "2rem",
              },
              value: {
                fontSize: "24px",
                fontWeight: "medium",
                color: "#2D3436",
                formatter(val:number) {
                  return `$${val}`;
                },
              },
              total: {
                show: true,
                fontSize: "24px",
                fontWeight: "medium",
                label: "Total",
                color: "#636E72",

                formatter: function (w:any) {
                  return `$${w.globals.seriesTotals.reduce((a:number, b:number) => {
                    return a + b;
                  }, 0)}`;
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 426,
          options: {
            legend: {
              itemMargin: {
                horizontal: 16,
                vertical: 8,
              },
            },
          },
        },
      ],

      legend: {
        itemMargin: {
          horizontal: 12,
          vertical: 24,
        },
        horizontalAlign: "center",
        position: "bottom",
        fontSize: "12px",
        labels: {
          colors: "#2D3436",
        },

        markers: {
          radius: 12,
        },
      },
    },
  });

  return (
    <Card className="da-border-color-black-40 da-mb-32 da-card-6">
      <Row>
        <Col span={24}>
          <Row justify="space-between" align="top">
            <Col>
              <h5 className="da-mb-32">Expenses</h5>
            </Col>

            <Col>
              <Dropdown overlay={menu} trigger={["click"]}>
                <RiMoreFill size={24} onClick={(e) => e.preventDefault()} className="da-text-color-dark-0" />
              </Dropdown>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <div id="expenses-donut-card" className="da-donut-chart">
            <Chart
              options={data.options  as any}
              series={data.series}
              type="donut"
              height={350}
              legend="legend"
            />
          </div>
        </Col>

        <Col span={24} className="da-mt-24">
          <h5 className="da-mb-24">By Category</h5>

          <a href="#" className="da-d-block da-transition da-py-12 da-px-6 da-border-radius da-hover-bg-color-primary-4 da-hover-bg-color-dark-primary">
            <Row align="middle" justify="space-between">
              <Col flex="0.9">
                <Row align="middle">
                  <div className="remix-icon da-mr-24 da-text-color-primary-2">
                    <Wallet 
                      set="light"
                    />
                  </div>
                  <Col flex="1">
                    <h5 className="da-mb-0">Company Expenses</h5>
                    <p className="da-p1-body da-text-color-black-60 da-mb-0">
                      Employee expenses
                    </p>
                  </Col>
                </Row>
              </Col>

              <RiArrowRightSLine className="remix-icon" size={24} />
            </Row>
          </a>

          <a href="#" className="da-mt-12 da-d-block da-transition da-py-12 da-px-6 da-border-radius da-hover-bg-color-primary-4 da-hover-bg-color-dark-primary">
            <Row align="middle" justify="space-between">
              <Col flex="0.9">
                <Row align="middle">
                <div className="remix-icon da-mr-24 da-text-color-primary-2">
                  <Discount
                    set="light"
                  />
                </div>
                  <Col flex="1">
                    <h5 className="da-mb-0">Company Expenses</h5>
                    <p className="da-p1-body da-text-color-black-60 da-mb-0">
                      Promotion & Commercial
                  </p>
                  </Col>
                </Row>
              </Col>

              <RiArrowRightSLine className="remix-icon" size={24} />
            </Row>
          </a>

          <a href="#" className="da-mt-12 da-d-block da-transition da-py-12 da-px-6 da-border-radius da-hover-bg-color-primary-4 da-hover-bg-color-dark-primary">
            <Row align="middle" justify="space-between">
              <Col flex="0.9">
                <Row align="middle">
                <div className="remix-icon da-mr-24 da-text-color-primary-2">
                  <Bag
                    set="light"
                  />
                </div>
                  <Col flex="1">
                    <h5 className="da-mb-0">Shopping Expenses</h5>
                    <p className="da-p1-body da-text-color-black-60 da-mb-0">
                      Checkout last years expenses
                  </p>
                  </Col>
                </Row>
              </Col>

              <RiArrowRightSLine className="remix-icon" size={24} />
            </Row>
          </a>

          <a href="#" className="da-mt-12 da-d-block da-transition da-py-12 da-px-6 da-border-radius da-hover-bg-color-primary-4 da-hover-bg-color-dark-primary">
            <Row align="middle" justify="space-between">
              <Col flex="0.9">
                <Row align="middle">
                <div className="remix-icon da-mr-24 da-text-color-primary-2">
                  <Calendar
                    set="light"
                  />
                </div>
                  <Col flex="1">
                    <h5 className="da-mb-0">Booking Expenses</h5>
                    <p className="da-p1-body da-text-color-black-60 da-mb-0">
                      Checkout hotel expenses
                  </p>
                  </Col>
                </Row>
              </Col>

              <RiArrowRightSLine className="remix-icon" size={24} />
            </Row>
          </a>
        </Col>
      </Row>
    </Card>
  );
}
