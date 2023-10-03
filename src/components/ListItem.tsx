import { Card, Button } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { ListItemType } from "../pages/Store";

type ListItemProps = {
  id: number,
  title: string,
  price: number,
  thumbnail: string,
  description?: string,
  isInCart?: boolean,
  onClick: (item: ListItemType) => void,
  onAddItem: (item: ListItemType) => void
  onDeleteItem: (id: number) => void
}

export function ListItem({ id, title, price, thumbnail, description, isInCart, onClick, onAddItem, onDeleteItem} : ListItemProps) {
  return <Card>
      <Card.Img
        variant="top" 
        src={thumbnail}
        height="200px"
        style={{ objectFit: "cover"}}
        onClick={() => onClick({ id, title, price, thumbnail, description})}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{title}</span>
          <span className="ms-2">{price ? formatCurrency(price) : ''}</span>
        </Card.Title>
        <div className="mt-auto d-flex justify-content-center">
          {!isInCart ? (
            <Button onClick={() => onAddItem({id,title,price,thumbnail})}className="w-100">Add To Cart</Button>

          ) : (<Button onClick={() => onDeleteItem(id)}variant="danger">Remove From Cart</Button>) }
        </div>
      </Card.Body>
    </Card>
}