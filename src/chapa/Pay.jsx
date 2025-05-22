import React from 'react'

function Pay({fname,lname,amount,email,tx_ref,propertyId,propertyType,listingtype}) {
  // const txRef="reference2"
  // const txRef1=txRef;
  return (
    
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
    <input type="hidden" name="public_key" value="CHAPUBK_TEST-u0mP18OHf036053E2KyGzuPlmY72uBHS" />
    <input type="hidden" name="tx_ref" value={tx_ref} />

    <input type="hidden" name="amount" value={amount} />
    <input type="hidden" name="currency" value="ETB" />
    <input type="hidden" name="email" value={email} />
    <input type="hidden" name="first_name" value={fname} />
    <input type="hidden" name="last_name" value={lname} />
    <input type="hidden" name="title" value="Let us do this" />
    <input type="hidden" name="description" value="Paying with Confidence with cha" />
    <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
    <input type="hidden" name="callback_url" value={`http://localhost:3000/payfailed`} />
    <input type="hidden" name="return_url" value={`http://localhost:3000/paysuccess/${listingtype}/${propertyType}/${propertyId}/${tx_ref}`} />
    {/* <input type="hidden" name="return_url" value={`http://localhost:3000/paysuccess/${txRef1 || "notxref"}`} /> */}

    <input type="hidden" name="meta[title]" value="test" />
    <button type="submit"  className="submit-btn" >Pay Now</button>
</form>
    </div>
  )
}

export default Pay
