import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import customFetch from "../utils/customFetch"
import { OrderType } from "../utils/types"
import SingleOrderItem from "../components/SingleOrderItem"

function SingleOrderPage() {
  const [order, setOrder] = useState<OrderType>()
  const [soldBy, setSoldBy] = useState("")
  const { id } = useParams()

  const getSingleOrder = async () => {
    try {
      const {
        data: { soldBy, order },
      } = await customFetch.get(`/order/${id}`)
      console.log(order)
      setOrder(order)
      setSoldBy(soldBy)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleOrder()
  }, [])
  return (
    <div>
      <header className='flex justify-between items-center bg-white p-2 rounded border border-slate-600 capitalize text-[8px] md:text-base'>
        <h2>date: {order?.enteredAt}</h2>
        <h2>
          Customer:{" "}
          {`${
            order && order.customer.firstName.length > 1
              ? order?.customer.firstName + " " + order?.customer.lastName
              : "Anonymous"
          }`}
        </h2>
        <h2>sold by: {soldBy}</h2>
      </header>

      {/* TABLE */}
      {/* TABLE HEAD */}
      <div className='grid grid-cols-8 gap-2 mt-10 text-left border border-b-slate-600 p-3 font-bold bg-white text-[8px] md:text-base'>
        <h2 className='col-span-3 p-2'>Item</h2>
        <h2 className='p-2'>Qty</h2>
        <h2 className='col-span-1 p-2'>Price</h2>
        <h2 className='col-span-2 p-2'>Subtotal</h2>
        <h2 className='p-2'>Returned</h2>
      </div>

      {/*TABLE BODY*/}
      <>
        {order?.orderItems.map((item) => (
          <SingleOrderItem key={item.productId} {...item} orderId={id} />
        ))}
      </>

      <h2 className='bg-white p-3 mt-2 rounded text-right font-bold border border-slate-600 text-sm md:text-base'>
        TOTAL:{" "}
        {order
          ? new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(order.total)
          : 0}
      </h2>
    </div>
  )
}

export default SingleOrderPage
