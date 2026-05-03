export const exportToTxt = (tasks) => {
  const content = tasks
    .map((task, index) => `${index + 1}. ${task.text}`)
    .join("\n")

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "tareas-eliminadas.txt"
  a.click()

  URL.revokeObjectURL(url)
}