import express from "express"
import fs from "fs"
import cors from "cors"
import { initializeDatabase, getTodosFromDB, addTodoToDB } from "./db/database.js"

const app = express()
const port = 3001

app.use(cors())

// Serve statische dateien im Ordner public
app.use(express.static("public"))
app.use(express.json())
const db = initializeDatabase()


app.get("/todos", async (req, res) => {
    // jetzt müssen wir aus der datenbank auslesen
    const todos = await getTodosFromDB(db)
    console.log({ todos })
    let onlyTask = [];
    for (let eintrag of todos) {
        onlyTask.push(eintrag.task)
    }
    console.log({ onlyTask })
    res.send(onlyTask)
})


app.post("/todos", async (req, res) => {
    const body = req.body
    const todo = body.todo
    await addTodoToDB(db, todo)
    res.send("OK")

})

app.delete("/todos", async (req, res) => {
    await db.run("DELETE FROM todos;")
    res.send([])
})

app.listen(port, () => { console.log("server running on http://localhost:3001") })


