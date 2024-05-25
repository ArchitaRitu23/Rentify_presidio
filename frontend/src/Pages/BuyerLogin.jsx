import { Button, Input, Space, Typography, message } from "antd";
import config from "../config";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const { email, password } = formData;

    try {
      await axios.post(
        `${config.apiHost}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      //   console.log(res.data);
      return navigate("/");
    } catch (error) {
      console.log(error);
      return message.error(error.response.data.error.message);
    }
  };

  return (
    <main>
      <Typography.Title level={3}>Login</Typography.Title>
      <Space direction="vertical">
        <Input
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button type="primary" onClick={login}>
          Login
        </Button>
      </Space>
    </main>
  );
};

export default BuyerLogin;
