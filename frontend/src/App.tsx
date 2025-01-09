import { Button } from './components/ui/Button'
function App() {

  return (
    <div className="space-y-4">
    <Button
      variant="primary"
      size="sm"
      text="Save"
      onClick={() => alert("Save clicked")}
    />

    <Button
      variant="secondary"
      size="lg"
      text="Next"
      onClick={() => alert("Next clicked")}
    />
  </div>
  )
}

export default App
