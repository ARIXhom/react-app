import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ExamMeta {
  id: number;
  title: string;
  subjects: string[];
  type: 'تستی' | 'تشریحی' | 'هردو';
  duration: number;
  createdBy: 'AI' | 'استاد';
}

const mockExams: ExamMeta[] = [
  {
    id: 1,
    title: 'آزمون ریاضی پایه ۱۰',
    subjects: ['ریاضی'],
    type: 'تستی',
    duration: 20,
    createdBy: 'AI',
  },
  {
    id: 2,
    title: 'آزمون ترکیبی فیزیک',
    subjects: ['فیزیک', 'ریاضی'],
    type: 'هردو',
    duration: 30,
    createdBy: 'استاد',
  },
  {
    id: 3,
    title: 'آزمون شیمی تشریحی',
    subjects: ['شیمی'],
    type: 'تشریحی',
    duration: 25,
    createdBy: 'AI',
  },
];

const TakeExam: React.FC = () => {
  const navigate = useNavigate();

  const handleStartExam = (examId: number) => {
    // Later this would include exam ID as param
    navigate(`/do-exam/${examId}`);
  };

  return (
    <div className="container" style={{ direction: 'rtl', padding: '2rem 1rem' }}>
      <h3 className="text-center mb-4">آزمون‌های در دسترس</h3>

      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>عنوان آزمون</th>
            <th>موضوعات</th>
            <th>نوع سؤال</th>
            <th>مدت زمان (دقیقه)</th>
            <th>ساخته شده توسط</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {mockExams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.title}</td>
              <td>{exam.subjects.join(', ')}</td>
              <td>{exam.type}</td>
              <td>{exam.duration}</td>
              <td>{exam.createdBy}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleStartExam(exam.id)}>
                  شروع آزمون
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TakeExam;
