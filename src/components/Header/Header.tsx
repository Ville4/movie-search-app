import { useEffect } from "react"
import m from './Header.module.css'


type propsType = {
    title: string
}

const Header: React.FC<propsType> = (props) => {

    useEffect(()=> {
    }, [])

    return (
        <div className={m.wrapper}>
            <h2 className={m.title}>{props.title}</h2>
        </div>
    )
}

export default Header