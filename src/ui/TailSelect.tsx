import type { ChangeEvent, RefObject } from "react"

interface TailSelectProps {
  selRef : RefObject<HTMLSelectElement | null>, 
  handleSel : (e:ChangeEvent<HTMLSelectElement>) => void, 
  dText : string, 
  opv : string[], 
  opt : string[]
}

export default function TailSelect({selRef, handleSel, dText, opv, opt} : TailSelectProps) {
  return (
    <select ref={selRef} 
            defaultValue= ""
            className="bg-gray-50 border mx-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            onChange={handleSel}>
      <option value="">{dText}</option>
      {
        opv.map( (item: string, idx:number) => <option key={item}                                         
                                                       value={item}>
                                                  {opt[idx]}
                                                </option>)
      }
    </select>
  )
}