import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const Paginacion = ({ numPagination, safePage, numElements, selectPage, atrasPage, adelantePage, }) => {

    return (
        <nav className="paginacion">

            

            <a style={{ visibility: safePage === 1 ? "hidden" : "visible" }} onClick={(e) => { atrasPage(e) }} href="#">
                <FontAwesomeIcon  icon={faChevronLeft} className="fa-icon" > </FontAwesomeIcon>
            </a>
            {
                numElements.map(pages => (
                    <a className={safePage === pages ? "actived" : ""} key={pages} onClick={(e) => { selectPage(e, pages) }} href="#"> {pages}</a>
                ))

            }
            

            
            <a style={{ visibility: safePage === numPagination ? "hidden" : "visible" }} onClick={(e) => { adelantePage(e) }} href="#">
                <FontAwesomeIcon  icon={faChevronRight} className="fa-icon" > </FontAwesomeIcon>
            </a>

        </nav>
    )
}
