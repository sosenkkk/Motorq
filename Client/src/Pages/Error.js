import { useRouteError } from 'react-router';
import MainNavigation from '../Components/MainNavigation';

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
    
            <MainNavigation />
            <div className='flex center text-3xl w-full py-8 center'>
                <h1 className='m-auto'>404 Page doest not exist!</h1>
            </div>
        
    </>
}

export default Error;