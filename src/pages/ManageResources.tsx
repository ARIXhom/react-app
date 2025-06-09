import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Resource {
  id: number;
  title: string;
  type: 'link' | 'pdf' | 'word' | 'image';
  topic: string;
  date: string;
  url: string;
  description?: string;
}

const ManageResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [form, setForm] = useState({
    title: '',
    type: 'link',
    topic: '',
    url: '',
    description: ''
  });

  const navigate = useNavigate();

  const openModal = () => {
    setForm({
      title: '',
      type: 'link',
      topic: '',
      url: '',
      description: ''
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newResource: Resource = {
      id: Date.now(),
      title: form.title,
      type: form.type as Resource['type'],
      topic: form.topic,
      date: new Date().toLocaleDateString('fa-IR'),
      url: form.url,
      description: form.description
    };
    setResources(prev => [...prev, newResource]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('آیا از حذف این منبع مطمئن هستید؟')) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
  };

  const filtered = resources.filter(r =>
    (filterType ? r.type === filterType : true) &&
    (filterTopic ? r.topic.includes(filterTopic) : true)
  );

  return (
    <div className="container py-4" style={{ direction: 'rtl' }}>
      <h2 className="mb-4 text-center">مدیریت منابع</h2>

      <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-3">
        ← بازگشت به داشبورد
      </Button>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
        <div className="d-flex gap-2 w-100">
          <Form.Select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">همه انواع</option>
            <option value="link">لینک</option>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
            <option value="image">تصویر</option>
          </Form.Select>
          <Form.Control
            type="text"
            placeholder="فیلتر براساس موضوع..."
            value={filterTopic}
            onChange={e => setFilterTopic(e.target.value)}
          />
        </div>
        <Button variant="success" onClick={openModal}>
          + افزودن منبع جدید
        </Button>
      </div>

      <div className="table-responsive">
        <Table bordered hover className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>عنوان</th>
              <th>نوع</th>
              <th>موضوع</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(resource => (
                <tr key={resource.id}>
                  <td>{resource.title}</td>
                  <td>{resource.type.toUpperCase()}</td>
                  <td>{resource.topic}</td>
                  <td>{resource.date}</td>
                  <td>
                    <a href={resource.url} target="_blank" className="btn btn-sm btn-outline-info ms-1">
                      مشاهده
                    </a>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(resource.id)}>
                      حذف
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>منبعی یافت نشد.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-end">افزودن منبع</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>عنوان</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>موضوع مرتبط</Form.Label>
              <Form.Control
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>نوع منبع</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleFormChange} required>
                <option value="link">لینک</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
                <option value="image">تصویر</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>لینک یا فایل</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={form.url}
                onChange={handleFormChange}
                placeholder="آدرس لینک یا لینک فایل آپلودی"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>توضیح (اختیاری)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>انصراف</Button>
            <Button variant="primary" type="submit">ذخیره</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageResources;
