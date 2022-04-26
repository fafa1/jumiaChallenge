import React, { useEffect } from "react";
import { api } from "../../services/api";
import styles from './styles.module.scss';

export const ContainerUser = ({ children }) => {
  return(
    <div className={styles.containerUser}>
      {children}
    </div>

  )
}
