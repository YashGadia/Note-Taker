import React, { useEffect } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';

const MyNotes = ({ search }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const noteList = useSelector(state => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector(state => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector(state => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector(state => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if(!userInfo) {
      navigate('/');
    }
  }, [dispatch, successCreate, navigate, userInfo, successUpdate, successDelete])
  

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}..`}>
      <Link to='/createnote'>
        <Button style={{marginLeft: 10, marginBottom: 6}} size='lg'>Create New Note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      { notes &&
        notes
          .filter(filteredNote => 
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map(note => {
          return <Accordion key={note._id}>
            <Card style={{margin: 10}}>
              <Card.Header style={{display: 'flex'}}>
                <span 
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    flex: 1,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    fontSize: 18
                }}>
                  <Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
                    {note.title}
                  </Accordion.Toggle>
                </span>
                <div>
                  <Link to={`/note/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)}>Delete</Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <h4>
                    <Badge variant='success'>Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {note.content}
                    </p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title='Source Title'>
                        {note.createdDate.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        })
      }
    </MainScreen>
  )
}

export default MyNotes
