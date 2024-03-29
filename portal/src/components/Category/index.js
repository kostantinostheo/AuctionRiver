import './index.css'

export default function Category(props) {

    return (
        <div className="card">
            <div className="container">
                <a id='category-href' href={`item/category/${props.title}`}><h5 ><b>{props.title}</b></h5></a>
            </div>
            <a href={`item/category/${props.title}`}>
                <img id='category-img' src={props.image} width={150} height={150} alt=""/>
            </a>
        </div>
  );
}