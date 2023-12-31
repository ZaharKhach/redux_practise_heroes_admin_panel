import { useHttp } from "../../hooks/http.hook";
import { useDispatch} from "react-redux";

import { updateHeroesState_heroDel } from "../heroesList/heroSplice";

const HeroesListItem = ({ name, description, element, id }) => {
    const dispatch = useDispatch()
    const request  = useHttp();
    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'wather':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const onDelete = () => {
        const data = {
            id, name, description, element
        }

        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(request('http://localhost:3001/heroes'))
            .then(dispatch(updateHeroesState_heroDel(data)))

    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover' }} />
            <div className="card-body">

                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={() => onDelete()} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li >
    )
}

export default HeroesListItem;