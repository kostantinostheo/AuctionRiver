import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './index.css'
export default function CustomBreadcrumb(props) {
    return (
        <Breadcrumb className='custom-breadcrumb'>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{props.value}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

function BreadcrumbItem(props){

    return (<Breadcrumb.Item href="/"></Breadcrumb.Item>);
}