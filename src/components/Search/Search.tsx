import m from './Search.module.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { searchMoviesThunk } from "../../Redux/app-Reducer"
import { Button, Form, Input } from 'antd'

const Search: React.FC = () => {

    const dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState('')

    const makeRequest= (e: any) => {
        e.preventDefault();
        dispatch(searchMoviesThunk(searchValue,  1) as unknown as AnyAction)
    }

    return (
        <Form
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            className={m.wrapper}
        >
            <Form.Item
                className={m.input_wrapper}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input className={m.input}  onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
            </Form.Item>
            <Form.Item  className={m.button_wrapper}>
                <Button className={m.button} onClick={makeRequest} type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Search