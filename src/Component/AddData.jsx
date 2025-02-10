import React, { useState } from 'react'

const AddData = ({ productadd }) => {
  const catlist = ["Men footwear", "Women footwear"]

  const [input, setInput] = useState({
    id: "",
    category: "",
    brand: "",
    title: "",
    description: "",
    oldprice: "",
    rate: "",
    newprice: "",
    image: ""
  })

  const handleChange = (e) => {
    const updatedata = { ...input, [e.target.name]: e.target.value }

    // Calculate Discounted Price if Original Price and Rate are provided
    if (e.target.name === "oldprice" || e.target.name === "rate") {
      const originalPrice = parseFloat(updatedata.oldprice) || 0;
      const rate = parseFloat(updatedata.rate) || 0;
      if (originalPrice > 0 && rate > 0) {
        updatedata.newprice = Math.round(originalPrice - (originalPrice * rate / 100));
      } else {
        updatedata.newprice = "";
      }
    }
    setInput(updatedata)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(input)
    });

    if (response.ok) {
      alert("Product added successfully!");
      setInput({
        category: '',
        brand: '',
        title: '',
        description: '',
        oldprice: '',
        rate: '',
        newprice: '',
        image: ''
      });

      productadd();
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <>
      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addproduct">
        <i className="bi bi-plus-square"></i> Add Product
      </button>

      <div className="modal fade" id="addproduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addproductLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addproductLabel">Add Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input type="number" name="id" value={input.id} onChange={handleChange} className='form-control' placeholder='Enter id' />
                  </div>
                  <div className="col-12">
                    <select name="category" onChange={handleChange} className='form-select' value={input.category}>
                      <option value="">--- select category ---</option>
                      {
                        catlist.map(items =>
                          <option key={items} value={items}>{items}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className="col-12">
                    <input type="text" name="brand" value={input.brand} onChange={handleChange} className='form-control' placeholder='Brand' />
                  </div>
                  <div className="col-12">
                    <input type="text" name="title" value={input.title} onChange={handleChange} className='form-control' placeholder='Title' />
                  </div>
                  <div className="col-12">
                    <input type="text" name="description" value={input.description} onChange={handleChange} className='form-control' placeholder='Description' />
                  </div>
                  <div className="col-5">
                    <input type="number" name="oldprice" value={input.oldprice} onChange={handleChange} className='form-control' placeholder='Old Price' />
                  </div>
                  <div className="col-2">
                    <input type="number" name="rate" value={input.rate} onChange={handleChange} className='form-control' placeholder='Rate' />
                  </div>
                  <div className="col-5">
                    <input type="number" name="newprice" value={input.newprice} onChange={handleChange} className='form-control' placeholder='New Price' readOnly />
                  </div>
                  <div className="col-12">
                    <input type="text" name="image" value={input.image} onChange={handleChange} className='form-control' placeholder='Image URL' />
                  </div>
                  <div className="col-12">
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Add Data</button>
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

export default AddData
