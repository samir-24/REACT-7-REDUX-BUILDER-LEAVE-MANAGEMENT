import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLeaveAsync } from '../features/leaveSlice';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

const AddLeave = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    employeeName: '', leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '', status: 'Pending'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("'To Date' cannot be before 'From Date'!");
      return;
    }
    setError('');
    const newLeave = { ...formData, id: Date.now(), appliedDate: new Date().toLocaleDateString() };
    dispatch(addLeaveAsync(newLeave));
    alert("Leave Applied Successfully!");
    setFormData({ employeeName: '', leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '', status: 'Pending' });
  };

  return (
    <Card className="main-card p-4">
      <Card.Body>
        <h4 className="mb-4 text-primary font-weight-bold">Apply New Leave</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="small font-weight-bold text-muted">Employee Name</Form.Label>
            <Form.Control type="text" placeholder="Enter full name" value={formData.employeeName}
              onChange={e => setFormData({...formData, employeeName: e.target.value})} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="small font-weight-bold text-muted">Leave Type</Form.Label>
            <Form.Select value={formData.leaveType} onChange={e => setFormData({...formData, leaveType: e.target.value})}>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Emergency Leave</option>
              <option>Vacation Leave</option>
            </Form.Select>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="small font-weight-bold text-muted">From</Form.Label>
              <Form.Control type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} required />
            </Col>
            <Col>
              <Form.Label className="small font-weight-bold text-muted">To</Form.Label>
              <Form.Control type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} required />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="small font-weight-bold text-muted">Reason</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Reason for leave..." value={formData.reason}
              onChange={e => setFormData({...formData, reason: e.target.value})} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 shadow-sm">
            Submit Application
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddLeave;