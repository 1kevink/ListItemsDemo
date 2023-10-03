import { Row, Col, DropdownButton, Dropdown, Modal, Button } from "react-bootstrap"
import axios from 'axios';
import  { observer } from 'mobx-react-lite'
import { useState, useEffect } from "react";
import { ListItem } from "../components/ListItem";
import TablePagination from '../components/TablePagination'
import ItemsStore from "../store/tasks";

const API = " https://dummyjson.com/products?limit=0";

const paginationOptions = [
  {value: 5},
  {value: 10},
  {value: 15},
]


export type ListItemType = {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
  description?: string
}

export const Store = observer(() =>{
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState({} as ListItemType)
  const [recordsPerPage, setRecordsPerPage] = useState({value: 5});
  const [resultsArr, setResultsArr] = useState([] as ListItemType[]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showItem = (item: ListItemType) => {
    setSelectedItem(item);
    handleShow();
  }

  const { items, addItem, deleteItem } = ItemsStore;
  
  useEffect(() => {
      (async function (){
        const {data} = await axios.get(API)
        setResultsArr(data.products)
      }())
  }, [])

  const lastIndex = currentPage * recordsPerPage.value;
  const firstIndex = lastIndex - recordsPerPage.value;
  const pageData = resultsArr.slice(firstIndex,lastIndex);
  const pageNumber = Math.ceil(resultsArr.length / recordsPerPage.value);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1)

  const onAddItem = (item: ListItemType) => {
    addItem(item)
  }

  const onDeleteItem = (id: number) => {
    deleteItem(id)
  }
  
  return <>
    <div className="d-flex w-100 justify-content-between">
      <h1>Store</h1>
      <div className="d-flex align-items-center">Items per Page:
        <DropdownButton id="dropdown-basic-button" title={recordsPerPage.value} className="ms-2">
          {paginationOptions.map(option => (
            <Dropdown.Item onClick={() => setRecordsPerPage({value: option.value})}>{option.value}</Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
    <Row md={2} xs={1} lg={3} className="g-3">
      {!!pageData.length && pageData.map(item => 
        <Col>
          <ListItem 
            {...item}
            onAddItem={onAddItem}
            onDeleteItem={onDeleteItem}
            isInCart={!!items.find(el => el.id === item.id)}
            onClick={showItem}
          />
        </Col> )}
    </Row>
    <TablePagination
      numbers={numbers}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedItem.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{selectedItem.description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
})