import React, { useEffect, useState } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../Components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../Components/Loading';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
        navigate('/');
    }
    else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
    if(!pics) {
        return setPicMessage('Please select an Image');
    }
    setPicMessage(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'Note-Taker');
        data.append('cloud_name', 'ddyks52ua');
        fetch('https://api.cloudinary.com/v1_1/ddyks52ua/image/upload', {
            method: 'post',
            body: data,
        }).then((res) => res.json())
          .then((data) => {
            console.log(data);
            setPic(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
    }
    else {
        return setPicMessage('Please select an JPEG or PNG image');
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if(password === confirmPassword) {
        dispatch(updateProfile({ name, email, password, pic }))
    }
  }

  return (
    <MainScreen title='EDIT PROFILE'>
      <div>
        <Row className='profileContainer'>
            <Col md={6}>
                <Form onSubmit={submitHandler}>
                    {loading && <Loading />}
                    {success && <ErrorMessage variant='success'>Updated Successfully</ErrorMessage>}
                    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    {" "}

                    {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}
                    <Form.Group controlId='pic'>
                        <Form.Label>Change Profile Picture</Form.Label>
                        <Form.File onChange={(e) => postDetails(e.target.files[0])} id='custom-file' type='image/png' label='Upload Profile Picture' custom />
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={pic} alt={name} className='profilePic' />
            </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default ProfileScreen
