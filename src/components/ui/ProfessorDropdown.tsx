import { Teacher } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface TeacherDropdownProps {
  onSelectTeacher?: (id: number) => void;
  teachers: Teacher[];
}

// Normalize text (remove accents and convert to lowercase)
const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const TeacherDropdown = ({
  onSelectTeacher,
  teachers,
}: TeacherDropdownProps) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter teachers based on input for live search
  // If input is empty or matches selected teacher name, show all teachers
  const filtered = teachers.filter((teacher) => {
    if (!inputValue || inputValue === selectedTeacher?.name) {
      return true; // Show all teachers when no input or when input matches selected
    }
    return normalize(teacher.name).includes(normalize(inputValue));
  });

  const handleSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setInputValue(teacher.name);
    setOpen(false);
    if (onSelectTeacher) onSelectTeacher(teacher.id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setOpen(true);
  };

  const handleDropdownToggle = () => {
    setOpen(!open);
    // When opening via button click, show selected teacher name or clear input
    if (!open) {
      setInputValue(selectedTeacher?.name || "");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        // Reset input to selected teacher name when closing
        setInputValue(selectedTeacher?.name || "");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTeacher]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="flex">
        <label
          htmlFor="teacher-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Teacher
        </label>
        <button
          id="dropdown-button-2"
          type="button"
          className="border-primary-light bg-primary text-primary-light z-10 inline-flex max-w-60 shrink-0 items-center justify-between rounded-s-2xl border px-4 py-2.5 text-center text-sm font-medium focus:outline-none"
          onClick={handleDropdownToggle}
        >
          {selectedTeacher ? selectedTeacher.name : "Seleccionar profesor"}
          <ChevronDown />
        </button>
        {open && (
          <div
            id="dropdown-search-teacher"
            className="bg-primary absolute z-10 mt-12 w-44 divide-y divide-gray-100 rounded-lg shadow-lg"
          >
            <ul className="max-h-48 overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200">
              {filtered.length === 0 ? (
                <li>
                  <div className="px-4 py-2 text-gray-500">Sin resultados</div>
                </li>
              ) : (
                filtered.map((teacher) => (
                  <li key={teacher.id}>
                    <button
                      type="button"
                      className={`inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                        selectedTeacher?.id === teacher.id
                          ? "bg-gray-100 font-medium text-gray-900 dark:bg-gray-600 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                      role="menuitem"
                      onClick={() => handleSelect(teacher)}
                    >
                      <div className="inline-flex items-center">
                        {teacher.name}
                        <span className="ml-2 text-xs text-gray-500">
                          ({teacher.avg.toFixed(1)})
                        </span>
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input
            type="search"
            id="teacher-search"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            className="border-primary bg-primary-light z-20 block w-full rounded-r-2xl border-2 p-2.5 text-sm"
            placeholder="Buscar profesor"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherDropdown;
