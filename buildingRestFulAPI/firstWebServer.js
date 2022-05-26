
const Joi = require('../node_modules/joi'); 
const express = require('../node_modules/express');
const app = express();
app.use(express.json())

const courses = [
    {id:1, name: 'courses1'},
    {id:2, name: 'courses2'},
    {id:3, name: 'courses3'},
    {id:4, name: 'courses4'}
]

app.get('/', (req, res) => {
    res.send('hello Riya');
});

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3, 3, 4, 4, 5]);
// });

// // routing parameters
// // /api/course/1

// app.get('/api/courses/:id', (req, res) =>{
//     res.send(req.params.id);
// });

// app.get('/api/posts/:year/:month', (req, res) =>{
//     res.send(req.query);
// });

// // handling HTTP GET Requests
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

// app.get('/api/courses/:id', (req, res) =>{
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) res.status(404).send('The course with the given ID was not found.');
//     res.send(course);
// });

// // handling HTTP POST requests
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });
// app.post('/api/courses', (req, res) => {
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course);
// })

// input validation
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.post('/api/courses', (req, res) => {

    const schema = {
        name:Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("Name is required and should be minimum 3 characters.");
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    // look up the update
    // if not existing, return 404
    // Validate
    // If invalid, return 400 - Bad request
    // Update course
    // Return the updated course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found.');

    const { error } = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

} )

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);

}
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));