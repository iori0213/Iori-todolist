import express from "express";
import { getRepository } from "typeorm";
import { Todo } from "../entity/Todo.entity";

//create a router with express.Router()
const router = express.Router();

//create a new todo
router.post("/", async (req, res) => {
    const { todo, userName } = req.body;
    if (todo && userName) { //checking the input data.
        const todoRepo = getRepository(Todo);
        const duplicateCheck = await todoRepo.findOne({
            userName: userName,
            todo: todo,
            status: false,
        })
        if (!duplicateCheck) {
            const newTodo = new Todo();
            newTodo.todo = todo;
            newTodo.userName = userName;
            newTodo.status = false;
            await todoRepo.save(newTodo);
            return res.json({
                process: true,
                message: "Adding todo completed."
            })
        } else {
            return res.json({
                process: false,
                message: "The todo is already existed and not done yet!",
                existedTodo: [duplicateCheck],
            })
        }
    } else {
        return res.json({
            process: false,
            message: "Missing the todo or userName input.",
        })
    }
})

//user's all completed todo
router.get("/completedtodo/:username", async (req, res) => {
    const userName = req.params.username;
    const todoRepo = getRepository(Todo);
    const result = await todoRepo.find({
        userName: userName, status: true
    });
    return res.json({
        completedTodo: result
    })
})
//user's all uncompleted todo
router.get("/uncompletedtodo/:username", async (req, res) => {
    const userName = req.params.username;
    const todoRepo = getRepository(Todo);
    const result = await todoRepo.find({
        where: { userName: userName, status: false }
    });
    return res.json({
        uncompletedTodo: result
    })
})
//toggle the todo status
router.put("/", async (req, res) => {
    const { userName, todo, status } = req.body;
    const todoRepo = getRepository(Todo);
    //getRepository.update( { WHERE }, { SET KEY VALUE } )
    await todoRepo.update(
        { userName: userName, todo: todo },
        { status: !status }
    );
    return res.json({
        message: "Toggled status!",
    })
})
//delete todo
router.delete("/", async (req, res) => {
    const { userName, todo, status } = req.body;
    const todoRepo = getRepository(Todo);
    const targetTodo = await todoRepo.findOne({
        userName: userName,
        todo: todo,
        status: status,
    })
    if (targetTodo) {
        todoRepo.remove(targetTodo);
        return res.json({
            status: true,
            message: "Target todo removed."
        })
    } else {
        return res.json({
            status: false,
            message: "Didn't find this todo!",
        })
    }
})

export { router as todoRouter }