import React, { useEffect, useState } from 'react'
import AddData from './AddData'
import Updatedata from './Updatedata';

const Showdata = () => {
  const [data, getData] = useState([]);
  const [updatedata, setUpdatadata] = useState({})

  const fetchData = () => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => getData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setimg = {
    height: "100px",
    width: "100px",
    objectFit: "contain"
  }

  // Function to delete an item
  const deleteData = (id) => {
    if (confirm("Are you sure want to delete this item?")) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(() => {
          fetchData(); // Refresh data after deletion
        })
        .catch(err => console.log("Error:", err));
    }
  };

  const handleEdit = (item) => {
    setUpdatadata(item);
  };

  return (
    <>
      <div className="container py-5">
        <AddData productadd={fetchData} />

        <table border={1} className='table table-hover my-3'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Rate</th>
              <th>Image</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ?
                data && data.map(items =>
                  <tr key={items.id}>
                    <td>{items.id}</td>
                    <td>{items.category}</td>
                    <td>{items.brand}</td>
                    <td>{items.title}</td>
                    <td>{items.description}</td>
                    <td><s>₹ {items.oldprice}</s> ₹ {items.newprice}</td>
                    <td>{items.rate}</td>
                    <td><img src={items.image} alt="" style={setimg} /></td>
                    <td>
                      <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#editdata" onClick={() => handleEdit(items)}>Edit</button>
                    </td>
                    <td>
                      <button className='btn btn-danger' onClick={() => deleteData(items.id)}>Delete</button>
                    </td>
                  </tr>
                ) :
                <tr>
                  <td colSpan={10}>
                    <div className="alert alert-danger" role="alert">
                      Data not found!!!
                    </div>
                  </td>
                </tr>
            }
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        <Updatedata updatedata={updatedata} setUpdatadata={setUpdatadata} fetchData={fetchData} />
      </div>
    </>
  )
}

export default Showdata
