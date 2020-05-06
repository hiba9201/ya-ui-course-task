import React, { createRef, RefObject } from 'react';

import styles from './Modal.module.css';


function Modal(props: { message: string }) {
    const { message } = props;

    const modal: RefObject<HTMLDivElement> = createRef();

    const close = () => {
        modal?.current?.classList.add(styles.closed);
    };

    return (
        <div ref={modal} className={styles.modal} onClick={close}>
            <div className={styles.alert}>
                <img src="/close.svg" alt="Закрыть" className={styles.closeImage} onClick={close}/>
                <h4 className={styles.error}>
                    О, нет! Что-то пошло не так :(
                </h4>
                <p className={styles.text}>
                    {message}
                </p>
            </div>
        </div>
    );
}


export default Modal;
