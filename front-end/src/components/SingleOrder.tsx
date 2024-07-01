import { useState, useEffect } from "react"
import { OrderType } from "../utils/types"
import SingleOrderItem from "./SingleOrderItem"
import customFetch from "../utils/customFetch"
function SingleOrder({
  _id,
  total,
  orderItems,
  customer,
  enteredAt,
  balance,
}: OrderType) {
  const new_date = new Date(enteredAt)
  const [soldBy, setSoldBy] = useState("")
  const [showMore, setShowMore] = useState(false)

  const getSoldBy = async () => {
    try {
      const {
        data: { soldBy },
      } = await customFetch.get(`/order/${_id}`)
      setSoldBy(soldBy)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSoldBy()
  }, [])
  return (
    <main className='mt-3'>
      {/* Heading */}
      <div
        className={`grid grid-cols-7 mt-2 rounded shadow text-[8px] md:text-base p-1 md:p-2  ${
          showMore ? "bg-blue-50 font-semibold" : "bg-white"
        }`}
      >
        <p className={`${showMore ? "col-span-3" : "col-span-2"} p-1 md:p-2`}>
          {showMore && "Customer: "}
          {`${
            customer?.firstName.length > 1
              ? customer?.firstName + " " + customer?.lastName
              : "Anonymous"
          }`}
        </p>
        <p className='col-span-1 p-1 md:p-2'>
          {orderItems.length} item{orderItems.length > 1 ? "s" : ""}
        </p>
        <p className={`col-span-2 p-1 md:p-2 ${showMore && "hidden"}`}>
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(total)}
        </p>
        <p className={`${showMore ? "col-span-2" : "col-span-1"} p-1 md:p-2`}>
          {showMore
            ? new Intl.DateTimeFormat(undefined, {
                dateStyle: "long",
              }).format(new_date)
            : new Intl.DateTimeFormat("es", { dateStyle: "short" }).format(
                new_date
              )}
        </p>

        <button
          className='p-1 md:p-2 text-blue-500 hover:text-blue-700'
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "close" : "view"}
        </button>
        {/* <h2>sold by: {soldBy} </h2> */}
      </div>
      {showMore && (
        <>
          <div
            className={`grid grid-cols-8 gap-2 text-left border border-b-slate-600 font-bold bg-white text-[8px] md:text-base`}
          >
            <h2 className='col-span-3 p-2'>Item</h2>
            <h2 className='p-2'>Qty</h2>
            <h2 className='col-span-1 p-2'>Price</h2>
            <h2 className='col-span-2 p-2'>Subtotal</h2>
            <h2 className='p-2'>Returned</h2>
          </div>

          <div className='bg-white rounded-md shadow-md mt-1'>
            {orderItems.map((item) => (
              <SingleOrderItem key={item.productId} {...item} orderId={_id} />
            ))}
          </div>
          <div className='bg-blue-50 text-[8px] font-semibold md:text-base grid grid-cols-4'>
            <h2 className='p-2 col-span-2'>Sold by: {soldBy}</h2>
            <h2 className='p-2'>
              Total:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(total)}
            </h2>
            <h2 className='p-2'>
              Balance:{" "}
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(balance as number)}
            </h2>
          </div>
        </>
      )}
    </main>
  )
}

export default SingleOrder
