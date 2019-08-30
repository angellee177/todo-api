const server = require('../index');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
// get Todo Model
const Todo = require('../models/todo');
const Category =  require('./../models/category');
// get Faker for create fake data
// const faker = require('faker');

// var name = faker


chai.use(chaihttp);
chai.should();

// Delete Data after all function running
afterEach(done=>{
    Todo.deleteMany({})
    .then((data)=>{
        console.log(data)
        done();
    })
    .catch((err)=>{
        console,log(err)
        done();
    })
})



// 1. to test the root path
describe('/Get the root path', ()=>{
    it("should get the index page", (done)=>{
        chai.request(server)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Here is your Todo API!");
            done();
        })
    })
})

// 2. Get the show list
describe('/Get the show path from todo', ()=>{
    it("should show all todo list", (done)=>{
        chai.request(server)
        .get('/api/todo/')
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
    it("it should create a todo", (done)=>{
        const newCategory = new Category({ name: "test Category"});
        newCategory.save((error, newCategory)=>{
            const newTodo = {task: "task test", status: "false", category: newCategory._id};
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
   
   
    
})


// 3. Get Error Status from Create Function
describe('/ ERROR todo Routes', ()=>{
    it("it should get ERROR STATUS create a todo", (done)=>{
        const newTodo = {task: "", status: "false", category: "5d6519bf98a79c4434f9957a"};
        chai.request(server)
        .post('/api/todo/new')
        .send(newTodo)
        .end((err, res) =>{
            res.should.have.status(400);
            done();
        })
    })
})

// 3. Get Error Status from Create Function
describe('/ ERROR Create todo Routes', ()=>{
    it("it get error status (422)", (done)=>{
    const error_newTodo = {task: "task test", status: "false", category: "5d66043f5c56822ffe90cb63"};
    chai.request(server)
        .post('/api/todo/new')
        .send(error_newTodo)
        .end((err, res) =>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("Category Not Found!");
            res.should.be.an("object");
            done();
        })
    })
})

// 4. Update the Todo based on Id
describe('/Put Update Todo List', ()=>{
    it("it should update the todo based on Id we get from params", (done)=>{
        const newTodo = new Todo({task: "task new", status: "false", category: "5d6519bf98a79c4434f9957a"});
        newTodo.save((error, newTodo)=>{
            chai.request(server)
            .put('/api/todo/update/' + newTodo._id)
            .send({task: "task update", status: "false", category: "5d6519bf98a79c4434f9957a"})
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            })
            if(error) return res.status(422).json({error: error});
        })
    })
})


// 4. Shouldn't Update the Todo based on Id
describe('/Get Error messages from Update', ()=>{
    const errorUpdateTodo = {task: "task 2", status: "true", category: "5d6519bf98a79c4434f9957a"};
    it("it shouldn't update a todo based on Id we get from Params", (done)=>{
        chai.request(server)
        .put('/api/todo/update/5d6349b6e6a3801855b35f93')
        .send(errorUpdateTodo)
        .end((err, res)=>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("failed to updated!");
            done();
        })
    })
})


// 5. Delete Todo Error Status.(422)
describe('/ Get Error DELETE todo Routes', ()=>{
    it("it shouldn't be able to delete a todo based on Id we get from params", (done)=>{
        const newCategory = new Category({ name: "test Category"});
        newCategory.save((error, newCategory)=>{
            const deleteTodo = new Todo({task: "task new", status: "false", category: newCategory._id});
            deleteTodo.save((error, deleteTodo)=>{
                chai.request(server)
                .delete('/api/todo/delete/' + deleteTodo._id)
                .send(deleteTodo)
                .end((err, res)=>{
                    res.should.have.status(422);
                    res.body.should.have.property('success').equal(false);
                    res.body.should.have.property('message').equal("Id not found");
                    done();
                })
                if(error) return res.status(422).json({error: error})
            })
        })
    })
})

// 5. Delete the Todo base on Id 
describe('/ DELETE todo Routes', ()=>{
    it("it should be able to delete a todo based on Id we get from params", (done)=>{
        const newCategory = new Category({ name: "test Category"});
        newCategory.save((error, newCategory)=>{
            const deleteTodo = new Todo({task: "task new", status: "false", category: newCategory._id});
            deleteTodo.save((error, deleteTodo)=>{
                chai.request(server)
                .delete('/api/todo/delete/' + deleteTodo._id)
                .end((err, res)=>{
                    res.should.have.status(200);
                    done();
                })
            })
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
