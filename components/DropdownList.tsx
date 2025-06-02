"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
// import type { DropdownListProps } from "./DropdownListProps" // Declare the variable before using it

const DropdownList = ({ options, selectedOption, onOptionSelect, triggerElement }: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (option: string) => {
    onOptionSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {triggerElement}
      </div>

      {isOpen && (
        <ul className="absolute bg-white shadow-lg rounded-xl flex flex-col gap-1 w-full z-10 top-12 p-1 border border-slate-100">
          {options.map((option) => (
            <li
              key={option}
              className={cn(
                "px-3 py-2.5 text-sm font-medium relative text-slate-700 cursor-pointer hover:bg-indigo-50 transition-colors duration-200 ease-in-out rounded-md flex justify-between items-center",
                {
                  "bg-indigo-100 text-indigo-700": selectedOption === option,
                },
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {selectedOption === option && <Check className="h-4 w-4 text-indigo-600" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownList
