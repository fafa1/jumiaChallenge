import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { CSVLink } from "react-csv";


import { CardInformation } from "../cardInformation";
import { SearchUser } from "../searchUser";

import { api } from "../../services/api";

export const ListUser = () => {
  const [dataUser, setDataUser] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [headerCSV, setHeaderCSV] = useState([])
  const [dataCSV, setDataCSV] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUserByGender = async (value) => {
    const getFilteredUser = await api.get(`?results=50&gender=${value.target.value}`);
    setDataUser(getFilteredUser.data.results);
  }
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Gender', key: 'gender' },
    { label: 'Location', key: 'location' },
    { label: 'E-mail', key: 'email' },
    { label: 'Current Age', key: 'age' },
    { label: 'Registration', key: 'registration' },
    { label: 'Number', key: 'number' },
  ]

  const getDataUsertoCsv = async (dataUserCsv) => {
    return dataUserCsv.map((element) => {
      return {
        name: element.name.first,
        gender: element.gender,
        location: element.location.city,
        email: element.email,
        age: element.dob.age,
        registration: element.registered.date,
        number: element.cell
      }
    })
  }


  useEffect(() => {
    const getUser = async () => {
      const resultUser = await api.get(`?results=50`);
      const { results } = resultUser.data;

      const resUser = await getDataUsertoCsv(results);

      setDataUser(results);
      console.log('resultUser', resUser)


      // const data = [
      //   {
      //     name: resUser[1].name,
      //     gender: 'results.gender',
      //     location: 'results.location.city',
      //     email: 'results.email',
      //     age: 'results.dob.age',
      //     registration: 'results.registered.date',
      //     number: 'results.cell'
      //   }
      // ]

      // setHeaderCSV(headerCsv);
      // setDataCSV(data)
    }

    getUser();
  }, [])


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataUser.length) : 0;

  return (
    <>
      <div className={styles.containerInformation}>
        <CardInformation/>
        {/* <CardInformation />
        <CardInformation /> */}
      </div>

      <SearchUser filter={getUserByGender} />

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer className={styles.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Picture</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left">E-mail</TableCell>
                <TableCell align="left">Current Age</TableCell>
                <TableCell align="left">Registration Seniority</TableCell>
                <TableCell align="left">Phone number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? dataUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : dataUser
              ).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div>
                      <img style={{ borderRadius: "30px" }} src={row.picture.thumbnail} alt=""></img>
                    </div>
                  </TableCell>
                  <TableCell style={{ padding: 25 }} align="left">{row.name.first}</TableCell>
                  <TableCell align="left">{row.gender}</TableCell>
                  <TableCell align="left">{row.location.city}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.dob.age}</TableCell>
                  <TableCell align="left">{row.registered.date}</TableCell>
                  <TableCell align="left">{row.cell}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6}>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            count={dataUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage={<span>Rows:</span>}
            labelDisplayedRows={({ page }) => {
              return `Page: ${page}`;
            }}
            backIconButtonProps={{
              color: "secondary"
            }}
            nextIconButtonProps={{ color: "secondary" }}
            SelectProps={{
              inputProps: {
                "aria-label": "page number"
              }
            }}
            showFirstButton={true}
            showLastButton={true}
          />
          {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataUser.length}
              rowsPerPage={rowsPerPage}
              page={0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({page}) => {
                return `page: ${page}`
              }}
            /> */}
        </TableContainer>
      </Paper>
    </>
  )
}
