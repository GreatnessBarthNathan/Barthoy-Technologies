import { OrderType } from "../utils/types"
import { Link } from "react-router-dom"

function SingleOrder({
  _id,
  total,
  orderItems,
  customer,
  enteredAt,
}: OrderType) {
  const new_date = new Date(enteredAt)
  return (
    <div className='grid grid-cols-7 bg-white mt-2 rounded shadow text-[8px] md:text-base p-1 md:p-2'>
      <p className='col-span-2 p-1 md:p-2'>
        {`${
          customer?.firstName.length > 1
            ? customer?.firstName + " " + customer?.lastName
            : "Anonymous"
        }`}
      </p>
      <p className='col-span-1 p-1 md:p-2'>{orderItems.length}</p>
      <p className='col-span-2 p-1 md:p-2'>
        {new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(total)}
      </p>
      <p className='col-span-1 p-1 md:p-2'>
        {new Intl.DateTimeFormat("es").format(new_date)}
      </p>
      <Link
        to={`./${_id}`}
        className='p-1 md:p-2 text-blue-500 hover:text-blue-700'
      >
        View
      </Link>
    </div>
  )
}

export default SingleOrder
