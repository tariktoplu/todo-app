import type { ITodo } from '../Interfaces/ITodo'

interface TodoItemProps {
  todo: ITodo
  onEdit: (todo: ITodo) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-slate-900">{todo.text}</p>
        <p className="text-xs text-slate-500">
          Oluşturulma: {new Date(todo.createdAt).toLocaleString('tr-TR')}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-amber-400"
        >
          Güncelle
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-500"
        >
          Sil
        </button>
      </div>
    </li>
  )
}

export default TodoItem
