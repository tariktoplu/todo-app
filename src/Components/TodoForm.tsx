interface TodoFormProps {
  value: string
  isEditing: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
}

function TodoForm({ value, isEditing, onChange, onSubmit, onCancel }: TodoFormProps) {
  return (
    <form
      className="rounded-xl bg-white p-4 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label htmlFor="todo-input" className="mb-2 block text-sm font-medium text-slate-700">
        Yapılacak görev
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Örn: Proje teslim formunu doldur"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500"
        >
          {isEditing ? 'Güncelle' : 'Ekle'}
        </button>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Vazgeç
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default TodoForm
