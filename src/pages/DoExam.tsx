import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Alert, ProgressBar } from 'react-bootstrap';

interface Question {
  id: number;
  text: string;
  type: 'تستی' | 'تشریحی';
  options?: string[];
  allowFile?: boolean;
}

const mockExamData: { [key: string]: { title: string; duration: number; questions: Question[] } } = {
    '1': {
      title: 'آزمون ریاضی پایه ۱۰',
      duration: 20,
      questions: [
        { id: 1, text: '۶ × ۳ = ?', type: 'تستی', options: ['۱۸', '۹', '۲۱'] },
        { id: 2, text: 'چرا تابع درجه دوم سهمی است؟', type: 'تشریحی', allowFile: true },
      ],
    },
    '2': {
      title: 'آزمون ترکیبی فیزیک',
      duration: 30,
      questions: [
        { id: 1, text: 'سرعت نور چقدر است؟', type: 'تستی', options: ['۳۰۰۰۰۰', '۱۵۰۰۰۰'] },
        { id: 2, text: 'قانون دوم نیوتن را توضیح دهید.', type: 'تشریحی' },
      ],
    },
};

const DoExam: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = mockExamData[id || '1'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [files, setFiles] = useState<{ [id: number]: File | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);

  const currentQ = exam.questions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTextChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (id: number, file: File | null) => {
    setFiles(prev => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log('📝 Answers:', answers);
    console.log('📎 Files:', files);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = Math.round(((currentIndex + 1) / exam.questions.length) * 100);

  return (
    <div className="container" style={{ direction: 'rtl', maxWidth: 800, padding: '2rem 1rem' }}>
      <h3 className="text-center mb-4">{exam.title}</h3>

      <div className="d-flex justify-content-between mb-2">
        <span>سؤال {currentIndex + 1} از {exam.questions.length}</span>
        <span>زمان باقی‌مانده: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</span>
      </div>
      <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

      {!submitted ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label><strong>{currentQ.text}</strong></Form.Label>
            {currentQ.type === 'تستی' && (
              currentQ.options?.map(opt => (
                <Form.Check
                  key={opt}
                  type="radio"
                  label={opt}
                  name={`q-${currentQ.id}`}
                  checked={answers[currentQ.id] === opt}
                  onChange={() => handleTextChange(currentQ.id, opt)}
                  className="mb-2"
                />
              ))
            )}
            {currentQ.type === 'تشریحی' && (
              <>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="پاسخ خود را بنویسید..."
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                  className="mb-2"
                />
                {currentQ.allowFile && (
                  <>
                    <Form.Label>فایل پاسخ (اختیاری):</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => {
                        const input = e.target as HTMLInputElement;
                        handleFileChange(currentQ.id, input.files?.[0] || null);
                      }}
                    />
                    {files[currentQ.id] && (
                      <div className="mt-2 text-muted">فایل انتخاب‌شده: {files[currentQ.id]?.name}</div>
                    )}
                  </>
                )}
              </>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
            >
              ← قبلی
            </Button>
            {currentIndex < exam.questions.length - 1 ? (
              <Button onClick={() => setCurrentIndex(prev => prev + 1)}>بعدی →</Button>
            ) : (
              <Button variant="success" onClick={handleSubmit}>
                اتمام آزمون
              </Button>
            )}
          </div>
        </>
      ) : (
        <Alert variant="success" className="mt-4 text-center">
          پاسخ‌های شما با موفقیت ثبت شد ✅
        </Alert>
      )}
    </div>
  );
};

export default DoExam;
