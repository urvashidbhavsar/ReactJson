import React, { useState } from 'react'

const Updatedata = ({ updatedata, setUpdatadata, fetchData }) => {
  const catlist = ["Men footwear", "Women footwear"]
  // update data

  const handleChange = (e) => {
    const updatealldata = { ...updatedata, [e.target.name]: e.target.value }

    // Calculate Discounted Price if Original Price and Rate are provided
    if (e.target.name === "oldprice" || e.target.name === "rate") {
      const originalPrice = parseFloat(updatealldata.oldprice) || 0;
      const rate = parseFloat(updatealldata.rate) || 0;
      if (originalPrice > 0 && rate > 0) {
        updatealldata.newprice = Math.round(originalPrice - (originalPrice * rate / 100));
      } else {
        updatealldata.newprice = "";
      }
    }
    setUpdatadata(updatealldata)
  }
  const handleUpdate = () => {
    fetch(`http://localhost:3000/products/${updatedata.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedata)
    })
      .then(res => res.json())
      .then(() => {
        fetchData();
        setUpdatadata({});
      })
      .catch(err => console.log("Error:", err));
  };
  return (
    <>
      {/* update data  */}
      <div className="modal fade" id="editdata" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addproductLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addproductLabel">Update Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row g-3">
                  <div className="col-12">
                    <input type="number" name="id" value={updatedata.id} onChange={handleChange} className='form-control' placeholder='Enter id' />
                  </div>
                  <div className="col-12">
                    <select name="category" onChange={handleChange} className='form-select' value={updatedata.category}>
                      <option value="">--- select category ---</option>
                      {
                        catlist.map(items =>
                          <option key={items} value={items}>{items}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className="col-12">
                    <input type="text" name="brand" value={updatedata.brand} onChange={handleChange} className='form-control' placeholder='Brand' />
                  </div>
                  <div className="col-12">
                    <input type="text" name="title" value={updatedata.title} onChange={handleChange} className='form-control' placeholder='Title' />
                  </div>
                  <div className="col-12">
                    <input type="text" name="description" value={updatedata.description} onChange={handleChange} className='form-control' placeholder='Description' />
                  </div>
                  <div className="col-5">
                    <input type="number" name="oldprice" value={updatedata.oldprice} onChange={handleChange} className='form-control' placeholder='Old Price' />
                  </div>
                  <div className="col-2">
                    <input type="number" name="rate" value={updatedata.rate} onChange={handleChange} className='form-control' placeholder='Rate' />
                  </div>
                  <div className="col-5">
                    <input type="number" name="newprice" value={updatedata.newprice} onChange={handleChange} className='form-control' placeholder='New Price' readOnly />
                  </div>
                  <div className="col-12">
                    <input type="text" name="image" value={updatedata.image} onChange={handleChange} className='form-control' placeholder='Image URL' />
                  </div>
                  <div className="col-12">
                    <button type="button" className="btn btn-success" onClick={handleUpdate}>Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Updatedata
