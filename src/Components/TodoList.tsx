import type { ITodo } from '../Interfaces/ITodo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: ITodo[]
  onEdit: (todo: ITodo) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
        Henüz görev eklenmedi.
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TodoList
