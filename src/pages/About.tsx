
import ListGroup from 'react-bootstrap/ListGroup';
import  { observer } from 'mobx-react-lite'
import ItemsStore from "../store/tasks";

export const About = observer(() => {
  const { items } = ItemsStore;
  return <>
    <ListGroup>
      {items.map(item => (
        <ListGroup.Item>{item.title}</ListGroup.Item>
      ))}
    </ListGroup>
  </>
})