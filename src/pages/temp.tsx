import React, { useState } from 'react';
import { Button, Form, Modal, Table, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Topic {
  id: number;
  title: string;
  description: string;
  questionCount: number;
}

const TopicsManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, title: 'ریاضیات پایه', description: 'مباحث پایه ای ریاضی', questionCount: 45 },
    { id: 2, title: 'فیزیک مدرن', description: 'مباحث جدید فیزیک', questionCount: 32 },
  ]);
  const [newTopic, setNewTopic] = useState({ title: '', description: '' });
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTopic = () => {
    if (newTopic.title.trim()) {
      setTopics(prev => [
        ...prev,
        {
          id: prev.length + 1,
          ...newTopic,
          questionCount: 0
        }
      ]);
      setNewTopic({ title: '', description: '' });
      setShowModal(false);
    }
  };

  const handleDelete = (id: number) => {
    setTopics(prev => prev.filter(topic => topic.id !== id));
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setNewTopic({ title: topic.title, description: topic.description });
    setShowModal(true);
  };

  const handleUpdateTopic = () => {
    if (editingTopic && newTopic.title.trim()) {
      setTopics(prev =>
        prev.map(topic =>
          topic.id === editingTopic.id
            ? { ...topic, ...newTopic }
            : topic
        )
      );
      setEditingTopic(null);
      setNewTopic({ title: '', description: '' });
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-4" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">مدیریت موضوعات</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          ایجاد موضوع جدید
        </Button>
      </div>

      <div className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="جستجو در موضوعات..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <Table striped bordered hover responsive className="text-center">
        <thead className="table-primary">
          <tr>
            <th>عنوان موضوع</th>
            <th>تعداد سوالات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filteredTopics.map(topic => (
            <tr key={topic.id}>
              <td>{topic.title}</td>
              <td>{topic.questionCount}</td>
              <td>
                <Button
                  variant="outline-warning"
                  className="me-2"
                  onClick={() => handleEdit(topic)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(topic.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} dir="rtl">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTopic ? 'ویرایش موضوع' : 'موضوع جدید'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>عنوان موضوع</Form.Label>
              <Form.Control
                type="text"
                value={newTopic.title}
                onChange={e => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>توضیحات</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTopic.description}
                onChange={e => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            انصراف
          </Button>
          <Button 
            variant="primary" 
            onClick={editingTopic ? handleUpdateTopic : handleCreateTopic}
          >
            {editingTopic ? 'ذخیره تغییرات' : 'ایجاد موضوع'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopicsManagement;