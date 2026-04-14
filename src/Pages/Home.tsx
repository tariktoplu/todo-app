import { useEffect, useState } from 'react'
import TodoForm from '../Components/TodoForm'
import TodoList from '../Components/TodoList'
import type { ITodo } from '../Interfaces/ITodo'

const STORAGE_KEY = 'todo-app-items'

function Home() {
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY)
    if (!savedTodos) {
      return []
    }

    const parsedTodos = JSON.parse(savedTodos) as ITodo[]
    return parsedTodos
  })
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim()

    if (!trimmedValue) {
      return
    }

    if (editingId) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                text: trimmedValue,
              }
            : todo,
        ),
      )
      setEditingId(null)
      setInputValue('')
      return
    }

    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      text: trimmedValue,
      createdAt: new Date().toISOString(),
    }

    setTodos((prevTodos) => [newTodo, ...prevTodos])
    setInputValue('')
  }

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))

    if (editingId === id) {
      setEditingId(null)
      setInputValue('')
    }
  }

  const handleEdit = (todo: ITodo) => {
    setInputValue(todo.text)
    setEditingId(todo.id)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setInputValue('')
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-2xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">React TODO Uygulaması</h1>
          <p className="mt-2 text-slate-600">
            Ekle, listele, güncelle ve sil işlemleri tek ekranda.
          </p>
        </header>

        <TodoForm
          value={inputValue}
          isEditing={Boolean(editingId)}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </main>
  )
}

export default Home
