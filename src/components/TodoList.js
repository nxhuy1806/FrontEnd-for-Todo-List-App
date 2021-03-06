import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  IconButton,
  TextField,
  ButtonGroup,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  ListItemIcon
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialog from './Dialog';
import {useSelector} from 'react-redux';

function Item(props) {
  const {id, name, handleDelete, handleUpdate} = props;
  const [inpText, setInpText] = useState(name);
  const [editMode, setEditMode] = useState(false);
  const setting = useSelector(state => state.setting.value);
  let navigate = useNavigate();

  function handleEdit(id, name) {
    if (!editMode) setEditMode(true);
    else {
      setEditMode(false);
      handleUpdate(id, name);
    }
  }

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <ButtonGroup>
          <IconButton
            edge="end"
            color={setting.color}
            onClick={() => handleEdit(id, inpText)}
          >
            {editMode ? <SaveIcon /> : <EditIcon />}
          </IconButton>
          <AlertDialog
            {...{handleDelete, id, icon: <DeleteIcon color={setting.color} />}}
          />
        </ButtonGroup>
      }
    >
      <ListItemButton
        onClick={e => {
          if (e.target.tagName !== 'INPUT')
            navigate(`/todos/${id}`, {replace: true});
        }}
      >
        <ListItemIcon>
          <TaskIcon color={setting.color} />
        </ListItemIcon>
        <ListItemText
          primary={
            editMode ? (
              <TextField
                label="Enter new todo list name"
                variant="outlined"
                type="text"
                value={inpText}
                onChange={e => setInpText(e.target.value)}
                size="small"
              />
            ) : (
              name
            )
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
export default function TodoList(props) {
  const {todos, handleDelete, handleUpdate} = props;
  return (
    <List>
      {todos.map(todo => (
        <Item key={todo.id} {...{handleDelete, handleUpdate, ...todo}} />
      ))}
    </List>
  );
}
