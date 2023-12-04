import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const User = () => {

  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchKeyWord, setSearchKeyword] = useState('')
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [rows, setRows] = useState('')
  const [pages, setPages] = useState(0)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getUsers()
  }, [page, searchKeyWord])

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users?search=${searchKeyWord}&page=${page}&limit=${limit}`
      )
      setUsers(response.data.results)
      setPage(response.data.page)
      setRows(response.data.totalRows)
      setPages(response.data.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchData = (e) => {
    e.preventDefault()
    setPage(0)
    setSearchKeyword(searchQuery)
  }

  const handleChangePage = (page) => {
    setPage(page.selected)
    if (page.selected === 9) {
      setMsg("Navigasi terbatas, silahkan gunakan pencarian jika data belum di temukan!")
    } else {
      setMsg('')
    }
  }

  return (
    <section className='px-2 flex justify-center'>

      <div className='md:w-2/3 w-full'>
        <h1 className='text-zinc-700 font-bold text-xl tracking-tight my-3 uppercase'>Users List</h1>

        <form onSubmit={handleSearchData}>
          <div className="relative mb-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-zinc-800 border border-zinc-300 rounded-lg bg-zinc-50 focus:ring-zinc-500 focus:border-zinc-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChangeSearch}
              required />

            <button type="submit" className="text-white absolute end-2.5 bottom-1 bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </form>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-500">
            <thead className="text-xs text-white uppercase bg-zinc-700">
              <tr className='border-b'>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>

              {users?.map((user, i) => (
                <tr className="odd:bg-white even:bg-gray-50border-b" key={user.id}>
                  <td className="px-6 py-4">
                    {user.username}
                  </td>
                  <td className="px-6 py-4">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.gender}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        <p className='text-zinc-700 my-3 font-medium text-sm'>Total Rows : {rows} Page : {rows ? page + 1 : 0} of {pages}</p>
        <p
          className={msg ? 'text-center mb-2 text-red-500' : 'hidden'}
        >{msg}</p>

        <div
          className='mb-10'
          key={rows}
        >
          <ReactPaginate
            className='flex w-full justify-center gap-4'
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={Math.min(10, pages)}
            onPageChange={handleChangePage}
            pageLinkClassName="border bg-zinc-100 px-2 rounded-md hover:bg-zinc-700 hover:text-white"
            previousLinkClassName="font-medium text-zinc-700"
            nextLinkClassName="font-medium text-zinc-700"
            activeLinkClassName="text-white bg-zinc-700"
            disabledLinkClassName="hidden"
          />
        </div>

      </div>

    </section>

  )
}

export default User