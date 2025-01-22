import { useEffect, useRef } from 'react';
import styles from './Transition.module.css'

function Transition(props) {
    const transitionRef = useRef(null);



    function getStyle(style) {
        switch (style) {
            case "mainJson":
                transitionRef.current.classList.add("mainJson");
                break;

            case "jsonFooter":
                transitionRef.current.classList.add("jsonFooter");
                break;

            default:
                transitionRef.current.classList.add("mainJson");
                break;
        }
    }

    useEffect(() => {
        getStyle(props.styles);
    }, [props.styles]);

    return (
        <div ref={transitionRef} className={styles.transitionConteneur}>
        </div>
    )
}

export default Transition;