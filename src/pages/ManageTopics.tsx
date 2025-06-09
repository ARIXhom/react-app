import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Topic {
  id: number;
  title: string;
  questionCount: number;
}

const ManageTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTopic, setEditTopic] = useState<Topic | null>(null);
  const [titleInput, setTitleInput] = useState('');
  const navigate = useNavigate();

  const openModal = (topic?: Topic) => {
    setEditTopic(topic || null);
    setTitleInput(topic?.title || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditTopic(null);
    setTitleInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    if (editTopic) {
      setTopics(prev =>
        prev.map(t =>
          t.id === editTopic.id ? { ...t, title: titleInput } : t
        )
      );
    } else {
      setTopics(prev => [
        ...prev,
        {
          id: Date.now(),
          title: titleInput,
          questionCount: 0,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('آیا از حذف این موضوع مطمئن هستید؟')) {
      setTopics(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="container-fluid" style={{ direction: 'rtl', minHeight: '100vh', padding: '2rem' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 text-center">مدیریت موضوعات</h2>

          <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-3">
            ← بازگشت به داشبورد
          </Button>

          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="جستجو در موضوعات..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <Button variant="success" onClick={() => openModal()}>
              + موضوع جدید
            </Button>
          </div>

          <div className="table-responsive">
            <Table responsive bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>عنوان موضوع</th>
                  <th>تعداد سؤالات</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {topics.length > 0 ? (
                  topics
                    .filter(t => t.title.includes(search))
                    .map(topic => (
                      <tr key={topic.id}>
                        <td>{topic.title}</td>
                        <td>{topic.questionCount}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="ms-2"
                            onClick={() => openModal(topic)}
                          >
                            ویرایش
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(topic.id)}
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3}>موضوعی یافت نشد.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <Modal show={showModal} onHide={closeModal} centered>
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton className="d-flex justify-content-between">
                <Modal.Title className="w-100 text-end">
                  {editTopic ? 'ویرایش موضوع' : 'ایجاد موضوع جدید'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="topicTitle">
                  <Form.Label>عنوان موضوع</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
                    required
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  انصراف
                </Button>
                <Button variant="primary" type="submit">
                  ذخیره
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageTopics;
