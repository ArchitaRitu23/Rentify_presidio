import { Button, Input, Space, Typography, message } from "antd";
import config from "../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    no_of_bedrooms: "",
    no_of_bathrooms: "",
    house_no: "",
    street_no_name: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [landmarks, setLandmarks] = useState([]);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${config.apiHost}/seller-auth`, {
          withCredentials: true,
        });
        setShowPage(true);
      } catch (error) {
        navigate("/login");
      }
    })();
  }, []);

  const addProperty = async () => {
    try {
      await axios.post(
        `${config.apiHost}/property`,
        { ...formData, landmarks },
        {
          withCredentials: true,
        }
      );

      //   console.log(res.data);
      return message.success("Property added");
    } catch (error) {
      console.log(error);
      return message.error(error.response.data.error.message);
    }
  };

  const addLandmark = () => {
    console.log("adding");
    setLandmarks([
      ...landmarks,
      {
        id: nanoid(),
        name: "",
        category: "",
      },
    ]);
  };

  if (!showPage) {
    return null;
  }

  return (
    <main>
      <Typography.Title level={3}>Add Property</Typography.Title>
      <Space direction="vertical">
        <Input
          placeholder="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          placeholder="No of bedrooms"
          type="number"
          value={formData.no_of_bedrooms}
          onChange={(e) =>
            setFormData({ ...formData, no_of_bedrooms: e.target.value })
          }
        />
        <Input
          placeholder="No of bathrooms"
          type="number"
          value={formData.no_of_bathrooms}
          onChange={(e) =>
            setFormData({ ...formData, no_of_bathrooms: e.target.value })
          }
        />
        <Typography.Text>Address</Typography.Text>
        <Input
          placeholder="House No"
          type="text"
          value={formData.house_no}
          onChange={(e) =>
            setFormData({ ...formData, house_no: e.target.value })
          }
        />
        <Input
          placeholder="Street name and number"
          type="text"
          value={formData.street_no_name}
          onChange={(e) =>
            setFormData({ ...formData, street_no_name: e.target.value })
          }
        />
        <Input
          placeholder="City"
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <Input
          placeholder="State"
          type="text"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
        <Input
          placeholder="Pincode"
          type="text"
          value={formData.pincode}
          onChange={(e) =>
            setFormData({ ...formData, pincode: e.target.value })
          }
        />
        <Typography.Text>Landmarks</Typography.Text>
        <Button type="primary" onClick={addLandmark}>
          Add landmark
        </Button>
        {/* {landmarks.map((l, i) => {
          <div key={i}>
            <Input
              placeholder="Eg. Express Avenue"
              type="text"
              value={l.name}
              onChange={(e) => {
                let tempLandmarks = landmarks;

                for (let j = 0; j < tempLandmarks.length; j++) {
                  if (tempLandmarks[j].id == l.id)
                    tempLandmarks[j] = {
                      ...tempLandmarks[j],
                      name: e.target.value,
                    };
                }

                setLandmarks([...tempLandmarks]);
              }}
            />
            <Input
              placeholder="Eg. Mall"
              type="text"
              value={l.name}
              onChange={(e) => {
                let tempLandmarks = landmarks;

                for (let j = 0; j < tempLandmarks.length; j++) {
                  if (tempLandmarks[j].id == l.id)
                    tempLandmarks[j] = {
                      ...tempLandmarks[j],
                      category: e.target.value,
                    };
                }

                setLandmarks([...tempLandmarks]);
              }}
            />
          </div>;
        })} */}
        {landmarks.map((l, i) => (
          <div key={i}>
            <Space>
              <Typography.Text>{i + 1 + ". "}</Typography.Text>
              <div>
                <Input
                  placeholder="Eg. Express Avenue"
                  type="text"
                  value={l.name}
                  onChange={(e) => {
                    let tempLandmarks = landmarks;

                    for (let j = 0; j < tempLandmarks.length; j++) {
                      if (tempLandmarks[j].id == l.id)
                        tempLandmarks[j] = {
                          ...tempLandmarks[j],
                          name: e.target.value,
                        };
                    }

                    setLandmarks([...tempLandmarks]);
                  }}
                />
                <Input
                  placeholder="Eg. Mall"
                  type="text"
                  value={l.category}
                  onChange={(e) => {
                    let tempLandmarks = landmarks;

                    for (let j = 0; j < tempLandmarks.length; j++) {
                      if (tempLandmarks[j].id == l.id)
                        tempLandmarks[j] = {
                          ...tempLandmarks[j],
                          category: e.target.value,
                        };
                    }

                    setLandmarks([...tempLandmarks]);
                  }}
                />
              </div>
              <Button
                onClick={() =>
                  setLandmarks([
                    ...landmarks.filter((landmark) => landmark.id != l.id),
                  ])
                }
                danger
              >
                -
              </Button>
            </Space>
          </div>
        ))}
        <Button type="primary" onClick={addProperty}>
          Add property
        </Button>
      </Space>
    </main>
  );
};

export default AddProperty;
