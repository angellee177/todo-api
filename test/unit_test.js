const server = require('./../index');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
// get Todo Model
const Todo = require('./../models/todo');
// get Response
const { success, errorMessage } = require('./../helper/response');


chai.use(chaihttp);
chai.should();

// 1. to test the root path
describe('/Get the root path', ()=>{
    it("should get the index page", (done)=>{
        chai.request(server)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Welcome to API!");
            done();
        })
    })
})


// 2. Get the show list
describe('/Get the show path from todo', ()=>{
    it("should show all todo list", (done)=>{
        chai.request(server)
        .get('/api/todo/show')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("here is your Todo List:");
            res.should.be.an("object");
            done();
        })
    })
})


// 3. Create a new todo
describe('/POST todo Routes', ()=>{
    const newTodo = {task: "task test", status: "false"};
    it("it should create a todo", (done)=>{
        chai.request(server)
        .post('/api/todo/new')
        .send(newTodo)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Success create new task !");
            res.should.be.an("object");
            done();
        })
    })
})

const newTodo = {task: "", status: "false"};
// 3. Get Error Status from Create Function
describe('/POST todo Routes', ()=>{
    it("it should create a todo", (done)=>{
        chai.request(server)
        .post('/api/todo/new')
        .send(newTodo)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    })
})

// 4. Update the Todo based on Id
describe('/Put Update Todo List', ()=>{
    const updateTodo = {task: "task updated", status: "true"};
    it("it should update the todo based on Id we get from params", (done)=>{
        chai.request(server)
        .put('/api/update/5d635a39e7e9662b20aaba6c')
        .send(updateTodo)
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    })
})


// 4. Shouldn't Update the Todo based on Id
describe('/Get Error messages from Update', ()=>{
    const errorUpdateTodo = {task: "task 2", status: "true"};
    it("it shouldn't update a todo based on Id we get from Params", (done)=>{
        chai.request(server)
        .put('/api/update/5d6349b6e6a3801855b35f93')
        .send(errorUpdateTodo)
        .end((err, res)=>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("failed to updated!");
            done();
        })
    })
})

// 4. Update blank Todo
describe('/Get Error status(400) from Update', ()=>{
    const errorUpdateTodo = {task: "", status: "true"};
    it("it shouldn't update a todo based on Id we get from Params", (done)=>{
        chai.request(server)
        .put('/api/update/5d6349b6e6a3801855b35f93')
        .send(errorUpdateTodo)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    })
})


// 5. Delete the Todo base on Id
describe('/DELETE todo Routes', ()=>{
    const deleteTodo = {_id: "5d636627528a8638aac620e7"}
    it("it should be able to delete a todo based on Id we get from params", (done)=>{
        chai.request(server)
        .delete('/api/todo/delete/' + deleteTodo._id)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("successfully deleted!");
            done();
        })
    })
})

// 5. Delete Error Status
describe('/DELETE todo Routes', ()=>{
    const deleteTodo = {_id: "5d634a21a7370a18deb3d1bd"}
    it("it should be able to delete a todo based on Id we get from params", (done)=>{
        chai.request(server)
        .delete('/api/todo/delete/' + deleteTodo._id)
        .end((err, res)=>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("Failed to deleted");
            done();
        })
    })
})


// 6. Show Todo Base on Id
describe('/Get the show path from todo', ()=>{
    it("should show all todo list", (done)=>{
        chai.request(server)
        .get('/api/todo/show/5d635a9a0f354e2b572ddcf0')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Detail Todo List:");
            res.should.be.an("object");
            done();
        })
    })
})


