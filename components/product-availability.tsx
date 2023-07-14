
function ProductAvailability({available}: {available?: boolean}) {
  return (
    <>
    {available && (
      <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium">
        available
      </span>    
    )}
    {!available && (
      <span className="uppercase text-xs bg-rose-50 p-0.5 border-rose-500 border rounded text-rose-700 font-medium">
        back-ordered
      </span>    
    )}
    </>
  )
}

export default ProductAvailability;