/**
 * write test cases that this api should pass
 * 
 * GET (all) - test that we get all the resources
 *      we should expect (if we get all resources):
 *          an array of objects 
 *          a 200 status code
 * GET (one) - test that we get the one resource passed into 
 *              the url of the endpoint
 *      we should expect (if we get a resource):
 *          the server will send back a 200 status code
 *          the server will send back the object
 *          the object returned should have the same uuid as the 
 *              param.id passed appended to the url
 * POST - test that we can create one resource
 *      we should expect (if we create a resource):
 *          a response with the object that was just created
 *          the object returned should have a uuid
 *          a 200 status code
 * PUT - test that we can update one resource
 *      we should expect (if we update a resource):
 *          the server will send back a 200 status code
 *          the server will send back the object that was updated
 * DELETE - test that we can delete one resource
 *       we should expect (if we delete a resource):
 *          the server will send back a 200 status code
 *          a response w/ the object that was deleted
 *          a status code: 404, if we attempt to GET the same object
 */