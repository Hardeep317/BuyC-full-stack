import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productAction } from '../ActionCreater/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Store() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => {return state.productReducer.products});
  const token = useSelector((state) =>{ return state.loginReducer.userDetails.token});

  

  const getData = () => {
    fetch('https://attryb-server-p7cn.onrender.com/getproducts')
    .then((res) => res.json())
    .then((res) => {
      productAction(res.data, dispatch);
    })
  }

  useEffect(() => {

    if(!token){
      navigate('/login')
    }

    if(data.length === 0){
    getData();
    }
  },[token])

  const handleDelete = (id) => {
    fetch(`https://attryb-server-p7cn.onrender.com/deletecar?id=${id}`,{
      method: 'DELETE',
    })
    .then(() => {
      getData();
      toast.warning('Item Deleted', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{minHeight:"400px"}} className="flex flex-col overflow-x-hidden">
  <div className="sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        {data.length > 0 ? data.map((item, idx) => {
            return <Link to={`/products/${item._id}`}><div className='w-1/2 p-3 border-4 rounded-md border-gray-600 justify-between flex mx-auto my-5' key={idx}>
            <div><img className='' src={item.image} alt="" /></div>
            <div className='w-1/2 ml-4'>
                <h1 className='text-xl'>{item.modelName}</h1>
                <h3 className='text-lg mx-2 my-3'>Color: {item.color}</h3>
                <h2 className='text-lg mx-2 my-3'>Mileage: {item.mileage}</h2>
                <h2 className='text-lg mx-2 my-3'>Price: ₹ {item.price}</h2>
                <h2 className='text-lg mx-2 my-3'>Top Speed: {item.topSpeed}</h2>
            </div>
            </div>
            </Link>
        }) : 
<div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
    </div>
    <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
}
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Store