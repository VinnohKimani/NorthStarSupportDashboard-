# Backend

## Run locally

pipenv install

pipenv shell

python app.py


## API

GET /api/orders/<order_id>


Example:

GET /api/orders/NS1001


Response:

{
 order_id,
 product_name,
 status,
 last_update,
 expected_delivery
}
