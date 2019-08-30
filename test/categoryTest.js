const server = require('./../index');
const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
// get Category Model
const Category = require('./../models/category');

// afterEach(done=>{
//     Category.deleteMany({})
//     .then((data)=>{
//         console.log(data)
//         done();
//     })
//     .catch((err)=>{
//         console.log(err)
//         done();
//     })
// })

    /** CATEGORY UNIT TEST */
// 1. Create new Category
describe('Post new Category', ()=>{
    it("it should create a new category", (done)=>{
        const newCategory = {name: "testing Category"}
        chai.request(server)
        .post('/api/category/new')
        .send(newCategory)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("Success create new Category !");
            done();
        })
    })
})

// 1. Error Messages from Create new Category
describe('Error Create new blank category', (done)=>{
    it("it should create a new category", (done)=>{
        const newCategory = {name: ""}
        chai.request(server)
        .post('/api/category/new')
        .send(newCategory)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    })
})


// 2. Update Category based on Id
describe('/Put Update Todo List', ()=>{
    it("it should update the todo based on Id we get from params", (done)=>{
        const updateCategory = new Category({name: "test Category"});
        updateCategory.save((error, updateCategory)=>{
            chai.request(server)
            .put('/api/category/updated/' + updateCategory._id)
            .send({name: "Category Updated!"})
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            })
            if(error) return res.status(422).json({error: error});
        })
    })
})

// 2. Shouldn't Update the Category based on Id
describe('/Get Error messages from Category Update', ()=>{
    const errorUpdateCategory = {name: "error Updated"};
    it("it shouldn't update a todo based on Id we get from Params", (done)=>{
        chai.request(server)
        .put('/api/category/updated/5d6349b6e6a3801855b35f93')
        .send(errorUpdateCategory)
        .end((err, res)=>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("failed to Updated Category!");
            done();
        })
    })
})

// 2. Shouldn't Update the Category based on Id
describe('/Get Error messages status(400) from Category Update', ()=>{
    const errorUpdateCategory = {name: ""};
    it("it shouldn't update a todo based on Id we get from Params", (done)=>{
        chai.request(server)
        .put('/api/category/updated/5d6349b6e6a3801855b35f93')
        .send(errorUpdateCategory)
        .end((err, res)=>{
            res.should.have.status(400);
            done();
        })
    })
})


// 3. Delete Category based on Id
describe('/DELETE Category Routes', ()=>{
    it("it should be able to delete a Category based on Id we get from params", (done)=>{
        const deleteCategory = new Category({name: "delete Category"});
        deleteCategory.save((error, deleteCategory)=>{
            chai.request(server)
            .delete('/api/category/delete/' + deleteCategory._id)
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal("Successfully Deleted!");
                done();
            })
            if(error) return res.status(422).json({error: error})
        })
    })
})

// 3. Delete Category Error Status(422)
describe('/ Get Error DELETE todo Routes', ()=>{
    const deleteCategory = new Category({name: "delete Category"});
    it("it shouldn't be able to delete a todo based on Id we get from params", (done)=>{
        chai.request(server)
        .delete('/api/category/delete/5d66043f5c56822ffe90cb63')
        .end((err, res)=>{
            res.should.have.status(422);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal("Failed to Deleted Category!");
            done();
        })
    })
})



// 4. Show Category Base on Id
describe('/Get the show path from Category', ()=>{
    it("should show all todo list", (done)=>{
        const newCategory = {name: "testing Category"};
            chai.request(server)
            .get('/api/category/show/5d6620ebf9edbb43b194ac47')
            .end((err, res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal("Detail Category");
                res.should.be.an("object");
                done();
            })
    })
})


// 5. Get the show list
describe('/Get the show path from Category', ()=>{
    it("should show all Category list", (done)=>{
        chai.request(server)
        .get('/api/category/')
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('message').equal("here is your Category List");
            res.should.be.an("object");
            done();
        })
    })
})
