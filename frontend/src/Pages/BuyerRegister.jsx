import { Button, Input, Space, Typography, message } from "antd";
import config from "../config";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });

  const register = async () => {
    const { email, phone, firstname, lastname, password, confirmPassword } =
      formData;

    if (password != confirmPassword)
      return message.warning("Passwords did not match");

    try {
      await axios.post(`${config.apiHost}/user/register`, {
        email,
        phone,
        firstname,
        lastname,
        password,
      });

      //   console.log(res.data);
      return navigate("/login");
    } catch (error) {
      return message.error(error.response.data.error.message);
    }
  };

  return (
    <main>
      <Typography.Title level={3}>Buyer Register</Typography.Title>
      <Space direction="vertical">
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Phone Number"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          placeholder="Firstname"
          type="text"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />
        <Input
          placeholder="Lastname"
          type="text"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />
        <Input
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <Button type="primary" onClick={register}>
          Register
        </Button>
      </Space>
    </main>
  );
};

export default BuyerRegister;
