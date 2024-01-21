import { useState } from "react"
import { Button } from "./components/ui/button"
import { Textarea } from "./components/ui/textarea"

function App():JSX.Element {
  const [response, setResponse] = useState<string>(`
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati, quibusdam suscipit amet similique eaque illum, recusandae debitis facilis quod veritatis harum incidunt. Deserunt laboriosam voluptatem cupiditate officiis dolor aspernatur corrupti, eligendi repudiandae odio iure fugit delectus ab dolore temporibus consequatur dignissimos odit. Blanditiis impedit, fugit quaerat architecto maiores est?
  `)
  return (
    <>
      <div className="dark flex justify-center items-center max-w-[1000px] md:w-[700px] mx-auto min-h-dvh">
        <div className="flex gap-7 flex-col w-full px-5">
          <h1 className="md:text-4xl sm:text-2xl  font-bold">Smart ATS</h1>
          <p className="md:text-lg sm:text-base font-mono text-slate-500">Improve your Resume ATS</p>
          {/* <p className="md:text-lg sm:text-base text-slate-500">Paste the Job Description</p> */}
          <Textarea placeholder="Paste the Job Description" className="rounded resize-none"/>
          
          <div>
            <p className="md:text-lg sm:text-base font-mono text-slate-500 mb-3">Improve your Resume ATS</p>
            <div className="w-ful flex justify-end items-center bg-slate-400 py-5 px-3 rounded">
              <Button variant={"outline"} className="border rounded text-slate-700 bg-slate-200 hover:bg-slate-500">Browse Files</Button>
            </div>
          </div>
          <div className="w-full">
            <Button variant={"destructive"} className="border rounded bg-slate-500 hover:bg-slate-400">Submit</Button>
          </div>

          {response && (
            <p className="md:text-lg text-base">{response}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
