import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

// temp local db, with any as the object for speed purposes
const dbResources: any[] = [];

// init server and add functionality
const router = express.Router();
router.use(express.json());
router.use(cors());

//  GET (all) - test that we get all the resources
//     we should expect (if we get all resources):
//         an array of objects 
//         a 200 status code
router.get('/', (req: Request, res: Response) => {
    res.status(200).send(dbResources);
});

//  GET (one) - test that we get the one resource passed into 
//               the url of the endpoint
//       we should expect (if we get a resource):
//           the server will send back a 200 status code
//           the server will send back the object
//           the object returned should have the same uuid as the 
//               param.id passed appended to the url
router.get('/:id', (req, res)=> {
    const id = req.params.id;
    const existing_dbResource = dbResources.find( 
        (ojbect) => ojbect.id === id
    );

    // let client know no object found
    // the logic might be off or a service might be down
    if(!existing_dbResource) return res.status(400).send("resource not found")

    // let client know everything worked by replying with the existing obj.
    res.status(200).send(existing_dbResource);
});

//  POST - test that we can create one resource
//       we should expect (if we create a resource):
//           a response with the object that was just created
//           the object returned should have a uuid
//           a 200 status code
router.post('/', (req, res)=> {
    // guard against nothing to add sent in the request
    // if no info in body no need for runtime compiler to keep running
    if(!req.body) return res.status(400).send("no resource to add");

    // if there is something to add in the request body
    // give it a unique id bc every resource in the db needs to be #'d
    const newDbResource = req.body;
    if (!newDbResource.id) newDbResource.id = randomUUID();

    dbResources.push(newDbResource);
    // let client know everything worked by replying with the new obj.
    res.status(200).send(newDbResource);
});

//  PUT - test that we can update one resource
//       we should expect (if we update a resource):
//           the server will send back a 200 status code
//           the server will send back the object that was updated
router.put('/:id', (req, res)=> {
    // guard against missing body in request
    if(!req.body) return res.status(400).send("no resource to add");
    
    // get the existing Ojbect by comparing id passed in thru url with 
    // the id of the obj.s in the dbResources array
    const id = req.params.id;
    const existing_dbResource = dbResources.find( 
        (ojbect) => ojbect.id === id
    );

    // let client know no object found
    // the logic might be off or a service might be down
    if(!existing_dbResource) return res.status(404).send("resource not found");

    // update every key by exposing all props, iterating over them and (goto A)
    const updated_dbResource = existing_dbResource;
    Object.keys(updated_dbResource).forEach( key => {
        // (A) updating any key with new info (goto B)
        if (req.body.hasOwnProperty(key)) {
            updated_dbResource[key] = req.body[key];
        }
        // (B) or adding any new key that isn't in the existing_dbOjbect
        if (!updated_dbResource.hasOwnProperty(key)) {
            updated_dbResource[key] = req.body[key];
        }
    });

    // let client know everything worked by replying with the updated obj.
    res.status(200).send(updated_dbResource);
});


//  DELETE - test that we can delete one resource
//        we should expect (if we delete a resource):
//           the server will send back a 200 status code
//           a response w/ the object that was deleted
//           a status code: 404, if we attempt to GET the same object

router.delete('/:id', (req, res)=> {
    const id = req.params.id;
    // define a funct to find an object by its id and return both the object and its index
    const getResourceandItsIndex = (): [Object | null, number] => {
        // Search for the index using the id passed in thru the :id variable in the endpoint
        const resourceIndex = dbResources.findIndex(
            (resource) => resource.id === id
        );
        // consider if the object isn't found
        if (resourceIndex === -1) return [null, -1];

        // get the object using the found index
        const existingDBresource = dbResources[resourceIndex];
        return [existingDBresource, resourceIndex];
    };

    // assign found object and its index using a tuple
    const [existing_dbResource, existing_dbResourceIndex] = getResourceandItsIndex();

    // let client know no object found
    // the logic might be off or a service might be down
    if(existing_dbResourceIndex === -1) return res.status(404).send("resource not found");
    
    // remove one element starting at the index of the existing_dbResourceIndex
    dbResources.splice(existing_dbResourceIndex, 1);

    // let client know everything worked by replying with the existing obj.
    res.status(200).send(existing_dbResource);
});

// export the express server
export default router;