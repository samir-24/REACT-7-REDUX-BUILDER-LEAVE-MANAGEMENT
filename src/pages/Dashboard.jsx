import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLeaves } from '../features/leaveSlice';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import AddLeave from '../components/AddLeave';
import LeaveList from '../components/LeaveList';
import SearchFilter from '../components/SearchFilter';

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchLeaves()); }, [dispatch]);

  return (
    <>
      <Navbar bg="white" className="shadow-sm mb-5 py-3">
        <Container>
          <Navbar.Brand className="font-weight-bold text-primary" style={{fontSize: '1.5rem'}}>
             Smart Leave <span className="text-dark">System</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <AddLeave />
          </Col>
          <Col lg={8}>
            <div className="bg-white p-4 rounded-3 shadow-sm border">
              <SearchFilter />
              <hr className="my-4 text-muted" />
              <LeaveList />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;