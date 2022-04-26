import React from "react";
import Box from '@mui/material/Box';
import styles from './styles.module.scss'


export const CardInformation = () => {
  return (
    <Box
      className={styles.boxContainer}
      sx={{
        width: 350,
        height: 150,
      }}>
      <div className={styles.buttonDownload}>
        <button>
          <a href="https://randomuser.me/api/?results=50&format=csv">Download CSV</a>
        </button>
      </div>
    </Box>
  )
}