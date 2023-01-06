import React, { useState } from "react";
import { Checkbox, Button, Modal, Form, Input, Select, Space, Table } from "antd";

import { ToggleTodo, AddTodo, DeleteTodo, UpdateTodo } from "../redux/actions/action";

// UseSelector
import { useSelector, useDispatch } from "react-redux";
//Css
import "../App.css";

export default function ViewTodo() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const toggle = (id) => {
    console.log(id.id);
    dispatch(ToggleTodo(id.id));
  };

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const [updatedData, setUpdatedData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = (id) => {
    setId(id.id)
    console.log(todos.find((todo) => todo.id === id.id))
    setUpdatedData(todos.find((todo) => todo.id === id.id));
    setIsModalOpen1(true);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const addTodo = () => {
        dispatch(
            AddTodo({
              id: todos.length + 1,
              text: title,
              completed: status,
            })
          );
          handleCancel();
  };

  const columns = [
    {
        render: (id) => (
            <Checkbox onChange={() => toggle(id)} />
        ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      key: 'text',
      render: (id) => (
        <>
            <a style={{ textDecoration: id.completed ? 'line-through' : '' }}>{id.text}</a>
        </>
    ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (id) => (
        <Space size="middle">
          <button onClick={() => showModal1(id)} className="btn btn-success">Update</button>
          <button onClick={() => deleteTodo(id)} className="btn btn-danger">Delete</button>
        </Space>
      ),
    },
  ];

  const deleteTodo = (id) => {
    dispatch(DeleteTodo(id.id))
    }

    const updateTodo = (id) => {
        dispatch(
            UpdateTodo({
                id: id,
                text: title,
                completed: status,
            })
        );
        handleCancel1();
    }
  return (
    <div className="">
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="Title" required tooltip="This is a required field">
            <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Status" required tooltip="This is a required field">
            <Select
              defaultValue="Completed"
              style={{
                width: '100%',
              }}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                {
                  value: true,
                  label: "Completed",
                },
                {
                  value: false,
                  label: "InComplete",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={addTodo} type="primary">Add</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Basic Modal"
        open={isModalOpen1}
        onCancel={handleCancel1}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="Title" required tooltip="This is a required field">
            <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} defaultValue = {updatedData.text} />
          </Form.Item>
          <Form.Item label="Status" required tooltip="This is a required field">
            <Select
              defaultValue="Completed"
              style={{
                width: '100%',
              }}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                {
                  value: true,
                  label: "Completed",
                },
                {
                  value: false,
                  label: "InComplete",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => updateTodo(id)} type="primary">Update</Button>
          </Form.Item>
        </Form>
      </Modal>
      <h1 className="text-center mt-3 mb-3">Todo List</h1>
      <div>
        <button className="btn btn-primary float-right m-3" onClick={showModal}>
          Add Todo
        </button>
      </div>
      <Table columns={columns} dataSource={todos} />
    </div>
  );
}
