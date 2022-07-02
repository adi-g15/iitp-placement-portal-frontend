import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'

export default function CompaniesRequest({ token = '' }) {
  // Fetch Companies from API
  const [companies, setCompanies] = useState([])

  const handleApprove = async (id) => {
    const res = await fetch(`${API_URL}/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          status: 'approved',
        },
      }),
    })
    if (!res.ok) {
      toast.warning('Something Went Wrong!')
    } else {
      toast.success('Successfully Approved')
      const data = await res.json()
      const id = data.data.id
      // update companies to remove the id from the list
      const newCompanies = companies.filter((company) => company.id !== id)
      setCompanies(newCompanies)
    }
  }

  const handleReject = async (id) => {
    const res = await fetch(`${API_URL}/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          status: 'rejected',
        },
      }),
    })
    if (!res.ok) {
      toast.warning('Something Went Wrong!')
    } else {
      toast.info('Successfully Rejected')
      const data = await res.json()
      const id = data.data.id
      // update companies to remove the id from the list
      const newCompanies = companies.filter((company) => company.id !== id)
      setCompanies(newCompanies)
    }
  }
  useEffect(() => {
    fetch(`${API_URL}/api/companies?filters[status][$eq]=pending&populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanies(data.data))
      .catch((err) => console.log(err))
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
    },
    {
      headerName: 'Company',
      field: 'attributes.company_name',
    },
    {
      headerName: 'Approval Status',
      field: 'attributes.status',
    },
    {
      headerName: 'Company Addrees',
      field: 'attributes.company_address',
    },
    {
      headerName: 'Approve',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Approve
            </button>
          </div>
        )
      },
    },
    {
      headerName: 'Reject',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleReject(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ])
  return (
    <div>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Companies
          </h2>
        </div>
        <div className='mt-4 flex md:mt-0 md:ml-4'>
          <button
            type='button'
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Edit
          </button>
          <button
            type='button'
            className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Publish
          </button>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 300 }}>
        <AgGridReact
          rowData={companies}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
