import {Form, Button, Modal} from 'react-bootstrap';
import {useState} from 'react';
import '../styles/HotzoneCreator.css';

function HotzoneCreator() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const [showLatitudeError, setShowLatitudeError] = useState(false);
    const [showLongitudeError, setShowLongitudeError] = useState(false);

    function handleEvent(e) { 
        if(e.target.name === 'latitude'){
            setLatitude(e.target.value);
        }else{
            setLongitude(e.target.value);
        }   
    }

    function handleSubmit(e){
        e.preventDefault();
        setShowLongitudeError(false);
        setShowLatitudeError(false);
        document.getElementById('latitude').style.display = "none";
        document.getElementById('longitude').style.display = "none";

        if(!/^([0-9]+|\.[0-9]+)+$/gm.test(latitude)){
            setShowLatitudeError(true);
            document.getElementById('latitude').style.display = "block";
        }

        if(!/^([0-9]+|\.[0-9]+)+$/gm.test(longitude)){
            setShowLongitudeError(true);   
            document.getElementById('longitude').style.display = "block";
        }
        
        if(!showLatitudeError && showLongitudeError){
            fetch('urlhere', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({longitude: longitude, latitude: latitude})
            })
            //Parse response
            .then((response) => response.json())
            //Check response
            .then(response => {
                console.log(response)
            });
        }

    }

    return (
        <div className="App">
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Create Hotzone</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group style={{textAlign: 'left'}} className="mb-3" controlId="formBasicEmail">
                        <Form.Label >Latitude</Form.Label>
                        <Form.Control name='latitude' isInvalid={showLatitudeError} required onChange={handleEvent}/>
                        <Form.Label id='latitude' className='errorMessage'>Invalid Format</Form.Label>
                    </Form.Group>
                    <Form.Group style={{textAlign: 'left'}} className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control name='longitude' isInvalid={showLongitudeError} required onChange={handleEvent}/>
                        <Form.Label id='longitude' className='errorMessage'>Invalid Format</Form.Label>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal.Dialog>
        </div>
    );
}

export default HotzoneCreator;
