import { Button, List, Space, Typography, message, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../config";
import { useAppContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const { authenticated } = useAppContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${config.apiHost}/property`);
        console.log(res.data.properties);
        setProperties(res.data.properties);
      } catch (error) {
        return message.error("Something went wrong");
      }
    })();
  }, []);

  const showDetails = (user) => {
    // console.log(authenticated);
    if (!authenticated) return navigate("/login");

    setShowModal(true);
    setOwner({
      name: user.firstname,
      email: user.email,
      phone: user.phone,
    });
  };

  return (
    <main>
      <Typography.Title>Properties</Typography.Title>
      <Modal
        title="Owner details"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <Typography>
          <b>Name: </b>
          {owner.name}
        </Typography>
        <Typography>
          <b>Email: </b>
          {owner.email}
        </Typography>
        <Typography>
          <b>Phone: </b>
          {owner.phone}
        </Typography>
      </Modal>
      <List
        dataSource={properties}
        renderItem={(property) => (
          <li style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
            <Typography.Title level={3}>{property.name}</Typography.Title>
            <Space>
              <Space direction="vertical">
                <Typography.Text>
                  <Typography.Text strong>Bedrooms:</Typography.Text>{" "}
                  {property.no_of_bedrooms}
                </Typography.Text>
                <Typography.Text>
                  <Typography.Text strong>Bathrooms:</Typography.Text>{" "}
                  {property.no_of_bathrooms}
                </Typography.Text>
              </Space>
              <div style={{ border: "1px solid #ccc", borderRadius: "5px" }}>
                <Typography.Title level={5}>Address</Typography.Title>
                <Typography>
                  No. {property.Address.house_no},{" "}
                  {property.Address.street_no_name}
                </Typography>
                <Typography></Typography>
                <Typography>
                  {property.Address.city} - {property.Address.pincode},{" "}
                  {property.Address.state}
                </Typography>
              </div>
            </Space>
            <Typography.Title level={5}>Landmarks</Typography.Title>
            <ul>
              {property.landmarks.map((l, i) => (
                <li key={i}>
                  {l.name}({l.category})
                </li>
              ))}
            </ul>
            <Button type="primary" onClick={() => showDetails(property.User)}>
              View owner details
            </Button>
          </li>
        )}
      />
    </main>
  );
};

export default Home;
