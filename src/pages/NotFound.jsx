import React from "react";
import styles from "../scss/NotFound.module.scss";
import Header from "../components/Header";
const NotFound = () => {
  return (
    <div>
      <div className={styles.root}>
        <span className={styles.h2}>Ничего не найдено 😔</span>
        <p className={styles.description}>
          К сожалению данная страница отсутствует в нашем магазине
        </p>
      </div>
    </div>
  );
};

export default NotFound;
