import { useRouteError } from 'react-router';

function Error() {
    const error = useRouteError();
    let title = 'An error Occured.';
    let message = "Something went wrong.";
    
    if (error.status === 500) {
        message = error.message;
       
    }


    if (error.status === 404) {
        title = "Not Found";
        message = "Could Not find Resource";
    }


    return <>
    
        
            <p>{message}</p>
        
    </>
}

export default Error;