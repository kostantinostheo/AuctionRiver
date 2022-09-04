import { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './index.css'
export default function CustomBreadcrumb(props) {
    const [path] = useState(props.pathValues)

    useEffect(()=> {
       
  
      }, [])
    return (
        <Breadcrumb className='custom-breadcrumb'>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {
            path.map((val) => {
                return <Breadcrumb.Item href={"/" + val.toLowerCase() + "/"}>{val}</Breadcrumb.Item>
            })
        }
        <Breadcrumb.Item active>{props.value}</Breadcrumb.Item>
        </Breadcrumb>
    );
}