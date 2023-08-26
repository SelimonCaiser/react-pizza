import React from "react";
import styles from "../scss/NotFound.module.scss";
import img from "../img/empty.jpg";

const NotFound = () => {
  return (
    // <div className={styles.root}>
    //   <span className={styles.h2}>Ничего не найдено 😔</span>
    //   <p className={styles.description}>
    //     К сожалению данная страница отсутствует в нашем магазине
    //   </p>
    // </div>
    <div className={styles.root}>
      <img className={styles.image} src={img} />
    </div>
  );
};

export default NotFound;
