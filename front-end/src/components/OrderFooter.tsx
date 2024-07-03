function OrderFooter({
  soldBy,
  total,
  balance,
}: {
  soldBy: string
  total: number
  balance: number
}) {
  return (
    <div className='bg-blue-300 text-white text-[8px] font-semibold md:text-base flex justify-between'>
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
  )
}

export default OrderFooter
