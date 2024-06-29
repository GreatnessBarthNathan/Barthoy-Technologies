import { OrderType } from "../utils/types"

function SingleCustomerActivity({
  total,
  enteredAt,
  orderItems,
  balance,
}: OrderType) {
  const editedDate = new Date(enteredAt)

  return (
    <div className='grid grid-cols-4 gap-2 mt-2 rounded shadow bg-white'>
      <h2 className='col-span-1 p-2 text-[8px] md:text-base'>
        {new Intl.DateTimeFormat("es").format(editedDate)}
      </h2>
      <h2 className='col-span-1 p-2 text-[8px] md:text-base'>
        {orderItems.length} Item{orderItems.length > 1 && "s"}
      </h2>
      <h2 className='col-span-1 p-2 text-[8px] md:text-base'>
        {new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "NGN",
        }).format(total)}
      </h2>
      <h2 className='col-span-1 p-2 text-[8px] md:text-base'>
        {new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(balance as number)}
      </h2>
    </div>
  )
}

export default SingleCustomerActivity
