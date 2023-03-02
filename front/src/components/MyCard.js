import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBIcon

} from 'mdb-react-ui-kit';



function MyCard({ to, title, content, }) {
    return (<Link to={to}>
        <MDBCard className='h-100'>
            <MDBCardBody>
                <MDBIcon fas icon="user-cog" />
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {content}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard></Link>
    )
}



export default MyCard